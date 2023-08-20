import BaseAPI from '../base.api';
import SettingModel from './model';

export default class SettingsApi extends BaseAPI {
  protected filename = () => 'settings.entity.json';

  private default = new SettingModel({
    messageFeedFontSize: 1,
    openAiCompletionStream: false,
    openAiApiKey: undefined,
  });

  public async init() {
    if (!(await this.exists(this.filename()))) {
      await this.write({ ...this.default });
    }
  }

  public async write(entity: SettingModel) {
    await this.writeFile(this.filename(), entity);
    return entity;
  }

  public async read(): Promise<SettingModel> {
    return (await this.readFile(this.filename())) ?? { ...this.default };
  }

  public async update(update: Partial<SettingModel>) {
    const entity = await this.read();
    Object.entries(update).forEach(([key, value]) => {
      entity[key as keyof SettingModel] = <never>value;
    });

    return this.write(entity);
  }
}
