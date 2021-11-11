import { Device } from '../interfaces/Device';
import { DeviceMessageHandler } from './DeviceMessageHandler';

export class DeviceManager {
  devices: Device[];

  getDeviceMessageHandler: () => DeviceMessageHandler;

  constructor(getDeviceMessageHandler: () => DeviceMessageHandler) {
    this.devices = [];
    this.getDeviceMessageHandler = getDeviceMessageHandler;
  }

  start = () => {
    setInterval(this.scanDevices, 5000);
  };

  scanDevices = () => {
    this.getDeviceMessageHandler().sendConnectedDevices([]);
  };
}
