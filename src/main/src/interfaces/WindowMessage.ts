export interface WindowMessage {
  type: WindowMessageType;
}

export enum WindowMessageType {
  Minimize,
  Close,
}
