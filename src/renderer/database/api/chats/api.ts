import { Options, Query } from 'sift/lib/core';
import CollectionAPI from '../collection.api';
import ChatModel from './model';

export default class ChatsApi<E extends ChatModel> extends CollectionAPI<E> {
  protected filename = () => 'chats.collection.json';

  public async init() {
    if (!(await this.exists(this.filename()))) {
      await this.save([]);
    }
  }

  public async get(): Promise<E[]> {
    return super.read(this.filename());
  }

  public async save(collection: E[]) {
    return super.write(this.filename(), collection);
  }

  public async insert(item: E): Promise<E> {
    const collection = await this.get();
    const entity = <E>new ChatModel(item);
    await this.save(super.insertDocument(collection, entity));
    return entity;
  }

  public async update(item: Partial<E>): Promise<E | undefined> {
    const collection = await this.get();

    const updatedItem = super.updateDocument(collection, item);

    if (updatedItem) {
      await this.save(collection);
    }

    return <E>updatedItem;
  }

  public async delete(_id: string): Promise<void> {
    const collection = await this.get();
    await this.save(super.deleteDocumentById(collection, _id));
  }

  public async find(
    query?: Query<E>,
    options?: Partial<Options> & { skip?: number; limit?: number }
  ): Promise<E[]> {
    return super.filter(await this.get(), query, options);
  }
}
