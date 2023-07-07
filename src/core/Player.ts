import IPerson from './IPerson';
import { v4 } from 'uuid';

export default class Player implements IPerson {
  name: string
  private _id: string
  constructor(name: string) {
    this.name = name;
    this._id = v4();
  }

  getId() {
    return this._id;
  }
}