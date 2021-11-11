import { app, BrowserWindow, ipcMain } from 'electron';
import { DeviceMessage } from './interfaces/DeviceMessage';
import { Configuration } from './classes/Configuration';
import { createAppWindow } from './views/app';

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
 * Validates the window is currently "alive"
 * All message payloads & the target window are passed to the device message handler
 */
ipcMain.on('device', (_, message: DeviceMessage) => {
  configuration.deviceMessageHandler.handleMessage(message);
});
