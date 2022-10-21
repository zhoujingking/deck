import { expect, describe, test } from '@jest/globals';

import Card, { CardRank, CardSuit } from './Card.js';
import { getPossibleStraightCards, preProcess } from './TexasHoldem.js';

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
    test('Seven cards: A2345 is a straight', () => {
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
    test('Seven cards: 23456 is a straight', () => {
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
    test('Seven cards: A234567 is a sevent high straight', () => {
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

