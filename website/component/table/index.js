import React from 'react';
import PropTypes from 'prop-types';
import Seat from './Seat';
import TexasTable from '../../../lib/texas-holdem/Table'
import Player from '../../../lib/core/Player';
import Dealer from '../../../lib/texas-holdem/Dealer';
import { useState } from 'react';
import Deck from '../../../lib/texas-holdem/Deck';
import { v4 } from 'uuid';
import Card from '../Card';

const initTable = (numOfSeats) => {
  const table = new TexasTable(numOfSeats);
  const playerJack = new Player('Jack');
  const playerSawyer = new Player('Sawyer');
  const dealer = new Dealer('Kate');
  const deck = new Deck();
  dealer.setDeck(deck);
  table.addDealer(dealer);

  table.addPlayer(playerJack);
  table.addPlayer(playerSawyer);
  return table;
}

function Table(props) {
  const numOfSeats = props.numOfSeats;
  const [uuid, setUuid] = useState(v4());
  const [table, setTable] = useState(initTable(numOfSeats));

  console.log(table)

  const onShuffle = () => {
    table.dealer.shuffle();
  }

  const onDeal = () => {
    table.dealer.deal();
    setUuid(v4());
  }

  const onNextGame = () => {
    table.dealer.reset();
    setUuid(v4());
  }

  return (
    <div className="table-container">
      {
        table.seats.map((player, index) => {
          const className = `seat-placement seat${index + 1}`;
          return (
            <div key={index} className={className}>
              <Seat person={player} />
            </div>
          )
        })
      }
      <div className="table row">
        {/* community cards */}
        <div className="row community-cards">
          {
            table.flopCards && table.flopCards.map((card, index) => {
              return (
                <Card key={`${card.suit}-${card.rank}-${index}`} suit={card.suit} rank={card.rank} />
              )
            })
          }

          {
            table.turnCard && (
              <Card suit={table.turnCard.suit} rank={table.turnCard.rank} />
            )
          }
          {
            table.riverCard && (
              <Card suit={table.riverCard.suit} rank={table.riverCard.rank} />
            )
          }
        </div>
      </div>
      {
        table.dealer && (
          <div className="row dealer">
            <Seat person={table.dealer} />
          </div>
        )
      }
      <div>
        <button onClick={onShuffle}>shuffle cards</button>
        <button onClick={onDeal}>deal card</button>
        <button onClick={onNextGame}>next game</button>
      </div>
      <div>

      </div>
    </div>
  );
}

Table.defaultProps = {
  numOfSeats: 6
};
Table.propTypes = {
  numOfSeats: PropTypes.number.isRequired
};
export default Table;