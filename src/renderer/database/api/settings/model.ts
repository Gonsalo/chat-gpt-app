export default class SettingModel {
  public openAiApiKey?: string;

  public openAiCompletionStream?: boolean;

  public messageFeedFontSize?: number;

  constructor(partial: Partial<SettingModel> = {}) {
    Object.assign(this, partial);
  }
}
