import { Card, Rank } from '../core/Card';
import HandType from './HandType';
import HoldemHand from './HoldemHand';

const CARD_LENGTH = 5;

type CountMap = {
  [s: string]: Card[]
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
  for (let index = 0; index < cardsInReverseOrder.length - CARD_LENGTH + 1; ++index) {
    if (cardsInReverseOrder[index].rank - cardsInReverseOrder[index + CARD_LENGTH - 1].rank === CARD_LENGTH -1) {
      return cardsInReverseOrder.slice(index, index + CARD_LENGTH)
    }
  }
  // special case A2345
  if (cardsInReverseOrder[0].rank === Rank.Ace && cardsInReverseOrder[cardsInReverseOrder.length - CARD_LENGTH + 1].rank === 5) {
    return [cardsInReverseOrder[0], ...cardsInReverseOrder.slice(cardsInReverseOrder.length - CARD_LENGTH + 1, cardsInReverseOrder.length)]
  }
  return null;
}

/**
 * Get holdem hands from cards
 * @param cardList Cards[]
 * @returns HoldemHand
 */
export function getHoldemHand(cardList: Card[]): HoldemHand {
  // check Royal Flush & Straight Flush
  const suitCountMap = getCountMapBySuit(cardList);
  const flushCards = Object.values(suitCountMap).find((cards) => cards.length >= 5);
  let possibleResult: HoldemHand;
  if (flushCards) {
    // possible royal flush here
    // sort these cards in reverse order
    const cardsInReverseOrder = sortCardInReverseOrder(flushCards);
    if (cardsInReverseOrder[CARD_LENGTH - 1].rank === Rank.Ten) {
      return {
        type: HandType.RoyalFlush,
        cards: cardsInReverseOrder.slice(0, CARD_LENGTH)
      };
    }
    // check straight flush
    const straightCards = getStraight(cardsInReverseOrder);
    if (straightCards) {
      return {
        type: HandType.StraightFlush,
        cards: straightCards
      };
    }
    possibleResult = {
      type: HandType.Flush,
      cards: cardsInReverseOrder.slice(0, CARD_LENGTH)
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
      type: HandType.Quads,
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
        type: HandType.FullHouse,
        cards: [...tripleCards, ...pairCards]
      }
    }
    const otherCards = sortCardInReverseOrder(cardList.filter(card => card.rank !== tripleRank), 2);
    // three of a kind
    possibleResult = {
      type: HandType.ThreeOfAKind,
      cards: [...tripleCards, ...otherCards]
    }
  }

  // flush
  if (possibleResult?.type === HandType.Flush) {
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
        type: HandType.Straight,
        cards: straightCards
      }
    }
  }

  // three of a kind
  if (possibleResult?.type === HandType.ThreeOfAKind) {
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
      type: HandType.TwoPairs,
      cards: [...cards, ...otherHighestCards]
    }
  }

  // one pair
  if (pairCardList.length === 1) {
    const pair = pairCardList[0];
    const rank = pair[0].rank;
    const otherHighestCards = sortCardInReverseOrder(cardList.filter(card => rank !== card.rank), 3);
    return {
      type: HandType.OnePair,
      cards: [...pair, ...otherHighestCards]
    }
  }

  // high cards
  return {
    type: HandType.HighCards,
    cards: sortCardInReverseOrder(cardList, CARD_LENGTH)
  };
}