import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box } from 'rebass';
import { bindActionCreators } from 'redux';

import FormLogger from '../util/formLogger';

import ExpensesStart from '../components/FormExpensesStart';
import ExpensesList from '../components/FormExpensesList';
import ExpenseDetails from '../components/FormExpensesDetails';

class ExpensesLanding extends Component {
  showResults = () => {};

  render() {
    const { goTo } = this.props;
    const root = this.props.match.path;

    return (
      <Box py={4}>
        <FormLogger />
        <Switch>
          <Route
            path={`${root}/list`}
            component={() => (
              <ExpensesList goTo={goTo} next="/apd-overview" prev={root} />
            )}
          />
          <Route
            path={`${root}/edit`}
            component={() => <ExpenseDetails goTo={goTo} next={`${root}/list`} />}
          />
          <Route
            component={() => (
              <ExpensesStart
                goTo={goTo}
                next={`${root}/list`}
                prev="/apd-overview"
              />
            )}
          />
        </Switch>
      </Box>
    );
  }
}

ExpensesLanding.propTypes = {
  goTo: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(ExpensesLanding);
