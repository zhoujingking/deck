import { expect, describe, test } from '@jest/globals';

import Card, { CardRank, CardSuit } from './Card.js';
import { 
  getPossibleStraightCards, 
  getPossibleFlushCards
} from './utilities.js';

describe('getPossibleStraightCards test', () => {
  describe('less than five cards', () => {
    test('No five unique rank cards, no straight', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Heart, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
      ];
      const result = getPossibleStraightCards(cardList);
      expect(result.length).toBe(0)
    })
  })
  describe('five cards', () => {
    test('Five subseqent cards is straight', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Diamond, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
        new Card(CardSuit.Heart, CardRank.Six),
      ];
      const result = getPossibleStraightCards(cardList);
      expect(result.length).toBe(1);
    })
    test('Edge case: A2345 is a straight', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Spade, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
        new Card(CardSuit.Heart, CardRank.Ace),
      ];
      const result = getPossibleStraightCards(cardList);
      expect(result.length).toBe(1);
    })
  })

  describe('greater than 5 cards', () => {
    test('Seven cards: 23455AK has a straight', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Spade, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
        new Card(CardSuit.Spade, CardRank.Five),
        new Card(CardSuit.Heart, CardRank.Ace),
        new Card(CardSuit.Heart, CardRank.King),
      ];
      const result = getPossibleStraightCards(cardList);
      expect(result.length).toBe(1);
    })
    test('Seven cards: 23456K10 has exactly one straight', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Spade, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
        new Card(CardSuit.Heart, CardRank.Six),
        new Card(CardSuit.Heart, CardRank.King),
        new Card(CardSuit.Heart, CardRank.Ten),
      ];
      const result = getPossibleStraightCards(cardList);
      expect(result.length).toBe(1);
    })
    test('Seven cards: A234567 has three possible straights', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Spade, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
        new Card(CardSuit.Heart, CardRank.Six),
        new Card(CardSuit.Heart, CardRank.Ace),
        new Card(CardSuit.Heart, CardRank.Seven),
      ];
      const result = getPossibleStraightCards(cardList);
      expect(result.length).toBe(3);
    })
  })

  
})

describe('getPossibleFlushCards test', () => {
  describe('less then 5 cards', () => {
    test('no flush with 4 suited cards', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Heart, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
      ];
      const result = getPossibleFlushCards(cardList);
      expect(result.length).toBe(0)
    })
  })
  describe('>= 5 cards', () => {
    test('flush with 5 suited cards', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Heart, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
        new Card(CardSuit.Heart, CardRank.Six)
      ];
      const result = getPossibleFlushCards(cardList);
      expect(result.length).toBe(5)
    })
    test('flush with 6 suited cards', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Heart, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
        new Card(CardSuit.Heart, CardRank.Six),
        new Card(CardSuit.Heart, CardRank.Seven),
      ];
      const result = getPossibleFlushCards(cardList);
      expect(result.length).toBe(6)
    })
    test('flush with 7 suited cards', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Heart, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
        new Card(CardSuit.Heart, CardRank.Ace),
        new Card(CardSuit.Heart, CardRank.King),
        new Card(CardSuit.Heart, CardRank.Ten)
      ];
      const result = getPossibleFlushCards(cardList);
      expect(result.length).toBe(7);
    })
    test('7 cards with 5 suited cards', () => {
      const cardList = [
        new Card(CardSuit.Heart, CardRank.Two),
        new Card(CardSuit.Heart, CardRank.Three),
        new Card(CardSuit.Heart, CardRank.Four),
        new Card(CardSuit.Heart, CardRank.Five),
        new Card(CardSuit.Spade, CardRank.Ace),
        new Card(CardSuit.Diamond, CardRank.King),
        new Card(CardSuit.Heart, CardRank.Ten),
      ];
      const result = getPossibleFlushCards(cardList);
      expect(result.length).toBe(5)
    })
  })
})

