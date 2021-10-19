export interface Device {
  name: string;
  version: string;
  model: string;
  category: DeviceCategory;
  connected: boolean;
  developer: boolean;
}

export enum DeviceCategory {
  iPhone = 'iPhone',
  iPad = 'iPad',
  iPod = 'iPod',
}
