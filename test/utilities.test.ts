import { Card, Rank, Shape, Suit } from '../src/Card';
import { getCardShape, getCountMapByRank, getCountMapBySuit } from '../src/utilities';

test('get count map by suit', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Diamond, Rank.Ace),
    new Card(Suit.Spade, Rank.Ace),
    new Card(Suit.Heart, Rank.Ace),
    new Card(Suit.Club, Rank.Two),
    new Card(Suit.Club, Rank.Three),
  ];

  const countMap = getCountMapBySuit(cardList);
  expect(Object.keys(countMap).length).toBe(4);
  expect(countMap[Suit.Club].length).toBe(3);
  expect(countMap[Suit.Diamond].length).toBe(1);
  expect(countMap[Suit.Spade].length).toBe(1);
  expect(countMap[Suit.Heart].length).toBe(1);
})

test('get count map by rank', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Diamond, Rank.Ace),
    new Card(Suit.Spade, Rank.Ace),
    new Card(Suit.Heart, Rank.Ace),
    new Card(Suit.Club, Rank.Two),
    new Card(Suit.Club, Rank.Three),
  ];

  const countMap = getCountMapByRank(cardList);
  expect(Object.keys(countMap).length).toBe(3);
  expect(countMap[Rank.Ace].length).toBe(4);
  expect(countMap[Rank.Two].length).toBe(1);
  expect(countMap[Rank.Three].length).toBe(1);
})

test('royal flush', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Ten),
    new Card(Suit.Club, Rank.Jack),
    new Card(Suit.Club, Rank.Queen),
    new Card(Suit.Club, Rank.King),
    new Card(Suit.Diamond, Rank.Nine),
  ];
  const [shape] = getCardShape(cardList);
  expect(shape).toBe(Shape.RoyalFlush);
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
  const [shape] = getCardShape(cardList);
  expect(shape).not.toBe(Shape.RoyalFlush);
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
  const [shape, cards] = getCardShape(cardList);
  expect(shape).toBe(Shape.StraightFlush);
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
  const [shape, cards] = getCardShape(cardList);
  expect(shape).toBe(Shape.StraightFlush);
  expect(cards[0].suit).toBe(Suit.Club);
  expect(cards[0].rank).toBe(Rank.Ace);
  expect(cards[1].rank).toBe(Rank.Five);
  expect(cards[2].rank).toBe(Rank.Four);
  expect(cards[3].rank).toBe(Rank.Three);
  expect(cards[4].rank).toBe(Rank.Two);
})