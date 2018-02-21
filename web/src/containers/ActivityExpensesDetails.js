import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Heading } from 'rebass';
import { bindActionCreators } from 'redux';

import FormExpensesDetails from '../components/FormExpensesDetails';
import PageNavButtons from '../components/PageNavButtons';
import FormLogger from '../util/formLogger';

const ActivityExpensesDetails = ({ goTo }) => (
  <Box py={4}>
    <FormLogger />
    <Heading mb={3}>
      Equipment and supplies for <em>Administration</em>
    </Heading>
    <FormExpensesDetails />
    <PageNavButtons
      goTo={goTo}
      prev="/expenses-list"
      next="/review-and-submit"
    />
  </Box>
);

ActivityExpensesDetails.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(ActivityExpensesDetails);
