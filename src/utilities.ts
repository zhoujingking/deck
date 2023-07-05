import { Card, Rank, Shape } from './Card';

const HAND_LENTH = 5;

type CountMap = {
  [s: string]: Card[]
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
export function getCardShape(cardList: Card[]): [Shape, Card[]] {
  /**
   * 
   * @param sortedCardList in reverse order
   * @returns straight cards
   */
  // function getStraight(sortedCardList: Card[]): Card[] | null {
  //   if (sortedCardList.length < 5) {
  //     return null;
  //   }
  //   for (let index = 0; index < sortedCardList.length; ++index) {
  //     if (sortedCardList[index].rank - sortedCardList[index + HAND_LENTH - 1].rank === HAND_LENTH -1) {
  //       return sortedCardList.slice(0, HAND_LENTH);
  //     }
  //   }
  //   // special case A2345
  //   if ()
  // }


  // check Royal Flush & Straight Flush
  const suitCountMap = getCountMapBySuit(cardList);
  const target = Object.entries(suitCountMap).find(([suit, cards]) => cards.length >= 5);
  let possibleShape = Shape.HighCards;
  if (target) {
    // possible royal flush here
    const [suit, cards] = target;
    // sort these cards in reverse order
    const cardsInReverseOrder = cards.sort((a, b) => a.rank > b.rank ? -1 : 0);
    if (cardsInReverseOrder[HAND_LENTH - 1].rank === Rank.Ten) {
      return [Shape.RoyalFlush, cardsInReverseOrder.slice(0, HAND_LENTH)];
    }
    // check straigh flush
    for (let index = 0; index < cardsInReverseOrder.length - HAND_LENTH + 1; ++index) {
      if (cardsInReverseOrder[index].rank - cardsInReverseOrder[index + HAND_LENTH - 1].rank === HAND_LENTH -1) {
        return [Shape.StraightFlush, cardsInReverseOrder.slice(index, index + HAND_LENTH)];
      }
    }
    // special case A2345
    if (cardsInReverseOrder[0].rank === Rank.Ace && cardsInReverseOrder[cardsInReverseOrder.length - HAND_LENTH + 1].rank === 5) {
      return [Shape.StraightFlush, [cardsInReverseOrder[0], ...cardsInReverseOrder.slice(cardsInReverseOrder.length - HAND_LENTH + 1, cardsInReverseOrder.length)]];
    }
  }
  return [Shape.HighCards, []];
}