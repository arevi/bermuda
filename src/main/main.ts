import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow | null;
const isDev: boolean = process.env.ELECTRON_ENV === 'dev';

// Render main window w/ configuration settings
const renderWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 200,
    height: 500,
    minWidth: 200,
    minHeight: 500,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev,
    },
    title: 'test',
  });

  // Depending on the environment the frontend will either load from the react server or the static html file
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000/');
  } else {
    mainWindow.loadFile('./build/index.html');
  }

  // Detect if devtools was somehow opened outside development
  mainWindow.webContents.on('devtools-opened', () => {
    if (!isDev) {
      mainWindow?.webContents.closeDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Closes app once all windows closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  renderWindow();

  // MacOS
  app.on('activate', () => {
    if (mainWindow === null) renderWindow();
  });
});
