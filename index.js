const { app, BrowserWindow } = require('electron');

const CONFIG_FLAGS = {
  DEV: ['--development', '--dev', '-D'],
};

const hasFlag = (flags) => {
  return flags?.some(flag => process.argv.includes(flag)) || false;
};

const isDev = hasFlag(CONFIG_FLAGS.DEV);

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 732,
    frame: false,
    webPreferences: {
      // preload: 'https://raw.githubusercontent.com/snrhokage/tobacco-factory/main/preload.js',
      preload: `data:text/javascript,
        console.log('TEST-CASE');
      `,

      webSecurity: false,
      allowRunningInsecureContent: true,

      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadURL('https://snrhokage.github.io/tobacco-factory/');
  }
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);