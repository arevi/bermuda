import { Device } from '../interfaces/Device';
import {
  getConnectedDeviceIds,
  getConnectedDeviceInfo,
} from '../utils/deviceScanning';
import { DeviceMessageHandler } from './DeviceMessageHandler';
import { dialog } from 'electron';
import { mountDiskImage } from '../utils/imageMount';
import { StatusMessageType } from '../interfaces/DeviceMessage';
import path from 'path';

export class DeviceManager {
  devices: Device[];

  getDeviceMessageHandler: () => DeviceMessageHandler;

  constructor(getDeviceMessageHandler: () => DeviceMessageHandler) {
    this.devices = [];
    this.getDeviceMessageHandler = getDeviceMessageHandler;
  }

  start = () => {
    setInterval(this.scanDevices, 10000);
  };

  scanDevices = async () => {
    try {
      // Scan all connected devices and retrieve device UDIDs
      const latestDeviceIds = await getConnectedDeviceIds(
        path.join(__dirname, './assets/win-x64/idevice_id.exe')
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
              path.join(__dirname, './assets/win-x64/ideviceinfo.exe'),
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

  mountDiskImage = async (udid: string) => {
    const selectedDeviceSearch = this.devices.filter(
      (device) => device.udid === udid
    );

    if (selectedDeviceSearch.length === 0) return;
    try {
      const diskImagePath = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Disk Image', extensions: ['dmg'] }],
      });

      const diskImageSignaturePath = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
          { name: 'Disk Image Signature', extensions: ['dmg.signature'] },
        ],
      });

      if (
        diskImagePath.filePaths.length === 0 ||
        diskImageSignaturePath.filePaths.length === 0
      )
        return;

      await mountDiskImage(
        udid,
        diskImagePath.filePaths[0],
        diskImageSignaturePath.filePaths[0],
        path.join(__dirname, './assets/win-x64/ideviceimagemounter.exe')
      );

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

      this.getDeviceMessageHandler().sendConnectedDevices(this.devices);

      this.getDeviceMessageHandler().sendStatusMessage(
        StatusMessageType.Success,
        'Developer Mode Enabled'
      );
    } catch (err: any) {
      this.getDeviceMessageHandler().sendStatusMessage(
        StatusMessageType.Error,
        err
      );
    }
  };

  setLocation = async (udid: string, location: string) => {
    console.log(udid);
    console.log(location);
  };
}
