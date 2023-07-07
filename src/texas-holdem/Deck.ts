import { Card, Rank, Suit } from '../core/Card';
import _shuffle from '../utils/shuffle';

export default class Deck {
  private _cards: Array<Card>

  constructor() {
    this.reset();
  }

  private generateCards() {
    const cards: Array<Card> = [];

    [Suit.Spade, Suit.Heart, Suit.Diamond, Suit.Club].forEach(suit => {
      [ Rank.Ace, Rank.King, Rank.Queen, Rank.Jack, 
        Rank.Ten, Rank.Nine, Rank.Eight, Rank.Seven, 
        Rank.Six, Rank.Five, Rank.Four, Rank.Three, Rank.Two].forEach(rank => {
          cards.push(new Card(suit, rank))
        })
    })
    return cards;
  }

  get cards() {
    return this._cards;
  }

  reset() {
    this._cards = this.generateCards();
  }

  shuffle(): Array<Card> {
    return _shuffle(this._cards);
  }

  pick(): Card {
    return this._cards.shift();
  }
}
