import { CompletionUsage } from 'openai/resources';
import Model from '../model';

export default class MessageModel extends Model {
  public chatId!: string;

  public oid?: string;

  public content!: string;

  public modelIndex!: number;

  public usage!: CompletionUsage;

  constructor(partial: Partial<MessageModel> = {}) {
    super(partial);
    Object.assign(this, partial);
  }
}
