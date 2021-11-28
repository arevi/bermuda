import { app, BrowserWindow, ipcMain } from 'electron';
import { DeviceMessage } from './interfaces/DeviceMessage';
import { Configuration } from './classes/Configuration';
import { createAppWindow } from './views/app';
import { WindowMessage, WindowMessageType } from './interfaces/WindowMessage';

let configuration: Configuration;
let appWindow: BrowserWindow;

// Closes app once all windows closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  appWindow = createAppWindow();
  // MacOS
  app.on('activate', () => {
    appWindow = createAppWindow();
  });

  // Setup configuration by passing a function to retrieve app window
  configuration = new Configuration(() => appWindow);

  // Start listening for devices
  configuration.deviceManager.start();
});

/**
 * Handles all device messages that are sent from the renderer
 * All message payloads & the target window are passed to the device message handler
 */
ipcMain.on('device', (_, message: DeviceMessage) => {
  configuration.deviceMessageHandler.handleMessage(message);
});

/**
 * Handles all window messages that are sent from the renderer
 * Currently handles minimize/close events for the main app window
 */
ipcMain.on('window', (_, message: WindowMessage) => {
  switch (message.type) {
    case WindowMessageType.Close:
      appWindow.close();
      break;
    case WindowMessageType.Minimize:
      appWindow.minimize();
      break;
  }
});
