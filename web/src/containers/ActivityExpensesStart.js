import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Heading } from 'rebass';
import { bindActionCreators } from 'redux';

import FormExpensesStart from '../components/FormExpensesStart';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

const ActivityExpensesStart = ({ goTo }) => (
  <Box py={4}>
    <FormLogger />
    <Heading>Let’s take a look at your other expenses</Heading>
    <FormExpensesStart />
    <PageNavButtons goTo={goTo} prev="/state-personnel" next="/expenses-list" />
  </Box>
);

ActivityExpensesStart.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(
  withSidebar(ActivityExpensesStart)
);
