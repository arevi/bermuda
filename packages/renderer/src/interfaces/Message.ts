// Disabled intentionally because this Window interface will be merged with dom.lib.ts by TSC, extending the initial window object
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Window {
  api: WindowAPI;
}

interface WindowAPI {
  send: (channel: string, payload: any) => void;
}
