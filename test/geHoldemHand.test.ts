import { Card, Rank, Suit } from '../src/Card';
import { getHoldemHand } from '../src/getHoldemHand';
import { HandType } from '../src/TexasHoldem';

test('royal flush', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Ten),
    new Card(Suit.Club, Rank.Jack),
    new Card(Suit.Club, Rank.Queen),
    new Card(Suit.Club, Rank.King),
    new Card(Suit.Diamond, Rank.Nine),
  ];
  const { type } = getHoldemHand(cardList);
  expect(type).toBe(HandType.RoyalFlush);
})

test('not royal flush', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Ten),
    new Card(Suit.Club, Rank.Eight),
    new Card(Suit.Club, Rank.Queen),
    new Card(Suit.Club, Rank.King),
    new Card(Suit.Diamond, Rank.Nine),
  ];
  const {type} = getHoldemHand(cardList);
  expect(type).not.toBe(HandType.RoyalFlush);
})

test('straight flush', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Ten),
    new Card(Suit.Club, Rank.Eight),
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Club, Rank.Six),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Diamond, Rank.Nine),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.StraightFlush);
  expect(cards[0].suit).toBe(Suit.Club);
  expect(cards[0].rank).toBe(Rank.Ten);
  expect(cards[1].rank).toBe(Rank.Nine);
  expect(cards[2].rank).toBe(Rank.Eight);
  expect(cards[3].rank).toBe(Rank.Seven);
  expect(cards[4].rank).toBe(Rank.Six);
})

test('straight flush A2345', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Five),
    new Card(Suit.Club, Rank.Three),
    new Card(Suit.Club, Rank.Four),
    new Card(Suit.Club, Rank.Two),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Diamond, Rank.Nine),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.StraightFlush);
  expect(cards[0].suit).toBe(Suit.Club);
  expect(cards[0].rank).toBe(Rank.Ace);
  expect(cards[1].rank).toBe(Rank.Five);
  expect(cards[2].rank).toBe(Rank.Four);
  expect(cards[3].rank).toBe(Rank.Three);
  expect(cards[4].rank).toBe(Rank.Two);
})

test('straight flush A234567', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Five),
    new Card(Suit.Club, Rank.Three),
    new Card(Suit.Club, Rank.Four),
    new Card(Suit.Club, Rank.Two),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Club, Rank.Six),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.StraightFlush);
  expect(cards[0].suit).toBe(Suit.Club);
  expect(cards[0].rank).toBe(Rank.Seven);
  expect(cards[1].rank).toBe(Rank.Six);
  expect(cards[2].rank).toBe(Rank.Five);
  expect(cards[3].rank).toBe(Rank.Four);
  expect(cards[4].rank).toBe(Rank.Three);
})

test('quads', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Diamond, Rank.Ace),
    new Card(Suit.Heart, Rank.Ace),
    new Card(Suit.Spade, Rank.Ace),
    new Card(Suit.Club, Rank.Two),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Diamond, Rank.Nine),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.Quads);
  expect(cards[0].rank).toBe(Rank.Ace);
  expect(cards[1].rank).toBe(Rank.Ace);
  expect(cards[2].rank).toBe(Rank.Ace);
  expect(cards[3].rank).toBe(Rank.Ace);
  expect(cards[4].rank).toBe(Rank.Nine);
})

test('full house', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Diamond, Rank.Ace),
    new Card(Suit.Heart, Rank.Ace),
    new Card(Suit.Spade, Rank.King),
    new Card(Suit.Club, Rank.King),
    new Card(Suit.Heart, Rank.King),
    new Card(Suit.Diamond, Rank.Nine),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.FullHouse);
  expect(cards[0].rank).toBe(Rank.Ace);
  expect(cards[1].rank).toBe(Rank.Ace);
  expect(cards[2].rank).toBe(Rank.Ace);
  expect(cards[3].rank).toBe(Rank.King);
  expect(cards[4].rank).toBe(Rank.King);
})

test('flush', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Diamond, Rank.Ace),
    new Card(Suit.Diamond, Rank.Queen),
    new Card(Suit.Diamond, Rank.Ten),
    new Card(Suit.Diamond, Rank.Nine),
    new Card(Suit.Diamond, Rank.Eight),
    new Card(Suit.Diamond, Rank.King),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.Flush);
  expect(cards[0].suit).toBe(Suit.Diamond);
  expect(cards[0].rank).toBe(Rank.Ace);
  expect(cards[1].rank).toBe(Rank.King);
  expect(cards[2].rank).toBe(Rank.Queen);
  expect(cards[3].rank).toBe(Rank.Ten);
  expect(cards[4].rank).toBe(Rank.Nine);
})

test('straight', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Spade, Rank.Ten),
    new Card(Suit.Diamond, Rank.Eight),
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Club, Rank.Six),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Diamond, Rank.Five),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.Straight);
  expect(cards[0].rank).toBe(Rank.Ten);
  expect(cards[1].rank).toBe(Rank.Nine);
  expect(cards[2].rank).toBe(Rank.Eight);
  expect(cards[3].rank).toBe(Rank.Seven);
  expect(cards[4].rank).toBe(Rank.Six);
})

test('straight A2345', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Five),
    new Card(Suit.Diamond, Rank.Three),
    new Card(Suit.Heart, Rank.Four),
    new Card(Suit.Club, Rank.Two),
    new Card(Suit.Spade, Rank.Seven),
    new Card(Suit.Diamond, Rank.Eight),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.Straight);
  expect(cards[0].rank).toBe(Rank.Ace);
  expect(cards[1].rank).toBe(Rank.Five);
  expect(cards[2].rank).toBe(Rank.Four);
  expect(cards[3].rank).toBe(Rank.Three);
  expect(cards[4].rank).toBe(Rank.Two);
})

test('straight A234567', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Five),
    new Card(Suit.Diamond, Rank.Three),
    new Card(Suit.Club, Rank.Four),
    new Card(Suit.Spade, Rank.Two),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Diamond, Rank.Six),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.Straight);
  expect(cards[0].rank).toBe(Rank.Seven);
  expect(cards[1].rank).toBe(Rank.Six);
  expect(cards[2].rank).toBe(Rank.Five);
  expect(cards[3].rank).toBe(Rank.Four);
  expect(cards[4].rank).toBe(Rank.Three);
})

test('three of a kind', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Five),
    new Card(Suit.Diamond, Rank.Ace),
    new Card(Suit.Club, Rank.Four),
    new Card(Suit.Spade, Rank.Ace),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Diamond, Rank.Six),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.ThreeOfAKind);
  expect(cards[0].rank).toBe(Rank.Ace);
  expect(cards[1].rank).toBe(Rank.Ace);
  expect(cards[2].rank).toBe(Rank.Ace);
  expect(cards[3].rank).toBe(Rank.Seven);
  expect(cards[4].rank).toBe(Rank.Six);
})

test('two pairs', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Six),
    new Card(Suit.Diamond, Rank.Eight),
    new Card(Suit.Club, Rank.Eight),
    new Card(Suit.Spade, Rank.Ace),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Diamond, Rank.Six),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.TwoPairs);
  expect(cards[0].rank).toBe(Rank.Ace);
  expect(cards[1].rank).toBe(Rank.Ace);
  expect(cards[2].rank).toBe(Rank.Eight);
  expect(cards[3].rank).toBe(Rank.Eight);
  expect(cards[4].rank).toBe(Rank.Seven);
})

test('one pair', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.King),
    new Card(Suit.Diamond, Rank.Five),
    new Card(Suit.Club, Rank.Eight),
    new Card(Suit.Spade, Rank.Ace),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Diamond, Rank.Six),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.OnePair);
  expect(cards[0].rank).toBe(Rank.Ace);
  expect(cards[1].rank).toBe(Rank.Ace);
  expect(cards[2].rank).toBe(Rank.King);
  expect(cards[3].rank).toBe(Rank.Eight);
  expect(cards[4].rank).toBe(Rank.Seven);
})

test('high cards', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.King),
    new Card(Suit.Diamond, Rank.Five),
    new Card(Suit.Club, Rank.Eight),
    new Card(Suit.Spade, Rank.Two),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Diamond, Rank.Six),
  ];
  const {type, cards} = getHoldemHand(cardList);
  expect(type).toBe(HandType.HighCards);
  expect(cards[0].rank).toBe(Rank.Ace);
  expect(cards[1].rank).toBe(Rank.King);
  expect(cards[2].rank).toBe(Rank.Eight);
  expect(cards[3].rank).toBe(Rank.Seven);
  expect(cards[4].rank).toBe(Rank.Six);
})