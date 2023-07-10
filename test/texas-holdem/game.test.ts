import Dealer from '../../src/texas-holdem/Dealer';
import Player from '../../src/core/Player';
import Table from '../../src/texas-holdem/Table';
import Deck from '../../src/texas-holdem/Deck';

test('Texas holdem game mimic', () => {
  const dealer = new Dealer('Kate');
  // create table
  const table = new Table(6);

  const playerJack = new Player('Jack');
  const playerSawyer = new Player('Sawyer');
  const playerDamon = new Player('Damon');

  table.addPlayer(playerJack);
  table.addPlayer(playerSawyer);
  table.addPlayer(playerDamon);

  const deck = new Deck();

  // dealer shuffles deck cards

  // dealer picks one card from deck

  // dealer sends the card to player ....
});