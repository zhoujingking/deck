export const CardSuit = {
  Spade: 'Spade',
  Heart: 'Heart',
  Diamond: 'Diamond',
  Club: 'Club'
}

export const CardRank = {
  'Two': 2,
  'Three': 3,
  'Four': 4,
  'Five': 5,
  'Six': 6,
  'Seven': 7,
  'Eight': 8,
  'Nine': 9,
  'Ten': 10,
  'Jack': 11,
  'Queen': 12,
  'King': 13,
  'Ace': 14
}

export default class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}