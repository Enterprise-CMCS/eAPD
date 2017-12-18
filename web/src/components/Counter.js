import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ total, onIncrement, onDecrement }) => (
  <div style={{ fontFamily: 'monospace' }}>
    <h1>Clicks: {total}</h1>
    <button type="button" onClick={onDecrement}>
      -
    </button>
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
