import IPerson from './IPerson';
import { v4 } from 'uuid';
import { Card } from './Card';

class Player implements IPerson {
  name: string
  private _id: string
  private _cards: Array<Card>

  constructor(name: string) {
    this.name = name;
    this._id = v4();
    this._cards = [];
  }

  getId() {
    return this._id;
  }

  addCard(card: Card) {
    this._cards.push(card);
  }
}

export default Player;