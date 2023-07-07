import { Card, Rank, Shape, Suit } from '../src/Card';
import { getShapeScore } from '../src/getShapeScore';

test('shape compare', () => {
  const royalFlushScore = getShapeScore({
    shape: Shape.RoyalFlush,
    cards: [
      new Card(Suit.Club, Rank.Ace),
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Club, Rank.Jack),
      new Card(Suit.Club, Rank.Ten)
    ]
  });
  const straightFlushScore = getShapeScore({
    shape: Shape.StraightFlush,
    cards: [
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Club, Rank.Jack),
      new Card(Suit.Club, Rank.Ten),
      new Card(Suit.Club, Rank.Nine)
    ]
  });
  const quadsScore = getShapeScore({
    shape: Shape.Quads,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Spade, Rank.Nine),
      new Card(Suit.Heart, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Club, Rank.King)
    ]
  });
  const fullhouseScore = getShapeScore({
    shape: Shape.FullHouse,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Spade, Rank.Nine),
      new Card(Suit.Heart, Rank.Nine),
      new Card(Suit.Diamond, Rank.Ten),
      new Card(Suit.Club, Rank.Ten),
    ]
  });
  const flushScore = getShapeScore({
    shape: Shape.Flush,
    cards: [
      new Card(Suit.Club, Rank.Ace),
      new Card(Suit.Club, Rank.Ten),
      new Card(Suit.Club, Rank.Seven),
      new Card(Suit.Club, Rank.Five),
      new Card(Suit.Club, Rank.Two)
    ]
  });
  const straightScore = getShapeScore({
    shape: Shape.Straight,
    cards: [
      new Card(Suit.Diamond, Rank.Ten),
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Club, Rank.Eight),
      new Card(Suit.Club, Rank.Seven),
      new Card(Suit.Club, Rank.Six)
    ]
  });
  const threeOfAKindScore = getShapeScore({
    shape: Shape.ThreeOfAKind,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Heart, Rank.Nine),
      new Card(Suit.Club, Rank.Ace),
      new Card(Suit.Club, Rank.Seven)
    ]
  });
  const twoPairsScore = getShapeScore({
    shape: Shape.TwoPairs,
    cards: [
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Ace),
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Club, Rank.Seven)
    ]
  });
  const onePairScore = getShapeScore({
    shape: Shape.OnePair,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Club, Rank.Seven)
    ]
  });
  const highCardsScore = getShapeScore({
    shape: Shape.HighCards,
    cards: [
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Club, Rank.Seven),
      new Card(Suit.Club, Rank.Two)
    ]
  });

  expect(royalFlushScore).toBeGreaterThan(straightFlushScore);
  expect(straightFlushScore).toBeGreaterThan(quadsScore);
  expect(quadsScore).toBeGreaterThan(fullhouseScore);
  expect(fullhouseScore).toBeGreaterThan(flushScore);
  expect(flushScore).toBeGreaterThan(straightScore);
  expect(straightScore).toBeGreaterThan(threeOfAKindScore);
  expect(threeOfAKindScore).toBeGreaterThan(twoPairsScore);
  expect(twoPairsScore).toBeGreaterThan(onePairScore);
  expect(onePairScore).toBeGreaterThan(highCardsScore);
})

test('straight flush comparison', () => {
  const straightFlushScore1 = getShapeScore({
    shape: Shape.StraightFlush,
    cards: [
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Club, Rank.Jack),
      new Card(Suit.Club, Rank.Ten),
      new Card(Suit.Club, Rank.Nine)
    ]
  });
  const straightFlushScore2 = getShapeScore({
    shape: Shape.StraightFlush,
    cards: [
      new Card(Suit.Diamond, Rank.King),
      new Card(Suit.Diamond, Rank.Queen),
      new Card(Suit.Diamond, Rank.Jack),
      new Card(Suit.Diamond, Rank.Ten),
      new Card(Suit.Diamond, Rank.Nine)
    ]
  });
  const straightFlushScore3 = getShapeScore({
    shape: Shape.StraightFlush,
    cards: [
      new Card(Suit.Diamond, Rank.Ace),
      new Card(Suit.Diamond, Rank.Five),
      new Card(Suit.Diamond, Rank.Four),
      new Card(Suit.Diamond, Rank.Three),
      new Card(Suit.Diamond, Rank.Two)
    ]
  });
  const straightFlushScore4 = getShapeScore({
    shape: Shape.StraightFlush,
    cards: [
      new Card(Suit.Diamond, Rank.Ten),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Diamond, Rank.Eight),
      new Card(Suit.Diamond, Rank.Seven),
      new Card(Suit.Diamond, Rank.Six)
    ]
  });

  expect(straightFlushScore1).toBe(straightFlushScore2);
  expect(straightFlushScore1).toBeGreaterThan(straightFlushScore4);
  expect(straightFlushScore1).toBeGreaterThan(straightFlushScore3);
})

test('quads score comparison', () => {
  const quadsScore1 = getShapeScore({
    shape: Shape.Quads,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Spade, Rank.Nine),
      new Card(Suit.Heart, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Club, Rank.Two)
    ]
  });
  const quadsScore2 = getShapeScore({
    shape: Shape.Quads,
    cards: [
      new Card(Suit.Club, Rank.Eight),
      new Card(Suit.Spade, Rank.Eight),
      new Card(Suit.Heart, Rank.Eight),
      new Card(Suit.Diamond, Rank.Eight),
      new Card(Suit.Club, Rank.Ace)
    ]
  });
  expect(quadsScore1).toBeGreaterThan(quadsScore2);
});
test('full house score comparison', () => {
  const fullhouseScore1 = getShapeScore({
    shape: Shape.FullHouse,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Spade, Rank.Nine),
      new Card(Suit.Heart, Rank.Nine),
      new Card(Suit.Diamond, Rank.Two),
      new Card(Suit.Club, Rank.Two),
    ]
  });
  const fullhouseScore2 = getShapeScore({
    shape: Shape.FullHouse,
    cards: [
      new Card(Suit.Club, Rank.Six),
      new Card(Suit.Spade, Rank.Six),
      new Card(Suit.Heart, Rank.Six),
      new Card(Suit.Diamond, Rank.Ace),
      new Card(Suit.Club, Rank.Ace),
    ]
  });
  const fullhouseScore3 = getShapeScore({
    shape: Shape.FullHouse,
    cards: [
      new Card(Suit.Club, Rank.Six),
      new Card(Suit.Spade, Rank.Six),
      new Card(Suit.Heart, Rank.Six),
      new Card(Suit.Diamond, Rank.Three),
      new Card(Suit.Club, Rank.Three),
    ]
  });
  expect(fullhouseScore1).toBeGreaterThan(fullhouseScore2);
  expect(fullhouseScore2).toBeGreaterThan(fullhouseScore3);
});

test('flush score comparison', () => {
  const flushScore1 = getShapeScore({
    shape: Shape.Flush,
    cards: [
      new Card(Suit.Club, Rank.Ace),
      new Card(Suit.Club, Rank.Ten),
      new Card(Suit.Club, Rank.Seven),
      new Card(Suit.Club, Rank.Five),
      new Card(Suit.Club, Rank.Two)
    ]
  });
  const flushScore2 = getShapeScore({
    shape: Shape.Flush,
    cards: [
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Ten),
      new Card(Suit.Club, Rank.Seven),
      new Card(Suit.Club, Rank.Five),
      new Card(Suit.Club, Rank.Two)
    ]
  });
  const flushScore3 = getShapeScore({
    shape: Shape.Flush,
    cards: [
      new Card(Suit.Club, Rank.Ace),
      new Card(Suit.Club, Rank.Ten),
      new Card(Suit.Club, Rank.Seven),
      new Card(Suit.Club, Rank.Four),
      new Card(Suit.Club, Rank.Two)
    ]
  });

  expect(flushScore1).toBeGreaterThan(flushScore2);
  expect(flushScore1).toBeGreaterThan(flushScore3);
})

test('straight score comparison', () => {
  const straightScore1 = getShapeScore({
    shape: Shape.Straight,
    cards: [
      new Card(Suit.Diamond, Rank.Ace),
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Club, Rank.Jack),
      new Card(Suit.Club, Rank.Ten)
    ]
  });
  const straightScore2 = getShapeScore({
    shape: Shape.Straight,
    cards: [
      new Card(Suit.Diamond, Rank.Ace),
      new Card(Suit.Club, Rank.Five),
      new Card(Suit.Club, Rank.Four),
      new Card(Suit.Club, Rank.Three),
      new Card(Suit.Club, Rank.Two)
    ]
  });
  const straightScore3 = getShapeScore({
    shape: Shape.Straight,
    cards: [
      new Card(Suit.Diamond, Rank.Ten),
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Club, Rank.Eight),
      new Card(Suit.Club, Rank.Seven),
      new Card(Suit.Club, Rank.Six)
    ]
  });

  expect(straightScore1).toBeGreaterThan(straightScore3);
  expect(straightScore3).toBeGreaterThan(straightScore2);
})

test('three of a kind score comparison', () => {
  const threeOfAKindScore1 = getShapeScore({
    shape: Shape.ThreeOfAKind,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Heart, Rank.Nine),
      new Card(Suit.Club, Rank.Ace),
      new Card(Suit.Club, Rank.Seven)
    ]
  });
  const threeOfAKindScore2 = getShapeScore({
    shape: Shape.ThreeOfAKind,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Heart, Rank.Nine),
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Seven)
    ]
  });
  const threeOfAKindScore3 = getShapeScore({
    shape: Shape.ThreeOfAKind,
    cards: [
      new Card(Suit.Club, Rank.Eight),
      new Card(Suit.Diamond, Rank.Eight),
      new Card(Suit.Heart, Rank.Eight),
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Seven)
    ]
  });
  expect(threeOfAKindScore1).toBeGreaterThan(threeOfAKindScore2);
  expect(threeOfAKindScore2).toBeGreaterThan(threeOfAKindScore3);
})
test('two pairs score comparison', () => {
  const twoPairsScore1 = getShapeScore({
    shape: Shape.TwoPairs,
    cards: [
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Ace),
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Club, Rank.Seven)
    ]
  });
  const twoPairsScore2 = getShapeScore({
    shape: Shape.TwoPairs,
    cards: [
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Ace),
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Club, Rank.Six)
    ]
  });
  const twoPairsScore3 = getShapeScore({
    shape: Shape.TwoPairs,
    cards: [
      new Card(Suit.Heart, Rank.King),
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Club, Rank.Six)
    ]
  });
  const twoPairsScore4 = getShapeScore({
    shape: Shape.TwoPairs,
    cards: [
      new Card(Suit.Heart, Rank.King),
      new Card(Suit.Club, Rank.King),
      new Card(Suit.Club, Rank.Seven),
      new Card(Suit.Diamond, Rank.Seven),
      new Card(Suit.Club, Rank.Ace)
    ]
  });
  expect(twoPairsScore1).toBeGreaterThan(twoPairsScore2);
  expect(twoPairsScore2).toBeGreaterThan(twoPairsScore3);
  expect(twoPairsScore3).toBeGreaterThan(twoPairsScore4);
})
test('one pair score comparison', () => {
  const onePairScore1 = getShapeScore({
    shape: Shape.OnePair,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Club, Rank.Seven)
    ]
  });
  const onePairScore2 = getShapeScore({
    shape: Shape.OnePair,
    cards: [
      new Card(Suit.Club, Rank.Nine),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Jack),
      new Card(Suit.Club, Rank.Seven)
    ]
  });
  const onePairScore3 = getShapeScore({
    shape: Shape.OnePair,
    cards: [
      new Card(Suit.Club, Rank.Two),
      new Card(Suit.Diamond, Rank.Two),
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Jack),
      new Card(Suit.Club, Rank.Seven)
    ]
  });

  expect(onePairScore1).toBeGreaterThan(onePairScore2);
  expect(onePairScore2).toBeGreaterThan(onePairScore3);
})
test('high cards score comparison', () => {
  const highCardsScore1 = getShapeScore({
    shape: Shape.HighCards,
    cards: [
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Diamond, Rank.Nine),
      new Card(Suit.Club, Rank.Seven),
      new Card(Suit.Club, Rank.Two)
    ]
  });
  const highCardsScore2 = getShapeScore({
    shape: Shape.HighCards,
    cards: [
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Diamond, Rank.Eight),
      new Card(Suit.Club, Rank.Seven),
      new Card(Suit.Club, Rank.Two)
    ]
  });
  const highCardsScore3 = getShapeScore({
    shape: Shape.HighCards,
    cards: [
      new Card(Suit.Heart, Rank.Ace),
      new Card(Suit.Club, Rank.Queen),
      new Card(Suit.Diamond, Rank.Eight),
      new Card(Suit.Club, Rank.Five),
      new Card(Suit.Club, Rank.Two)
    ]
  });
  expect(highCardsScore1).toBeGreaterThan(highCardsScore2);
  expect(highCardsScore2).toBeGreaterThan(highCardsScore3);
})


