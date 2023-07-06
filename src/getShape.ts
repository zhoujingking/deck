import { Card, Rank, Shape } from './Card';

const HAND_LENTH = 5;

type CountMap = {
  [s: string]: Card[]
}

type ShapeResult = {
  shape: Shape,
  cards: Card[]
}

function getCountMapBySuit(cardList: Card[]): CountMap  {
  const countMap = {};
  cardList.forEach(card => {
    countMap[card.suit] = countMap[card.suit] || [];
    countMap[card.suit].push(card);
  });
  return countMap;
}

function getCountMapByRank(cardList: Card[]): CountMap {
  const countMap = {}; // key: rank, value: list of cards
  cardList.forEach(card => {
    countMap[card.rank] = countMap[card.rank] || [];
    countMap[card.rank].push(card);
  });
  return countMap;
}

/**
 * 
 * @param list 
 * @param count, take maximum count 
 * @returns take top {count} elements of sorted array
 */
function sortNumberInReverseOrder<List extends Array<number>>(list: List, count?:number) {
  const sortedList = list.sort((a, b) => b - a);
  if (!count) {
    return sortedList
  }
  return sortedList.slice(0, count);
}

/**
 * 
 * @param list 
 * @param count, take maximum count 
 * @returns take top {count} elements of sorted array
 */
function sortCardInReverseOrder<List extends Array<Card>>(list: List, count?: number) {
  const sortedList = list.sort((a, b) => b.rank - a.rank);
  if (!count) {
    return sortedList
  }
  return sortedList.slice(0, count);
}

function getStraight(cardsInReverseOrder: Card[]): Card[] | null {
  for (let index = 0; index < cardsInReverseOrder.length - HAND_LENTH + 1; ++index) {
    if (cardsInReverseOrder[index].rank - cardsInReverseOrder[index + HAND_LENTH - 1].rank === HAND_LENTH -1) {
      return cardsInReverseOrder.slice(index, index + HAND_LENTH)
    }
  }
  // special case A2345
  if (cardsInReverseOrder[0].rank === Rank.Ace && cardsInReverseOrder[cardsInReverseOrder.length - HAND_LENTH + 1].rank === 5) {
    return [cardsInReverseOrder[0], ...cardsInReverseOrder.slice(cardsInReverseOrder.length - HAND_LENTH + 1, cardsInReverseOrder.length)]
  }
  return null;
}

/**
 * Get shape of cards
 * @param cardList Cards[]
 * @returns ShapeResult
 */
export function getCardShape(cardList: Card[]): ShapeResult {
  // check Royal Flush & Straight Flush
  const suitCountMap = getCountMapBySuit(cardList);
  const flushCards = Object.values(suitCountMap).find((cards) => cards.length >= 5);
  let possibleResult: ShapeResult;
  if (flushCards) {
    // possible royal flush here
    // sort these cards in reverse order
    const cardsInReverseOrder = sortCardInReverseOrder(flushCards);
    if (cardsInReverseOrder[HAND_LENTH - 1].rank === Rank.Ten) {
      return {
        shape: Shape.RoyalFlush,
        cards: cardsInReverseOrder.slice(0, HAND_LENTH)
      };
    }
    // check straight flush
    const straightCards = getStraight(cardsInReverseOrder);
    if (straightCards) {
      return {
        shape: Shape.StraightFlush,
        cards: straightCards
      };
    }
    possibleResult = {
      shape: Shape.Flush,
      cards: cardsInReverseOrder.slice(0, HAND_LENTH)
    };
  }

  const rankCountMap = getCountMapByRank(cardList);
  // check quads
  const quadCards = Object.values(rankCountMap).find((cards) => cards.length === 4);
  if (quadCards) {
    const rank = quadCards[0].rank;
    const otherCards = cardList.filter(card => card.rank !== rank);
    const highestRank = Math.max(...otherCards.map(card => card.rank));
    const card = otherCards.find(c => c.rank === highestRank);
    return {
      shape: Shape.Quads,
      cards: [...quadCards, card]
    }
  }
  // check full house or three of a kind
  const tripleCardList = Object.values(rankCountMap).filter((cards) => cards.length === 3);
  if (tripleCardList.length > 0) {
    // get the highest rank
    const tripleRank = Math.max(...tripleCardList.map((cards) => cards[0].rank));
    const tripleCards = rankCountMap[tripleRank];
    const pairTargetList = Object.values(rankCountMap)
      .filter((cards) => cards[0].rank !== tripleRank && cards.length > 1);
    if (pairTargetList.length > 0) {
      // full house
      const pairRank = Math.max(...pairTargetList.map((cards) => cards[0].rank));
      const pairCards = rankCountMap[pairRank].slice(0, 2);
      return {
        shape: Shape.FullHouse,
        cards: [...tripleCards, ...pairCards]
      }
    }
    const otherCards = sortCardInReverseOrder(cardList.filter(card => card.rank !== tripleRank), 2);
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
    const cardsInReverseOrder = sortCardInReverseOrder(uniqueRankCards);
    const straightCards = getStraight(cardsInReverseOrder);
    if (straightCards) {
      return {
        shape: Shape.Straight,
        cards: straightCards
      }
    }
  }

  // three of a kind
  if (possibleResult?.shape === Shape.ThreeOfAKind) {
    return possibleResult;
  }

  // two pairs
  const pairCardList = Object.values(rankCountMap).filter(cards => cards.length === 2);
  if (pairCardList.length >= 2) {
    // sort by rank in reverse order
    const rankList = sortNumberInReverseOrder(pairCardList.map(cards => cards[0].rank), 2);
    const cards = rankList.reduce((acc, curr) => {
      return [...acc, ...rankCountMap[curr]];
    }, []);

    const otherHighestCards = sortCardInReverseOrder(cardList.filter(card => !rankList.includes(card.rank)), 1);
    return {
      shape: Shape.TwoPairs,
      cards: [...cards, ...otherHighestCards]
    }
  }

  // one pair
  if (pairCardList.length === 1) {
    const pair = pairCardList[0];
    const rank = pair[0].rank;
    const otherHighestCards = sortCardInReverseOrder(cardList.filter(card => rank !== card.rank), 3);
    return {
      shape: Shape.OnePair,
      cards: [...pair, ...otherHighestCards]
    }
  }

  // high cards
  return {
    shape: Shape.HighCards,
    cards: sortCardInReverseOrder(cardList, HAND_LENTH)
  };
}