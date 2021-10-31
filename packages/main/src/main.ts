import { app, BrowserWindow, ipcMain } from 'electron';
import { DeviceMessage } from './interfaces/DeviceMessage';
import { DeviceManager } from './utils/DeviceManager';
import { DeviceMessageHandler } from './utils/deviceMessageHandler';
import { createAppWindow } from './views/app';

let appWindow: BrowserWindow;

const deviceMessageHandler = new DeviceMessageHandler();
const deviceManager = new DeviceManager();

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
});

/**
 * Handles all device messages that are sent from the renderer
 * Validates the window is currently "alive"
 * All message payloads & the target window are passed to the device message handler
 */
ipcMain.on('device', (_, message: DeviceMessage) => {
  deviceMessageHandler.handleMessage(message, appWindow);
});

deviceManager.start();
