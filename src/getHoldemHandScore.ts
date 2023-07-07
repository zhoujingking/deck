import { Rank } from './Card';
import { HandType, HoldemHand } from './TexasHoldem';

function getShapeTypeScore(type: HandType) {
  return type << 20;
}

/**
 * @return score
 * score is binary of total 24bits, including card type score and cards' score
 * 0bXXXX        XXXX XXXX XXXX XXXX XXXX
 * card type    20bits to hold card score
 * @param HoldemHand 
 */
export function getHoldemHandScore(holdemHand: HoldemHand): number {
  const { type, cards } = holdemHand;
  const typeScroe = type << 20;
  let cardScore = 0;
  switch (type) {
    case HandType.RoyalFlush:
      cardScore = 0;
      break;
    case HandType.StraightFlush:
    case HandType.Straight:
      // last 12 bits
      cardScore = cards.reduce((acc, curr) => {
        return acc + (0b1 << (curr.rank === Rank.Ace ? 1 : curr.rank));
      }, 0b0);
      break;
    case HandType.Quads:
      // 8 bits XXXX(quads) XXXX(high card)
      cardScore = (cards[0].rank << 4) + cards[cards.length - 1].rank;
      break;
    case HandType.FullHouse:
      // 8 bits XXXX(triple)   XXXX(pair)
      const tripleRank1 = cards[0].rank << 4;
      const pairRank = cards[cards.length - 1].rank;
      cardScore = tripleRank1 + pairRank;
      break;
    case HandType.Flush:
      // last 12 bits
      cardScore = cards.reduce((acc, curr) => {
        return acc + (0b1 << curr.rank);
      }, 0b0);
      break;
    case HandType.ThreeOfAKind:
      // 20 bits XXXX(triple) XXXX XXXX XXXX XXXX(high cards)
      const tripleRank2 = cards[0].rank << 16;
      const highScore = (0b1 << cards[3].rank) + (0b1 << cards[4].rank);
      cardScore = tripleRank2 + highScore;
      break;
    case HandType.TwoPairs:
      // 12 bits XXXX(high pair) XXXX(low pair) XXXX(high cards)
      cardScore = (cards[0].rank << 8) + (cards[2].rank << 4) + cards[4].rank;
      break;
    case HandType.OnePair:
      // 20 bits XXXX(pair) XXXX XXXX XXXX XXXX(high cards, 16bits)
      const doubleRank = cards[0].rank << 16;
      const highScore2 = (0b1 << cards[2].rank) + (0b1 << cards[3].rank) + (0b1 << cards[4].rank);
      cardScore = doubleRank + highScore2;
      break;
    case HandType.HighCards:
      // 12 bits
      cardScore = cards.reduce((acc, curr) => {
        return acc + (0b1 << curr.rank);
      }, 0);
      break;
    default:
      cardScore = 0;
      break;
  }

  return typeScroe + cardScore;
}
