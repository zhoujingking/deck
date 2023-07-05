import { Card, Rank, Suit } from '../src/Card';
import { getCountMapByRank, getCountMapBySuit } from '../src/utilities';

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