import { Shape } from './Card';
import { ShapeResult } from './getShape';

/**
 * @return score
 * score is binary
 * 0bXXXX        XXXX XXXX XXXX XXXX XXXX
 * card shape    20bits to hold card score
 * @param ShapeResult 
 */
export function getShapeScore(shapeResult: ShapeResult): number {
  const { shape, cards } = shapeResult;
  const shapeScore = shape << 20;
  let cardScore = 0;
  switch (shape) {
    case Shape.RoyalFlush:
      cardScore = 0;
      break;
    case Shape.StraightFlush:
    case Shape.Flush:
    case Shape.Straight:
      // last 12 bits
      cardScore = cards.reduce((acc, curr) => {
        return acc + (0b1 << curr.rank);
      }, 0b0);
      break;
    case Shape.Quads:
      // 4 bits
      cardScore = cards[cards.length - 1].rank;
      break;
    case Shape.FullHouse:
      // 8 bits XXXX(triple)   XXXX(pair)
      const tripleRank1 = cards[0].rank << 4;
      const pairRank = cards[cards.length - 1].rank;
      cardScore = tripleRank1 + pairRank;
      break;
    case Shape.ThreeOfAKind:
      // 20 bits XXXX(triple) XXXX XXXX XXXX XXXX(high cards)
      const tripleRank2 = cards[0].rank << 16;
      const highScore = (0b1 << cards[3].rank) + (0b1 << cards[4].rank);
      cardScore = tripleRank2 + highScore;
      break;
    case Shape.TwoPairs:
      // 12 bits XXXX(high pair) XXXX(low pair) XXXX(high cards)
      cardScore = (cards[0].rank << 8) + (cards[2].rank << 4) + cards[4].rank;
      break;
    case Shape.OnePair:
      // 20 bits XXXX(pair) XXXX XXXX XXXX XXXX(high cards, 16bits)
      const doubleRank = cards[0].rank << 16;
      const highScore2 = (0b1 << cards[2].rank) + (0b1 << cards[3].rank) + (0b1 << cards[4].rank);
      console.log(doubleRank.toString(2))
      console.log(highScore2.toString(2))
      cardScore = doubleRank + highScore2;
      break;
    case Shape.HighCards:
      // 12 bits
      cardScore = cards.reduce((acc, curr) => {
        return acc + (0b1 << curr.rank);
      }, 0);
      break;
    default:
      cardScore = 0;
      break;
  }

  return shapeScore + cardScore;
}
