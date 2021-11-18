export interface DeviceMessage {
  type: DeviceMessageType;
  payload: DeviceMessagePayload;
}

export interface DeviceMessagePayload {
  udid: string;
  location?: string;
}

export enum DeviceMessageType {
  GetDevices = 'GetDevices',
  MountImage = 'MountImage',
  SetLocation = 'SetLocation',
}

export enum StatusMessageType {
  Success = 'Success',
  Error = 'Error',
}
