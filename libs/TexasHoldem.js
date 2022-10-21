import { CardRank } from './Card.js';

// cardList: Array of Card, max seven cards
export function preProcess(cardList) {

  // something more need to check
  
  // counting
  const countMap = getCountMap(cardList);

  // check if it has a straight inside
  // const result = getStraightResult(countMap);
  // return result;
}

export function getCountMap(cardList) {
  const countMap = {}; // key: rank, value: list of cards
  cardList.forEach(card => {
    countMap[card.rank] = countMap[card.rank] || [];
    countMap[card.rank].push(card);
  });
  return countMap;
}

// input cardlist, output possible straight cards. eg [[A2345], [23456]]
export function getPossibleStraightCards(cardList) {
  const MAX_STRAIGTH_CARD_COUNT = 5;
  const possibleStraight = [];
  const countMap = getCountMap(cardList);
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
  // handle special case: A2345
  if (ranks.length >= MAX_STRAIGTH_CARD_COUNT && ranks[ranks.length - 1] === CardRank.Ace) {
    if (ranks[0] === CardRank.Two && ranks[MAX_STRAIGTH_CARD_COUNT - 2] - ranks[0] === MAX_STRAIGTH_CARD_COUNT - 2) {
      possibleStraight.push([
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

