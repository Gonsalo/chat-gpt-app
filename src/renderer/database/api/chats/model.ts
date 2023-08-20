import Usage from 'renderer/types/Usage';
import Model from '../model';

export default class ChatModel extends Model {
  public name!: string;

  public updatedAt?: number;

  public modelIndex?: number;

  public usage?: Usage;

  public active?: boolean;

  constructor(partial: Partial<ChatModel> = {}) {
    super(partial);
    Object.assign(this, partial);
    if (this.active === undefined) {
      this.active = true;
    }

    if (this.updatedAt === undefined) {
      this.updatedAt = Date.now();
    }
  }
}
