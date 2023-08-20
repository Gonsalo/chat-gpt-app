export default abstract class BaseAPI {
  protected exists = window.electron.exists;

  protected makeDirectory = window.electron.makeDirectory;

  protected writeFile = window.electron.writeFile;

  protected readFile = window.electron.readFile;

  protected abstract filename(...args: unknown[]): string;
}
