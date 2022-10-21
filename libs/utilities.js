import { CardRank } from './Card.js';

export function getCountMapByRank(cardList) {
  const countMap = {}; // key: rank, value: list of cards
  cardList.forEach(card => {
    countMap[card.rank] = countMap[card.rank] || [];
    countMap[card.rank].push(card);
  });
  return countMap;
}

// utitlity function, used to test possible straight cards
// input: cardList, output possible straight cards. eg [[A2345], [23456]] in ascending order
export function getPossibleStraightCards(cardList) {
  const MAX_STRAIGTH_CARD_COUNT = 5;
  const possibleStraight = [];
  const countMap = getCountMapByRank(cardList);
  const ranks = Object.keys(countMap).map(rank => Number(rank)).sort((a, b) => a - b);
  if (ranks.length < MAX_STRAIGTH_CARD_COUNT) {
    return [];
  }
  
  const numOfCards = cardList.length;
  for (let index = MAX_STRAIGTH_CARD_COUNT - 1; index < numOfCards; index++) {
    const endIndex = index;
    const startIndex = endIndex - (MAX_STRAIGTH_CARD_COUNT - 1);
    if (ranks[endIndex] - ranks[startIndex] === MAX_STRAIGTH_CARD_COUNT - 1) {
      possibleStraight.push(ranks.slice(startIndex, endIndex + 1).map(rank => countMap[rank][0])) // pick first one here
    }
  }
  // handle special case: A2345 - the smallest one, so put it at the beginning
  if (ranks.length >= MAX_STRAIGTH_CARD_COUNT && ranks[ranks.length - 1] === CardRank.Ace) {
    if (ranks[0] === CardRank.Two && ranks[MAX_STRAIGTH_CARD_COUNT - 2] - ranks[0] === MAX_STRAIGTH_CARD_COUNT - 2) {
      possibleStraight.unshift([
        countMap[CardRank.Ace][0], 
        countMap[CardRank.Two][0],
        countMap[CardRank.Three][0],
        countMap[CardRank.Four][0],
        countMap[CardRank.Five][0]
      ])
    }
  }
  return possibleStraight;
}

// get the highest straight
export function getStraightCards(cardList) {
  const possibleStraightArr = getPossibleStraightCards(cardList);
  if (possibleStraightArr.length) {
    return possibleStraightArr[possibleStraightArr.length - 1];
  }
  return [];
}

export function getCountMapBySuit(cardList) {
  const countMap = {};
  cardList.forEach(card => {
    countMap[card.suit] = countMap[card.suit] || [];
    countMap[card.suit].push(card);
  });
  return countMap;
}

// input: cardList, output cards width the same suit (length >= 5)
export function getPossibleFlushCards(cardList) {
  const suitCountMap = getCountMapBySuit(cardList);
  const suit = Object.keys(suitCountMap).find(suit => suitCountMap[suit].length >= 5);
  if (suit) {
    return suitCountMap[suit];
  }
  return [];
}


