import Dealer from './Dealer'
import Player from './Player'

export default class Table {
  private _dealer: Dealer
  private _seats: Array<Player | null>

  constructor(dealer: Dealer, numOfSeats: number = 8) {
    this._dealer = dealer;
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

  // getters
  get players(): Array<Player | null> {
    return this._seats.filter(player => !!player);
  }

  get dealer(): Dealer {
    return this._dealer;
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
}