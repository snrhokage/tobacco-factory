"use strict";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld('electronAPI', {
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
});