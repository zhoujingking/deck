import { Card } from './Card';

export function getCountMapBySuit(cardList: Card[])  {
  const countMap = {};
  cardList.forEach(card => {
    countMap[card.suit] = countMap[card.suit] || [];
    countMap[card.suit].push(card);
  });
  return countMap;
}

export function getCountMapByRank(cardList: Card[]) {
  const countMap = {}; // key: rank, value: list of cards
  cardList.forEach(card => {
    countMap[card.rank] = countMap[card.rank] || [];
    countMap[card.rank].push(card);
  });
  return countMap;
}