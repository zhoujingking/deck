/**
 * Represents card suit
 */
export enum Suit {
  Spade = 'SPADE',
  Heart = 'HEART',
  Diamond = 'DIAMOND',
  Club = 'CLUB'
}

/**
 * Represents the number of card
 */
export enum Rank {
  Two = 2,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace
}

/**
 * Represents card
 */
export class Card {
  suit: Suit;
  rank: Rank;

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

/**
 * Represents card shape like Royal Flush, etc.
 */
export enum Shape {
  HighCards = 1,
  OnePair,
  TwoPairs,
  ThreeOfAKind,
  Straight,
  Flush,
  FullHouse,
  Quads,
  StraightFlush,
  RoyalFlush
}

export const HAND_LENTH = 5;