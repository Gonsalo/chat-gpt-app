// @ts-ignore
import { v4 as uuid } from 'uuid';

export default class Model {
  public _id!: string;

  constructor(partial: Partial<Model> = {}) {
    Object.assign(this, partial);
    if (this._id === undefined) {
      this._id = uuid();
    }
  }
}
