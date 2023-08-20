/* eslint-disable no-param-reassign */

import { ipcMain, dialog } from 'electron';
import { resolve as pathResolver } from 'path';
import FsLayer from '../layer/fs.layer';
import IPCChannel from './ipc.channel.enum';

export default class IPCMainAdaptor {
  public appDirectoryName = '.chat_gpt_app';

  public fsLayer!: FsLayer;

  constructor() {
    this.initIpcEventHandlers();
  }

  private initIpcEventHandlers() {
    ipcMain.handle(IPCChannel.SET_APP_DIRECTORY, async (_, path: string) =>
      this.handleSetAppDirectory(path)
    );

    ipcMain.handle(IPCChannel.PATH_EXISTS, async (_, path) =>
      this.fsLayer.exists(path)
    );

    ipcMain.handle(IPCChannel.MAKE_DIR, async (_, path) =>
      this.fsLayer.mkdir(path)
    );

    ipcMain.handle(IPCChannel.WRITE_FILE, async (_, path, content) =>
      this.fsLayer.write(path, content)
    );

    ipcMain.handle(IPCChannel.READ_FILE, async (_, path) =>
      this.fsLayer.read(path)
    );
  }

  private async openDirectoryPicker(): Promise<string | undefined> {
    const dialogResult = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });

    return dialogResult?.filePaths?.[0];
  }

  private async handleSetAppDirectory(path?: string): Promise<string> {
    if (!path) {
      const pickedDirectory = await this.openDirectoryPicker();
      if (pickedDirectory) {
        path = pathResolver(pickedDirectory, this.appDirectoryName);
      } else {
        return this.handleSetAppDirectory();
      }
    }

    this.fsLayer = new FsLayer(path);
    await this.fsLayer.init();

    return path;
  }
}
