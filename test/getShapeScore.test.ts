import { Card, Rank, Suit } from '../src/Card';
import { getCardShape } from '../src/getShape';
import { getShapeScore } from '../src/getShapeScore';

function parseBinary(text) {
  const target = text.split(' ').join('');
  return parseInt(target, 2);
}

test('royal flush score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Ten),
    new Card(Suit.Club, Rank.Jack),
    new Card(Suit.Club, Rank.Queen),
    new Card(Suit.Club, Rank.King),
  ];
  const shapeResult = getCardShape(cardList);
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('1010 0000 0000 0000 0000 0000'));
})
test('straight flush score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Club, Rank.Ten),
    new Card(Suit.Club, Rank.Jack),
    new Card(Suit.Club, Rank.Queen),
    new Card(Suit.Club, Rank.King),
  ];
  const shapeResult = getCardShape(cardList);
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('1001 0000 0011 1110 0000 0000'));
})
test('quads score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Spade, Rank.Nine),
    new Card(Suit.Heart, Rank.Nine),
    new Card(Suit.Diamond, Rank.Nine),
    new Card(Suit.Club, Rank.King),
  ];
  const shapeResult = getCardShape(cardList);
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('1000 0000 0000 0000 0000 1101'));
})
test('full house score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Spade, Rank.Nine),
    new Card(Suit.Heart, Rank.Nine),
    new Card(Suit.Diamond, Rank.Ten),
    new Card(Suit.Club, Rank.Ten),
  ];
  const shapeResult = getCardShape(cardList);
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0111 0000 0000 0000 1001 1010'));
})
test('flush score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Ace),
    new Card(Suit.Club, Rank.Ten),
    new Card(Suit.Club, Rank.Two),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Club, Rank.Five),
  ];
  const shapeResult = getCardShape(cardList);
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0110 0000 0100 0100 1010 0100'));
})
test('straight score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Diamond, Rank.Ten),
    new Card(Suit.Club, Rank.Six),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Club, Rank.Eight),
  ];
  const shapeResult = getCardShape(cardList);
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0101 0000 0000 0111 1100 0000'));
})
test('three of a kind score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Diamond, Rank.Nine),
    new Card(Suit.Heart, Rank.Nine),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Club, Rank.Ace),
  ];
  const shapeResult = getCardShape(cardList);
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0100 1001 0100 0000 1000 0000'));
})
test('two pairs score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Diamond, Rank.Nine),
    new Card(Suit.Heart, Rank.Ace),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Club, Rank.Ace),
  ];
  const shapeResult = getCardShape(cardList);
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0011 0000 0000 1110 1001 0111'));
})
test('one pair score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Nine),
    new Card(Suit.Diamond, Rank.Nine),
    new Card(Suit.Heart, Rank.Ace),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Club, Rank.Queen),
  ];
  const shapeResult = getCardShape(cardList);
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0010 1001 0101 0000 1000 0000'));
})
test('high card score', () => {
  const cardList = [
    new Card(Suit.Club, Rank.Two),
    new Card(Suit.Diamond, Rank.Nine),
    new Card(Suit.Heart, Rank.Ace),
    new Card(Suit.Club, Rank.Seven),
    new Card(Suit.Club, Rank.Queen),
  ];
  const shapeResult = getCardShape(cardList);
  const score = getShapeScore(shapeResult);
  expect(score).toBe(parseBinary('0001 0000 0101 0010 1000 0100'));
})
