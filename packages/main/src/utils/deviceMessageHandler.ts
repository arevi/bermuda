import { DeviceMessage, DeviceMessageType } from '../interfaces/Device';
import { ipcRenderer } from 'electron';

class DeviceMessageHandler {
  handleMessage = (e: Electron.IpcMainEvent, message: DeviceMessage) => {
    switch (message.type) {
      case DeviceMessageType.GetDevices:
        this.getConnectedDevices();
        break;
    }
  };

  getConnectedDevices = () => {
    ipcRenderer.send('device', []);
  };
}

export default DeviceMessageHandler;
