import { Card } from './Card';

/**
 * Represents hand type like Royal Flush, etc.
 */
 export enum HandType {
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

export type HoldemHand = {
  type: HandType,
  cards: Card[]
}

export const CARD_LENGTH = 5;