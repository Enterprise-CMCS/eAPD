import PropTypes from 'prop-types';
import React from 'react';
import { Box, Button, Heading } from 'rebass';

const Counter = ({ total, onIncrement, onDecrement }) => (
  <Box py={3}>
    <Heading mb={2}>Clicks: {total}</Heading>
    <Button onClick={onDecrement}>-</Button>{' '}
    <Button onClick={onIncrement}>+</Button>
  </Box>
);

Counter.propTypes = {
  total: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
};

export default Counter;
