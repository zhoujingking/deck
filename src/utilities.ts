import { Card, Rank, Shape } from './Card';

const HAND_LENTH = 5;

type CountMap = {
  [s: string]: Card[]
}

type ShapeResult = {
  shape: Shape,
  cards: Card[]
}

export function getCountMapBySuit(cardList: Card[]): CountMap  {
  const countMap = {};
  cardList.forEach(card => {
    countMap[card.suit] = countMap[card.suit] || [];
    countMap[card.suit].push(card);
  });
  return countMap;
}

export function getCountMapByRank(cardList: Card[]): CountMap {
  const countMap = {}; // key: rank, value: list of cards
  cardList.forEach(card => {
    countMap[card.rank] = countMap[card.rank] || [];
    countMap[card.rank].push(card);
  });
  return countMap;
}

/**
 * Get shape of cards
 * @param cardList 
 * @returns [Shape, Cards[]]
 */
export function getCardShape(cardList: Card[]): ShapeResult {
  // check Royal Flush & Straight Flush
  const suitCountMap = getCountMapBySuit(cardList);
  const flushTarget = Object.entries(suitCountMap).find(([suit, cards]) => cards.length >= 5);
  let possibleShape = Shape.HighCards;
  if (flushTarget) {
    // possible royal flush here
    const [, cards] = flushTarget;
    // sort these cards in reverse order
    const cardsInReverseOrder = cards.sort((a, b) => a.rank > b.rank ? -1 : 0);
    if (cardsInReverseOrder[HAND_LENTH - 1].rank === Rank.Ten) {
      return {
        shape: Shape.RoyalFlush,
        cards: cardsInReverseOrder.slice(0, HAND_LENTH)
      };
    }
    // check straigh flush
    for (let index = 0; index < cardsInReverseOrder.length - HAND_LENTH + 1; ++index) {
      if (cardsInReverseOrder[index].rank - cardsInReverseOrder[index + HAND_LENTH - 1].rank === HAND_LENTH -1) {
        return {
          shape: Shape.StraightFlush,
          cards: cardsInReverseOrder.slice(index, index + HAND_LENTH)
        }
      }
    }
    // special case A2345
    if (cardsInReverseOrder[0].rank === Rank.Ace && cardsInReverseOrder[cardsInReverseOrder.length - HAND_LENTH + 1].rank === 5) {
      return {
        shape: Shape.StraightFlush,
        cards: [cardsInReverseOrder[0], ...cardsInReverseOrder.slice(cardsInReverseOrder.length - HAND_LENTH + 1, cardsInReverseOrder.length)]
      }
    }
    possibleShape = Shape.Flush;
  }

  const rankCountMap = getCountMapByRank(cardList);
  // check quads
  const quadsTarget = Object.entries(rankCountMap).find(([rank, cards]) => cards.length === 4);
  if (quadsTarget) {
    const [, cards] = quadsTarget;
    const rank = cards[0].rank;
    const otherCards = cardList.filter(card => card.rank !== rank);
    const highestRank = Math.max(...otherCards.map(card => card.rank));
    const card = otherCards.find(c => c.rank === highestRank);
    return {
      shape: Shape.Quads,
      cards: [...cards, card]
    }
  }

  return {
    shape: Shape.HighCards,
    cards: []
  };
}