import React from 'react';
import PropTypes from 'prop-types';
import Seat from './Seat';

function Table(prop) {
  return (
    <div className="table-container">
      <div className="seat-placement seat1">
        <Seat />
      </div>
      <div className="seat-placement seat2">
        <Seat />
      </div>
      <div className="seat-placement seat3">
        <Seat />
      </div>
      <div className="seat-placement seat4">
        <Seat />
      </div>
      <div className="seat-placement seat5">
        <Seat />
      </div>
      <div className="seat-placement seat6">
        <Seat />
      </div>
      <div className="table">

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