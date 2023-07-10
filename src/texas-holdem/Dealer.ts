import { Card } from '../core/Card';
import IDealer from '../core/IDealer';
import IDeck from '../core/IDeck';
import Table from './Table';

export default class Dealer implements IDealer {
  name: string;
  private _deck?: IDeck = null;
  private _table?: Table = null;

  constructor(name: string) {
    this.name = name;
  }

  setDeck(deck: IDeck) {
    this._deck = deck;
  }

  pick(): Card {
    return this._deck.pop();
  }

  shuffle(){
    this._deck.shuffle();
  }

  setTable(tbl: Table) {
    this._table = tbl;
  }

  deal() {
    const players = this._table.players;
    // preflop
    [1, 2].forEach(() => {
      players.forEach(player => {
        const card = this._deck.pop();
        player.addCard(card);
      })
    });
    
    // flop
    // burn card
    this._deck.pop();
    const flopCards = [1,2,3].map(() => this._deck.pop());
    this._table.flopCards = flopCards;
    // burn card
    this._deck.pop();
    this._table.turnCard = this._deck.pop();
    // burn card
    this._deck.pop();
    this._table.riverCard = this._deck.pop();
  }
}