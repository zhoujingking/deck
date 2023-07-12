import React from 'react';
import PropTypes from 'prop-types';

const colorMap = {
  SPADE: 'black',
  HEART: 'red',
  DIAMOND: 'red',
  CLUB: 'black'
};

const getRankString = (rank) => {
  if (rank === 11) {
    return 'J';
  }
  if (rank === 12) {
    return 'Q';
  }
  if (rank === 13) {
    return 'K';
  }
  if (rank === 14) {
    return 'A';
  }
  return rank.toString();
}

function Card({suit, rank}) {
  
  return (
    <div className="card">
      <div style={{color: colorMap[suit]}}>{suit}</div>
      <div style={{color: colorMap[suit]}}>{getRankString(rank)}</div>
    </div>
  );
}
Card.defaultProps={};
Card.propTypes={
  suit: PropTypes.oneOf(['SPADE', 'HEART', 'DIAMOND', 'CLUB']),
  rank: PropTypes.oneOf([2,3,4,5,6,7,8,9,10,11,12,13,14])
};
export default Card;