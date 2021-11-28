const { contextBridge, ipcRenderer } = require('electron');

const validChannels = ['device', 'status', 'window'];

contextBridge.exposeInMainWorld('api', {
  send: (channel: string, data: object) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel: string, callback: any) => {
    if (validChannels.includes(channel)) {
      const newCallback = (_: any, data: any) => callback(data);
      ipcRenderer.on(channel, newCallback);
    }
  },
});
