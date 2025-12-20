import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  invoke(...args) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
});