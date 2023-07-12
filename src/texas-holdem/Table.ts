import Dealer from './Dealer'
import Player from '../core/Player'
import ITable from '../core/ITable';
import { Card } from '../core/Card';

class Table implements ITable {
  private _seats: Array<Player | null>;
  private _flopCards: Array<Card> = [];
  _dealer: Dealer;
  turnCard: Card;
  riverCard: Card;

  constructor(numOfSeats: number = 8) {
    this._seats = new Array<Player | null>(numOfSeats).fill(null);
  }

  addPlayer(player: Player) {
    // first check if player is already in the table
    if (this._seats.includes(player)) {
      throw new RangeError('Player is alread in the table');
    }
    // find the first available seat
    const availableIndex = this._seats.findIndex(p => !p);
    if (availableIndex === -1) {
      throw new RangeError('Table is full, can\'t add new player');
    }
    this._seats[availableIndex] = player;
  }

  removePlayer(player: Player) {
    const availableIndex = this._seats.findIndex(p => p === player);
    if (availableIndex === -1) {
      throw new RangeError('Player is not in the table');
    }
    this._seats[availableIndex] = null;
  }

  /**
   * if the table already has one dealer, the replace it
   * @param dealer 
   */
  addDealer(dealer: Dealer) {
    if (this._dealer) { // unbound this table
      this._dealer.setTable(null);
    }
    this._dealer = dealer;
    dealer.setTable(this);
  }

  get dealer(): Dealer {
    return this._dealer;
  }

  // getters
  get players(): Array<Player> {
    return this._seats.filter(player => !!player);
  }

  get seats(): Array<Player | null> {
    return this._seats;
  }

  get availableSeats(): Array<number> {
    const seats = [];
    this._seats.forEach((player, index) => {
      if (!player) {
        seats.push(index);
      }
    })
    return seats;
  }

  get flopCards() {
    return this._flopCards;
  }

  set flopCards(value: Array<Card>) {
    if (value.length !== 3) {
      throw new Error('Flop must have three cards');
    }
    this._flopCards = value;
  }

  resetCommunityCards() {
    this._flopCards = [];
    this.turnCard = undefined;
    this.riverCard = undefined;
  }
}

export default Table;