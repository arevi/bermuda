import { BrowserWindow } from 'electron';
import { Device } from '../interfaces/Device';
import {
  DeviceMessage,
  DeviceMessageType,
  StatusMessageType,
} from '../interfaces/DeviceMessage';
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
      case DeviceMessageType.MountImage:
        this.getDeviceManager().mountDiskImage(message.payload.udid);
        break;
      case DeviceMessageType.SetLocation:
        if (message.payload.location) {
          this.getDeviceManager().setLocation(
            message.payload.udid,
            message.payload.location
          );
        }
        break;
    }
  };

  sendConnectedDevices = (devices: Device[]) => {
    this.getAppWindow().webContents.send('device', devices);
  };

  sendStatusMessage = (messageType: StatusMessageType, message: string) => {
    this.getAppWindow().webContents.send('status', {
      type: messageType,
      message,
    });
  };
}
