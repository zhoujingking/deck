import { Card, Rank, Shape, Suit } from '../src/Card';
import { getShapeScore } from '../src/getShapeScore';

function parseBinary(text) {
  const target = text.split(' ').join('');
  return parseInt(target, 2);
}

test('royal flush score', () => {
  const shapeResult = {
    shape: Shape.RoyalFlush,
    cards: [
      new Card(Suit.Club, Rank.Ace),
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Club, Rank.Jack),
      new Card(Suit.Club, Rank.Ten)
    ]
  };
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('1010 0000 0000 0000 0000 0000'));
})
test('straight flush score', () => {
  const shapeResult = {
    shape: Shape.StraightFlush,
    cards: [
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Club, Rank.Jack),
      new Card(Suit.Club, Rank.Ten),
      new Card(Suit.Club, Rank.Nine)
    ]
  };
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('1001 0000 0011 1110 0000 0000'));
})
test('quads score', () => {
  const shapeResult = {
    shape: Shape.Quads,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Spade, Rank.Nine),
      new Card(Suit.Heart, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Club, Rank.King),
    ]
  };
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('1000 0000 0000 0000 0000 1101'));
})
test('full house score', () => {
  const shapeResult = {
    shape: Shape.FullHouse,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Spade, Rank.Nine),
      new Card(Suit.Heart, Rank.Nine),
      new Card(Suit.Diamond, Rank.Ten),
      new Card(Suit.Club, Rank.Ten),
    ]
  };
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0111 0000 0000 0000 1001 1010'));
})
test('flush score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Ten),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Club, Rank.Five),
    new Card(Suit.Club, Rank.Two),
  ];
  const shapeResult = {
    shape: Shape.Flush,
    cards: cardList
  }
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0110 0000 0100 0100 1010 0100'));
})
test('straight score', () => {
  const cardList = [
    new Card(Suit.Diamond, Rank.Ten),
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Club, Rank.Eight),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Club, Rank.Six)
  ];
  const shapeResult = {
    shape: Shape.Straight,
    cards: cardList
  }
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0101 0000 0000 0111 1100 0000'));
})
test('three of a kind score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Diamond, Rank.Nine),
    new Card(Suit.Heart, Rank.Nine),
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Seven)
  ];
  const shapeResult = {
    shape: Shape.ThreeOfAKind,
    cards: cardList
  };
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0100 1001 0100 0000 1000 0000'));
})
test('two pairs score', () => {
  const cardList = [
    new Card(Suit.Heart, Rank.Ace),
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Diamond, Rank.Nine),
    new Card(Suit.Club, Rank.Seven)
  ];
  const shapeResult = {
    shape: Shape.TwoPairs,
    cards: cardList
  };
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0011 0000 0000 1110 1001 0111'));
})
test('one pair score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Diamond, Rank.Nine),
    new Card(Suit.Heart, Rank.Ace),
    new Card(Suit.Club, Rank.Queen),
    new Card(Suit.Club, Rank.Seven)
  ];
  const shapeResult = {
    shape: Shape.OnePair,
    cards: cardList
  };
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0010 1001 0101 0000 1000 0000'));
})
test('high card score', () => {
  const cardList = [
    new Card(Suit.Heart, Rank.Ace),
    new Card(Suit.Club, Rank.Queen),
    new Card(Suit.Diamond, Rank.Nine),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Club, Rank.Two)
  ];
  const shapeResult = {
    shape: Shape.HighCards,
    cards: cardList
  };
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0001 0000 0101 0010 1000 0100'));
})
