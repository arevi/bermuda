import { Device } from '../interfaces/Device';
import { getConnectedDeviceIds } from '../utils/deviceScanning';
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
    setInterval(this.scanDevices, 5000);
  };

  scanDevices = async () => {
    let executablePath = '';
    if (isDev) {
      if (process.platform != 'darwin') {
        executablePath = './assets/win-x64/idevice_id.exe';
      } else {
      }
    }

    const deviceIds = await getConnectedDeviceIds(executablePath);
    console.log(deviceIds);
  };
}
