import { Device } from '../interfaces/Device';
import {
  getConnectedDeviceIds,
  getConnectedDeviceInfo,
} from '../utils/deviceScanning';
import { DeviceMessageHandler } from './DeviceMessageHandler';
import { dialog } from 'electron';
import { mountDiskImage } from '../utils/imageMount';
import { StatusMessageType } from '../interfaces/DeviceMessage';
import { getExecutablePath } from '../utils/helper';
import { updateLocation } from '../utils/locationUpdate';

export class DeviceManager {
  devices: Device[];

  getDeviceMessageHandler: () => DeviceMessageHandler;

  constructor(getDeviceMessageHandler: () => DeviceMessageHandler) {
    this.devices = [];
    this.getDeviceMessageHandler = getDeviceMessageHandler;
  }

  start = () => {
    // Scan devices on an interval of 10 seconds
    setInterval(this.scanDevices, 10000);
  };

  /**
   * Scans for available connected iOS devices
   * If devices are found, will send the device list via the message handler
   */
  scanDevices = async (): Promise<void> => {
    try {
      // Scan all connected devices and retrieve device UDIDs
      const latestDeviceIds = await getConnectedDeviceIds(
        getExecutablePath('idevice_id')
      );

      // Remove any devices which have been disconnected
      this.devices = this.devices.filter((device) =>
        latestDeviceIds.includes(device.udid)
      );

      // Map over known connected device UDIDs
      const knownDeviceIds = this.devices.map(
        (knownDevice) => knownDevice.udid
      );

      // Filter out any known device IDs to prevent grabbing information from the same device twice
      const unknownDevices = latestDeviceIds.filter(
        (deviceId) => !knownDeviceIds.includes(deviceId)
      );

      // If there are unknown devices, retrieve their information and add them to the devices array
      if (unknownDevices.length !== 0) {
        await Promise.all(
          unknownDevices.map(async (unknownDeviceId) => {
            let device: Device = await getConnectedDeviceInfo(
              getExecutablePath('ideviceinfo'),
              unknownDeviceId
            );

            this.devices = [...this.devices, device];
          })
        );
      }
    } catch (err) {
      this.devices = [];
    }

    this.getDeviceMessageHandler().sendConnectedDevices(this.devices);
  };

  /**
   * Opens prompts for user to select a disk image and disk image signature
   * If a valid disk image and signature is provided, the selected device will have the disk image mounted
   * On success and/or failure, a prompt will be sent via the message handler to inform user of mount status
   * @param udid - Device UDID string
   */
  mountDiskImage = async (udid: string): Promise<void> => {
    // Filter through connected devices to see if UDID provided is a valid connected device
    const selectedDeviceSearch = this.devices.filter(
      (device) => device.udid === udid
    );

    // If the UDID does not map to a known connected device, abort.
    if (selectedDeviceSearch.length === 0) return;

    try {
      // Opens dialog to seleect a .dmg file (XCode Developer Disk image)
      const diskImagePath = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Disk Image', extensions: ['dmg'] }],
      });

      // If no disk image is provided, abort and send a status message via message handler
      if (diskImagePath.filePaths.length === 0) {
        return this.getDeviceMessageHandler().sendStatusMessage(
          StatusMessageType.Error,
          'No developer disk image selected'
        );
      }

      // Opens dialog to select a .dmg.signature file (XCode Developer Disk Image Signature)
      const diskImageSignaturePath = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
          { name: 'Disk Image Signature', extensions: ['dmg.signature'] },
        ],
      });

      // If no disk image signature is provided, abort and send status message via message handler
      if (diskImageSignaturePath.filePaths.length === 0) {
        return this.getDeviceMessageHandler().sendStatusMessage(
          StatusMessageType.Error,
          'No developer disk image signature selected'
        );
      }

      // Attempts to mount the developer disk image & signature provided to the selected iOS device
      await mountDiskImage(
        udid,
        diskImagePath.filePaths[0],
        diskImageSignaturePath.filePaths[0],
        getExecutablePath('ideviceimagemounter')
      );

      // If the above is successful, will update the connected device list to mark the device as being in developer mode
      this.devices = [
        ...this.devices.filter((device) => device.udid !== udid),
        {
          ...selectedDeviceSearch[0],
          diskImage: {
            path: diskImagePath.filePaths[0],
            signaturePath: diskImageSignaturePath.filePaths[0],
          },
          status: { developer: true },
        },
      ];

      // Sends the updated device list via message handler
      this.getDeviceMessageHandler().sendConnectedDevices(this.devices);

      // Sends a status message via message handler to user, notifying them of successful developer mode mount
      this.getDeviceMessageHandler().sendStatusMessage(
        StatusMessageType.Success,
        'Developer Mode Enabled'
      );
    } catch (err: any) {
      // Catch any error and send error message to user via message handler
      this.getDeviceMessageHandler().sendStatusMessage(
        StatusMessageType.Error,
        err
      );
    }
  };

  /**
   * Attempts to update the provided devices location to the passed coordinates
   * @param udid - Device UDID (String)
   * @param location - Geolocation (string)
   */
  setLocation = async (udid: string, location: string) => {
    // Filter through connected devices to see if UDID provided is a valid connected device
    const selectedDeviceSearch = this.devices.filter(
      (device) => device.udid === udid
    );

    // If the UDID does not map to a known connected device, abort.
    if (selectedDeviceSearch.length === 0) return;

    try {
      // Attempt to update the provided devices location with the provided location coordinates
      await updateLocation(
        udid,
        location,
        getExecutablePath('idevicesetlocation')
      );

      // Sends a status message via message handler to user, notifying them of successful location update
      this.getDeviceMessageHandler().sendStatusMessage(
        StatusMessageType.Success,
        'Location updated'
      );
    } catch (err: any) {
      // Send a generic failed to update location message
      this.getDeviceMessageHandler().sendStatusMessage(
        StatusMessageType.Error,
        'Failed to update location'
      );
    }
  };
}
