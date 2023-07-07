import { Card } from '../core/Card'
import HandType from './HandType'

type HoldemHand = {
  type: HandType,
  cards: Card[]
}

export default HoldemHand;