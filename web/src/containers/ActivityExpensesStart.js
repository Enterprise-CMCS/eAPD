import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box } from 'rebass';
import { bindActionCreators } from 'redux';

import FormLogger from '../util/formLogger';

import ExpensesStart from '../components/FormExpensesStart';

class ActivityExpensesStart extends Component {
  showResults = () => {};

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <FormLogger />
        <ExpensesStart goTo={goTo} next="/expenses-list" prev="/apd-overview" />
      </Box>
    );
  }
}

ActivityExpensesStart.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(ActivityExpensesStart);
