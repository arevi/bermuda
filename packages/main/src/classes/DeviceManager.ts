import { Device } from '../interfaces/Device';
import {
  getConnectedDeviceIds,
  getConnectedDeviceInfo,
} from '../utils/deviceScanning';
import { isDev } from '../utils/isDev';
import { DeviceMessageHandler } from './DeviceMessageHandler';

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
    // Scan all connected devices and retrieve device UDIDs
    const latestDeviceIds = await getConnectedDeviceIds(
      './assets/win-x64/idevice_id.exe'
    );

    // Remove any devices which have been disconnected
    this.devices = this.devices.filter((device) =>
      latestDeviceIds.includes(device.udid)
    );

    // Map over known connected device UDIDs
    let knownDeviceIds = this.devices.map((knownDevice) => knownDevice.udid);

    // Filter out any known device IDs to prevent grabbing information from the same device twice
    const unknownDevices = latestDeviceIds.filter(
      (deviceId) => !knownDeviceIds.includes(deviceId)
    );

    // If there are unknown devices, retrieve their information and add them to the devices array
    if (unknownDevices.length !== 0) {
      await Promise.all(
        unknownDevices.map(async (unknownDeviceId) => {
          let device: Device = await getConnectedDeviceInfo(
            './assets/win-x64/ideviceinfo.exe',
            unknownDeviceId
          );

          this.devices = [...this.devices, device];
        })
      );
    }

    this.getDeviceMessageHandler().sendConnectedDevices(this.devices);
  };
}
