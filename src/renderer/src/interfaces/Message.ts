export interface DeviceMessage {
  type: DeviceMessageType;
}

export enum DeviceMessageType {
  GetDevices = 'GetDevices',
}

export interface WindowMessage {
  type: WindowMessageType;
}

export enum WindowMessageType {
  Minimize,
  Close,
}

export interface StatusMessage {
  type: 'Success' | 'Error';
  message: string;
}
