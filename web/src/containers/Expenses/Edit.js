import PropTypes from 'prop-types';
import React from 'react';
import { Box, Heading } from 'rebass';

import NavButton from '../../components/PageNavButtons';
import { ExpenseCategory } from '../../components/Form/Expenses';

const Edit = ({ goTo, next }) => (
  <Box>
    <Heading mb={3}>
      Equipment and supplies for <em>Administration</em>
    </Heading>
    <ExpenseCategory />
    <NavButton goTo={goTo} next={next} />
  </Box>
);
Edit.propTypes = {
  goTo: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired
};

export default Edit;
