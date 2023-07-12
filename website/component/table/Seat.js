import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

function Seat(props) {
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