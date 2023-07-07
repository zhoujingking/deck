import Deck from '../../src/texas-holdem/Deck';

test('deck', () => {
  const deck = new Deck();
  expect(deck.cards.length).toBe(52);
})