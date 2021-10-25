const { contextBridge, ipcRenderer } = require('electron');

const validChannels = ['device'];

contextBridge.exposeInMainWorld('api', {
  send: (channel: string, data: object) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: any) => {
    if (validChannels.includes(channel)) {
      console.log(func);
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
