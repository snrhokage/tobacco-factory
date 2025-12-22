const { app, BrowserWindow } = require('electron');

console.log(process.argv);
console.log(process.argv.find((e) => e === '--dev' || '-D'));
console.log(!!process.argv.find((e) => e === '--dev' || '-D'));

const isDev = !!process.argv.find((e) => e === '--dev' || '-D');

const createWindow = () => {
  win = new BrowserWindow();

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadURL('https://google.com');
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