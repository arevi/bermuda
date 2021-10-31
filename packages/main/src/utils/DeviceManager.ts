import { Device } from '../interfaces/Device';

export class DeviceManager {
  devices: Device[];

  constructor() {
    this.devices = [];
  }

  private setDevices(newDevices: Device[]) {
    this.devices = newDevices;
  }

  start() {
    setInterval(this.scanDevices, 5000);
  }

  scanDevices() {
    console.log('scanned for devices');
    this.devices = [];
  }
}
