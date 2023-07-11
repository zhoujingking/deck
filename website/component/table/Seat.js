import React from 'react';
import PropTypes from 'prop-types';
import Player from '../../../lib/core/Player';

function Seat(props) {
  const player = props.player;
  return (
    <div className="seat">
      {
        player ? player.name : 'Empty'
      }
    </div>
  );
}
Seat.defaultProps={};
Seat.propTypes={
  containerStyle: PropTypes.object,
  player: PropTypes.objectOf(Player)
};
export default Seat;