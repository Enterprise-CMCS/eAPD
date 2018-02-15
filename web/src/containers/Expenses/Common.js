import PropTypes from 'prop-types';
import React from 'react';
import { Box, Heading } from 'rebass';

import NavButton from '../../components/PageNavButtons';
import { CommonExpenses } from '../../components/Form/Expenses';

const Common = ({ goTo, next, prev }) => (
  <Box>
    <Heading mb={3}>Let&apos;s take a look at your other expenses</Heading>
    <CommonExpenses />
    <NavButton goTo={goTo} next={next} prev={prev} />
  </Box>
);
Common.propTypes = {
  goTo: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired,
  prev: PropTypes.string.isRequired
};

export default Common;
