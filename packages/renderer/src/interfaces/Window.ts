export {};
declare global {
  interface Window {
    api: WindowAPI;
  }
}

interface WindowAPI {
  send: (channel: string, payload: any) => void;
  on: (channel: string, callback: any) => void;
}
