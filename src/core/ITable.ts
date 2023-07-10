import Player from './Player';


export default interface ITable {
  addPlayer(player: Player): void
  removePlayer(player: Player): void
  players: Array<Player>
}