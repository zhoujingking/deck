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
  let possibleResult: ShapeResult;
  if (flushTarget) {
    // possible royal flush here
    const [, cards] = flushTarget;
    // sort these cards in reverse order
    const cardsInReverseOrder = cards.sort((a, b) => a.rank > b.rank ? -1 : 1);
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
    possibleResult = {
      shape: Shape.Flush,
      cards: cardsInReverseOrder.slice(0, HAND_LENTH)
    };
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
  // check full house or three of a kind
  const tripleTargetList = Object.entries(rankCountMap).filter(([rank, cards]) => cards.length === 3);
  if (tripleTargetList.length > 0) {
    // get the highest rank
    const tripleRank = Math.max(...tripleTargetList.map(([rank, cards]) => cards[0].rank));
    const tripleCards = rankCountMap[tripleRank];
    const pairTargetList = Object.entries(rankCountMap)
      .filter(([rank, cards]) => rank !== tripleRank.toString() && cards.length > 1);
    if (pairTargetList.length > 0) {
      // full house
      const pairRank = Math.max(...pairTargetList.map(([rank, cards]) => cards[0].rank));
      const pairCards = rankCountMap[pairRank].slice(0, 2);
      return {
        shape: Shape.FullHouse,
        cards: [...tripleCards, ...pairCards]
      }
    }
    const otherCards = cardList.filter(card => card.rank !== tripleRank).sort((a, b) => a.rank > b.rank ? -1 : 1).slice(0, 2);
    // three of a kind
    possibleResult = {
      shape: Shape.ThreeOfAKind,
      cards: [...tripleCards, ...otherCards]
    }
  }

  // flush
  if (possibleResult?.shape === Shape.Flush) {
    return possibleResult;
  }

  // check straight
  if (Object.keys(rankCountMap).length >= 5) {
    // pick one card from each rank
    const uniqueRankCards = Object.values(rankCountMap).map(cards => cards[0]);
    const cardsInReverseOrder = uniqueRankCards.sort((a, b) => a.rank > b.rank ? -1 : 1);
    // check straigh flush
    for (let index = 0; index < cardsInReverseOrder.length - HAND_LENTH + 1; ++index) {
      if (cardsInReverseOrder[index].rank - cardsInReverseOrder[index + HAND_LENTH - 1].rank === HAND_LENTH -1) {
        return {
          shape: Shape.Straight,
          cards: cardsInReverseOrder.slice(index, index + HAND_LENTH)
        }
      }
    }
    // special case A2345
    if (cardsInReverseOrder[0].rank === Rank.Ace && cardsInReverseOrder[cardsInReverseOrder.length - HAND_LENTH + 1].rank === 5) {
      return {
        shape: Shape.Straight,
        cards: [cardsInReverseOrder[0], ...cardsInReverseOrder.slice(cardsInReverseOrder.length - HAND_LENTH + 1, cardsInReverseOrder.length)]
      }
    }
  }

  return {
    shape: Shape.HighCards,
    cards: []
  };
}