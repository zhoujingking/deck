import { Card } from './Card';

export default interface IDeck {
  /**
   * deck cards
   */
  cards: Array<Card>
  /**
   * get the top card from the deck
   */
  pop: () => Card
  /**
   * the untouched deck
   */
  reset: () => void
  /**
   * shuffule the deck
   */
  shuffle: () => Array<Card>
}