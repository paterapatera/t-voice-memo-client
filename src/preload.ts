import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    fileSave: async (newSentenses: string) => await ipcRenderer.invoke('file-save', newSentenses),
    fileOpen: async (filePath?: string) => await ipcRenderer.invoke('file-open', filePath),
});
