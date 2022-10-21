import Card, { CardRank, CardSuit } from './Card.js';
import { getStraightResult, preProcess } from './TexasHoldem.js';

const cardList = [
  new Card(CardSuit.Heart, CardRank.Two),
  new Card(CardSuit.Heart, CardRank.Three),
  new Card(CardSuit.Spade, CardRank.Four),
  new Card(CardSuit.Heart, CardRank.Five),
  new Card(CardSuit.Heart, CardRank.Six),
  new Card(CardSuit.Heart, CardRank.Ace),
  new Card(CardSuit.Heart, CardRank.Seven),
];
const result = getStraightResult(cardList);
console.log(result)

