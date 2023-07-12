import React from 'react';
import PropTypes from 'prop-types';
import { Rank, Suit } from '../../src/core/Card';

const colorMap = {
  [Suit.Spade]: 'black',
  [Suit.Heart]: 'red',
  [Suit.Diamond]: 'red',
  [Suit.Club]: 'black'
};

const getRankString = (rank: Rank) => {
  if (rank === Rank.Jack) {
    return 'J';
  }
  if (rank === Rank.Queen) {
    return 'Q';
  }
  if (rank === Rank.King) {
    return 'K';
  }
  if (rank === Rank.Ace) {
    return 'A';
  }
  return rank.toString();
}

interface CardProps {
  suit: Suit,
  rank: Rank
}

function Card({suit, rank} : CardProps) {
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