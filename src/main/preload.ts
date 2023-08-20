import { contextBridge, ipcRenderer } from 'electron';
import IPCChannel from '../database/adaptor/ipc.channel.enum';

const appDirCacheKey = 'application_directory';

const electronHandler = {
  saveApplicationDirectory: (path?: string) => {
    if (!path) {
      localStorage.removeItem(appDirCacheKey);
    } else {
      localStorage.setItem(appDirCacheKey, path);
    }
  },
  setApplicationDirectory: async (path?: string) => {
    const appDir = await ipcRenderer.invoke(
      IPCChannel.SET_APP_DIRECTORY,
      path ?? localStorage.getItem(appDirCacheKey) ?? undefined
    );
    electronHandler.saveApplicationDirectory(appDir);
    return !!appDir;
  },
  pickApplicationDirectory: async () => {
    const appDir = await ipcRenderer.invoke(IPCChannel.SET_APP_DIRECTORY);
    electronHandler.saveApplicationDirectory(appDir);
    return !!appDir;
  },
  exists: <T>(path: string): Promise<T> =>
    ipcRenderer.invoke(IPCChannel.PATH_EXISTS, path),
  makeDirectory: async (directoryName: string) =>
    ipcRenderer.invoke(IPCChannel.MAKE_DIR, directoryName),
  writeFile: <T>(filename: string, content: T) =>
    ipcRenderer.invoke(IPCChannel.WRITE_FILE, filename, content),
  readFile: <T>(filename: string): Promise<T> =>
    ipcRenderer.invoke(IPCChannel.READ_FILE, filename),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
