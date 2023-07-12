import Dealer from '../../src/texas-holdem/Dealer';
import Player from '../../src/core/Player';
import Table from '../../src/texas-holdem/Table';
import Deck from '../../src/texas-holdem/Deck';
import { getHoldemHand } from '../../src/texas-holdem/getHoldemHand';

test('Texas holdem game mimic', () => {
  const dealer = new Dealer('Kate');
  // create table
  const table = new Table(6);
  table.addDealer(dealer);

  const playerJack = new Player('Jack');
  const playerSawyer = new Player('Sawyer');
  const playerDamon = new Player('Damon');

  table.addPlayer(playerJack);
  table.addPlayer(playerSawyer);
  table.addPlayer(playerDamon);

  expect(table.players.length).toBe(3);

  const deck = new Deck();
  dealer.setDeck(deck);
  // dealer shuffles deck cards
  dealer.shuffle();
  // dealer deals cards

  // preflop
  dealer.deal();
  // flop
  dealer.deal();
  // turn
  dealer.deal();
  // river
  dealer.deal();

  expect(playerJack.cards.length).toBe(2);
  expect(playerSawyer.cards.length).toBe(2);
  expect(playerDamon.cards.length).toBe(2);

  expect(table.flopCards.length).toBe(3);
  expect(table.turnCard).not.toBeNull();
  expect(table.riverCard).not.toBeNull();

  expect(deck.cards.length).toBe(38);

  console.log(playerJack.cards);
  console.log(playerSawyer.cards);
  console.log(playerDamon.cards);

  const communityCards = [...table.flopCards, table.turnCard, table.riverCard];

  const jackHand = getHoldemHand([...playerJack.cards, ...communityCards]);
  console.log(jackHand)
});