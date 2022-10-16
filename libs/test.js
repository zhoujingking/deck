import shuffle from './shuffle.js'
import Card, {CardRank, CardSuit} from './Card.js';
import { preProcess } from './TexasHoldem.js';


const arr = [
  new Card(CardSuit.Heart, CardRank.Four), 
  new Card(CardSuit.Heart, CardRank.Five),
  new Card(CardSuit.Heart, CardRank.Three),
  new Card(CardSuit.Heart, CardRank.Two),
  new Card(CardSuit.Club, CardRank.Ace),
  new Card(CardSuit.Heart, CardRank.Seven),
  new Card(CardSuit.Spade, CardRank.Six),
];

// const result = shuffle(arr);

const result = preProcess(arr)