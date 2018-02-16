import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box } from 'rebass';
import { bindActionCreators } from 'redux';

import FormLogger from '../util/formLogger';

import ExpensesList from '../components/FormExpensesList';

class ActivityExpensesList extends Component {
  showResults = () => {};

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <FormLogger />
        <ExpensesList
          goTo={goTo}
          next="/activities-list"
          prev="/expenses-start"
        />
      </Box>
    );
  }
}

ActivityExpensesList.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(ActivityExpensesList);
