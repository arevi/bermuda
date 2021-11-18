export interface DeviceMessage {
  type: DeviceMessageType;
}

export enum DeviceMessageType {
  GetDevices = 'GetDevices',
}

export interface StatusMessage {
  type: 'Success' | 'Error';
  message: string;
}
