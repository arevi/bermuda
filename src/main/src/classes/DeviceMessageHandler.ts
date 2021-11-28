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

  /**
   * Receives a device message object and based on message type will call corresponding device manager function w/ payload
   * @param message - Device Message Object (Type & Payload)
   */
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

  /**
   * Grabs the latest app window instance and sends a device event with the list of devices
   * @param devices - Array of device objects
   */
  sendConnectedDevices = (devices: Device[]) => {
    this.getAppWindow().webContents.send('device', devices);
  };

  /**
   * Grabs the latest app window instance and sends a status message w/ the corresponding message type (i.e. Success/Failure)
   * @param messageType - Message Type Enum
   * @param message - Message to send (String)
   */
  sendStatusMessage = (messageType: StatusMessageType, message: string) => {
    this.getAppWindow().webContents.send('status', {
      type: messageType,
      message,
    });
  };
}
