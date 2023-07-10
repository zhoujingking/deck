import { Card } from './Card'
import IDeck from './IDeck'
import IPerson from './IPerson'
import Table from '../texas-holdem/Table'

export default interface IDealer extends IPerson {
  setDeck: (deck: IDeck) => void
  pick: () => Card
  shuffle: () => void

  setTable: (tbl: Table) => void
  deal: () => void
}