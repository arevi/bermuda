import { BrowserWindow } from 'electron';
import { Device } from '../interfaces/Device';
import { DeviceMessage, DeviceMessageType } from '../interfaces/DeviceMessage';
import { DeviceManager } from './DeviceManager';

export class DeviceMessageHandler {
  getAppWindow: () => BrowserWindow;

  getDeviceManager: () => DeviceManager;

  constructor(
    getAppWindow: () => BrowserWindow,
    getDeviceManager: () => DeviceManager
  ) {
    this.getAppWindow = getAppWindow;
    this.getDeviceManager = getDeviceManager;
  }

  handleMessage = (message: DeviceMessage) => {
    switch (message.type) {
      case DeviceMessageType.GetDevices:
        break;
    }
  };

  sendConnectedDevices = (devices: Device[]) => {
    this.getAppWindow().webContents.send('device', { devices });
  };
}
