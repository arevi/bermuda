import { BrowserWindow } from 'electron';
import { DeviceManager } from './DeviceManager';
import { DeviceMessageHandler } from './DeviceMessageHandler';

export class Configuration {
  getAppWindow: () => BrowserWindow;

  deviceManager: DeviceManager;

  deviceMessageHandler: DeviceMessageHandler;

  constructor(getAppWindow: () => BrowserWindow) {
    this.getAppWindow = getAppWindow;

    this.deviceManager = new DeviceManager(this.getDeviceMessageHandler);

    this.deviceMessageHandler = new DeviceMessageHandler(
      this.getAppWindow,
      this.getDeviceManager
    );
  }

  getDeviceManager = () => this.deviceManager;

  getDeviceMessageHandler = () => this.deviceMessageHandler;

  setDeviceManager = (deviceManager: DeviceManager) => {
    this.deviceManager = deviceManager;
  };

  setDeviceMessageHandler = (deviceMessageHandler: DeviceMessageHandler) => {
    this.deviceMessageHandler = deviceMessageHandler;
  };
}
