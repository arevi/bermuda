export interface DeviceMessage {
  type: DeviceMessageType;
}

export enum DeviceMessageType {
  GetDevices = 'GetDevices',
}
