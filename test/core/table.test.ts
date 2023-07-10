import Dealer from '../../src/texas-holdem/Dealer';
import Player from '../../src/core/Player';
import Table from '../../src/texas-holdem/Table';

test('table adds palyer successfully', () => {
  const dealer = new Dealer('GodKing');
  const table = new Table();
  table.dealer = dealer;

  expect(table.dealer).toBe(dealer);
  expect(table.availableSeats.length).toBe(8);

  const playerJack = new Player('Jack');
  const playerKate = new Player('Kate');
  const playerSawyer = new Player('Sawyer');
  const playerKing = new Player('King');

  table.addPlayer(playerJack);
  table.addPlayer(playerKate);
  table.addPlayer(playerSawyer);

  expect(table.players.length).toBe(3);
  expect(table.availableSeats).toStrictEqual([3,4,5,6,7]);

  table.removePlayer(playerJack);
  expect(table.players.length).toBe(2);
  expect(table.availableSeats).toStrictEqual([0,3,4,5,6,7]);

  table.addPlayer(playerKing);

  expect(table.players[0]).toBe(playerKing);
  expect(table.availableSeats).toStrictEqual([3,4,5,6,7]);
})
test('table adds too many palyers will throw errors', () => {
  const dealer = new Dealer('GodKing');
  const table = new Table();
  table.dealer = dealer;

  expect(table.dealer).toBe(dealer);
  expect(table.availableSeats.length).toBe(8);

  const playerJack = new Player('Jack');
  const playerKate = new Player('Kate');
  const playerSawyer = new Player('Sawyer');
  const playerKing = new Player('King');
  const player5 = new Player('King5');
  const player6 = new Player('King6');
  const player7 = new Player('King7');
  const player8 = new Player('King8');
  const player9 = new Player('King9');

  table.addPlayer(playerJack);
  table.addPlayer(playerKate);
  table.addPlayer(playerSawyer);
  table.addPlayer(playerKing);
  table.addPlayer(player5);
  table.addPlayer(player6);
  table.addPlayer(player7);
  table.addPlayer(player8);
  expect(() => table.addPlayer(player9)).toThrowError();
})

test('table adds the same palyer twice should throw error', () => {
  const dealer = new Dealer('GodKing');
  const table = new Table();
  table.dealer = dealer;

  const playerJack = new Player('Jack');

  table.addPlayer(playerJack);
  expect(() => table.addPlayer(playerJack)).toThrowError();
})

test('table remove non-existing palyer should throw error', () => {
  const dealer = new Dealer('GodKing');
  const table = new Table();
  table.dealer = dealer;

  const playerJack = new Player('Jack');
  const playerKate = new Player('Kate');

  table.addPlayer(playerJack);
  
  expect(() => table.removePlayer(playerKate)).toThrowError();
})