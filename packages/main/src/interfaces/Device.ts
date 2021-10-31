export interface Device {
  udid: string;
  details: DeviceDetails;
  category: DeviceCategory;
  status: DeviceStatus;
  diskImage: DiskImage;
}

export interface DeviceDetails {
  name: string;
  version: string;
  model: string;
}

export interface DeviceStatus {
  connected: boolean;
  developer: boolean;
}

export interface DiskImage {
  path: string;
  signaturePath: string;
}

export enum DeviceCategory {
  iPhone = 'iPhone',
  iPad = 'iPad',
  iPod = 'iPod',
}
