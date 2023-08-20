import Q from 'sift';
import { Options, Query } from 'sift/lib/core';
import BaseAPI from './base.api';

type Entity = { _id?: string };

export default abstract class CollectionAPI<
  E extends Entity = Entity
> extends BaseAPI {
  protected async read(path: string, defaultValue: E[] = []): Promise<E[]> {
    return (await this.readFile(path)) ?? defaultValue;
  }

  protected async write(path: string, collection: E[]) {
    await this.writeFile(path, collection);
    return collection;
  }

  protected insertDocument(collection: E[], doc: E): E[] {
    collection.push(doc);
    return collection;
  }

  protected updateDocument(collection: E[], doc: Partial<E>): E | undefined {
    const original = this.findOneDocumentById(collection, doc._id!);

    if (original) {
      Object.entries(doc).forEach(([key, value]) => {
        original[key as keyof E] = <never>value;
      });
    }

    return original;
  }

  protected deleteDocumentById(collection: E[], _id: string): E[] {
    const entityIndex = this.findOneDocumentIndexById(collection, _id);
    if (entityIndex !== -1) {
      collection.splice(entityIndex, 1);
    }
    return collection;
  }

  protected filter(
    collection: E[],
    query?: Query<E>,
    options?: Partial<Options> & { skip?: number; limit?: number }
  ): E[] {
    const results = collection.filter(Q(query ?? <Query<E>>{}, options));
    return results.slice(options?.skip ?? 0, options?.limit ?? results.length);
  }

  protected findOneDocument(
    collection: E[],
    query?: Query<E>,
    options?: Partial<Options>
  ): E | undefined {
    return collection.find(Q(query ?? <Query<E>>{}, options));
  }

  protected findOneDocumentById(collection: E[], _id: string): E | undefined {
    return collection.find(Q<Entity>({ _id }));
  }

  protected findOneDocumentIndexById(collection: E[], _id: string): number {
    return collection.findIndex(Q<Entity>({ _id }));
  }
}
