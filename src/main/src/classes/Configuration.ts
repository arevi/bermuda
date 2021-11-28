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

  /**
   * Retrieves the latest device manager instance
   * @returns DeviceManager
   */
  getDeviceManager = () => this.deviceManager;

  /**
   * Retrieves the latest device message handler instance
   * @returns DeviceMessageHandler
   */
  getDeviceMessageHandler = () => this.deviceMessageHandler;

  /**
   * Sets the current device manager instance running (typically a singleton, but this is JavaScript)
   * @param deviceManager - DeviceManager instance
   */
  setDeviceManager = (deviceManager: DeviceManager) => {
    this.deviceManager = deviceManager;
  };

  /**
   * Sets the current device message handler instance running (typically a singleton, but this is JavaScript)
   * @param deviceMessageHandler - DeviceMessageHandler instance
   */
  setDeviceMessageHandler = (deviceMessageHandler: DeviceMessageHandler) => {
    this.deviceMessageHandler = deviceMessageHandler;
  };
}
