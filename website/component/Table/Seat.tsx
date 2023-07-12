import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import { Card as PlainCard } from '../../../src/core/Card';

interface SeatProps {
  person: {
    name: string,
    cards?: Array<PlainCard>
  } | null
}

function Seat(props: SeatProps) {
  const person = props.person;
  return (
    <div className="seat">
      {
        person ? person.name : 'Empty'
      }
      {
        person?.cards?.map((card, index) => {
          return (
            <Card key={index} suit={card.suit} rank={card.rank} />
          )
        })
      }
    </div>
  );
}
Seat.defaultProps={};
Seat.propTypes={
  containerStyle: PropTypes.object,
  person: PropTypes.object
};
export default Seat;