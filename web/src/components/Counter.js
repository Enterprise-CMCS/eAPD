import PropTypes from 'prop-types';
import React from 'react';

const Counter = ({ total, onIncrement, onDecrement }) => (
  <div className="py3">
    <h1>Clicks: {total}</h1>
    <button type="button" onClick={onDecrement}>
      -
    </button>{' '}
    <button type="button" onClick={onIncrement}>
      +
    </button>
  </div>
);

Counter.propTypes = {
  total: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
};

export default Counter;
