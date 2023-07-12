import { Card } from '../core/Card';
import IDealer from '../core/IDealer';
import IDeck from '../core/IDeck';
import Stage from './Stage';
import Table from './Table';

export default class Dealer implements IDealer {
  name: string;
  private _deck?: IDeck = null;
  private _table?: Table = null;
  private _stage?: Stage;

  constructor(name: string) {
    this.name = name;
    this._stage = Stage.PREFLOP;
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

  dealPreflop() {
    const players = this._table.players;
    // preflop
    [1, 2].forEach(() => {
      players.forEach(player => {
        const card = this._deck.pop();
        player.addCard(card);
      })
    });
    this._stage = Stage.FLOP;
    return null;
  }

  /**
   * 
   * @returns burn card
   */
  dealFlop(): Card {
    // flop
    // burn card
    const burnCard = this._deck.pop();
    const flopCards = [1,2,3].map(() => this._deck.pop());
    this._table.flopCards = flopCards;
    this._stage = Stage.TURN;
    return burnCard;
  }

  dealTurn(): Card {
    // burn card
    const burnCard = this._deck.pop();
    this._table.turnCard = this._deck.pop();
    this._stage = Stage.RIVER;
    return burnCard;
  }

  dealRiver(): Card {
    // burn card
    const burnCard = this._deck.pop();
    this._table.riverCard = this._deck.pop();
    this._stage = Stage.PREFLOP;
    return burnCard;
  }

  /**
   * 
   * @returns muck card
   */
  deal(): Card | null {
    if (this._stage === Stage.PREFLOP) {
      return this.dealPreflop();
    } else if (this._stage === Stage.FLOP) {
      return this.dealFlop();
    } else if (this._stage === Stage.TURN) {
      return this.dealTurn();
    } else if (this._stage === Stage.RIVER) {
      return this.dealRiver();
    }
  }

  get stage(): Stage {
    return this._stage;
  }

  reset() {
    this._stage = Stage.PREFLOP;
    this._deck.reset();
    this._table.players.forEach(player => {
      player.resetCards();
    });
    this._table.resetCommunityCards();
  }
}