import fs from 'fs';
import { resolve as pathResolver } from 'path';

export default class FsLayer {
  constructor(public basePath: string) {}

  public async init() {
    await this.mkdir(this.basePath);
  }

  public resolvePath(...path: string[]): string {
    return pathResolver(this.basePath, ...path);
  }

  public async exists(path: string): Promise<boolean> {
    try {
      await fs.promises.access(this.resolvePath(path), fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async write<T = unknown>(path: string, content: T): Promise<void> {
    try {
      await fs.promises.writeFile(
        this.resolvePath(path),
        JSON.stringify(content)
      );
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  }

  public async read<T = unknown>(path: string): Promise<T | undefined> {
    try {
      const textContent = await fs.promises.readFile(this.resolvePath(path), {
        encoding: 'utf-8',
      });
      return <T>JSON.parse(textContent);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
    return undefined;
  }

  public async mkdir(path: string): Promise<void> {
    if (await this.exists(path)) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Location [${path}] already exists - skipping`);
      }
    } else {
      await fs.promises.mkdir(this.resolvePath(path), { recursive: true });
    }
  }
}
