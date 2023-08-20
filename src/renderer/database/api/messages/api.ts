import { Options, Query } from 'sift/lib/core';
import CollectionAPI from '../collection.api';
import MessageModel from './model';

export default class MessagesApi<
  E extends MessageModel
> extends CollectionAPI<E> {
  private basedir = 'messages';

  protected filename(chatId: string): string {
    return `${this.basedir}/${chatId}.collection.json`;
  }

  public async init() {
    if (!(await this.exists(this.basedir))) {
      await this.makeDirectory(this.basedir);
    }
  }

  public async get(chatId: string): Promise<E[]> {
    return super.read(this.filename(chatId));
  }

  public async save(collection: E[], chatId: string) {
    return super.write(this.filename(chatId), collection);
  }

  public async insert(item: E): Promise<E> {
    const collection = await this.get(item.chatId);
    const entity = <E>new MessageModel(item);
    await this.save(super.insertDocument(collection, entity), item.chatId);
    return entity;
  }

  public async update(
    item: Partial<E>,
    chatId: string
  ): Promise<E | undefined> {
    const collection = await this.get(chatId);

    const updatedItem = super.updateDocument(collection, item);

    if (updatedItem) {
      await this.save(collection, chatId);
    }

    return <E>updatedItem;
  }

  public async find(
    chatId: string,
    query?: Query<E>,
    options?: Partial<Options> & { skip?: number; limit?: number }
  ): Promise<E[]> {
    return super.filter(await this.get(chatId), query, options);
  }
}
