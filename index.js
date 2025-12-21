const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  win = new BrowserWindow();
  win.loadURL('https://google.com');
  
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