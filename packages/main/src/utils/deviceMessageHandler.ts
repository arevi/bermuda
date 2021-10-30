import { BrowserWindow } from 'electron';
import { DeviceMessage, DeviceMessageType } from '../interfaces/Device';

class DeviceMessageHandler {
  handleMessage = (message: DeviceMessage, window: BrowserWindow) => {
    switch (message.type) {
      case DeviceMessageType.GetDevices:
        this.getConnectedDevices(window);
        break;
    }
  };

  getConnectedDevices = (window: BrowserWindow) => {
    window.webContents.send('device', { devices: [] });
  };
}

export default DeviceMessageHandler;
