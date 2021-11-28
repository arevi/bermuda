import { BrowserWindow } from 'electron';
import { isDev } from '../utils/isDev';

export const createAppWindow = () => {
  const window = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    center: true,
    webPreferences: {
      contextIsolation: true,
      devTools: isDev,
      preload: __dirname + '/preload.js',
    },
    frame: false,
    maximizable: false,
  });

  // Depending on the environment the frontend will either load from the react server or the static html file
  if (isDev) {
    window.loadURL('http://localhost:3000/');
  } else {
    window.loadFile('./app/index.html');
  }

  // Detect if devtools was somehow opened outside development
  window.webContents.on('devtools-opened', () => {
    if (!isDev) {
      window?.webContents.closeDevTools();
    }
  });

  return window;
};
