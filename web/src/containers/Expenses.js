import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Switch, Route, Link as RRLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Absolute, Box, Border, Heading, Link, Relative } from 'rebass';
import { bindActionCreators } from 'redux';

import NavButton from '../components/PageNavButtons';
import FormLogger from '../util/formLogger';

import { CommonExpenses, ExpenseCategory } from '../components/Form/expenses';

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

const Fill = ({ goTo, next, prev }) => (
  <Box>
    <Heading mb={3}>Expenses</Heading>
    <Box mb={5}>
      <Border py={2} bottom>
        <Relative>
          <Absolute right>
            <Link to="#!" is={RRLink}>
              Edit
            </Link>
          </Absolute>
          Hardware, Software, and Licensing
        </Relative>
      </Border>

      <Border py={2} bottom>
        <Relative>
          <Absolute right>
            <Link to="#!" is={RRLink}>
              Edit
            </Link>
          </Absolute>
          State Travel
        </Relative>
      </Border>

      <Border py={2} bottom>
        <Relative>
          <Absolute right>
            <Link to="#!" is={RRLink}>
              Start
            </Link>
          </Absolute>
          Training and Outreach
        </Relative>
      </Border>

      <Border py={2} bottom>
        <Relative>
          <Absolute right>
            <Link to="edit/equipment-and-supplies" is={RRLink}>
              Start
            </Link>
          </Absolute>
          Equipment and Supplies
        </Relative>
      </Border>
    </Box>
    <NavButton goTo={goTo} next={next} prev={prev} />
  </Box>
);
Fill.propTypes = {
  goTo: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired,
  prev: PropTypes.string.isRequired
};

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

class Expenses extends Component {
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
              <Fill goTo={goTo} next="/apd-overview" prev={root} />
            )}
          />
          <Route
            path={`${root}/edit`}
            component={() => <Edit goTo={goTo} next={`${root}/list`} />}
          />
          <Route
            component={() => (
              <Common goTo={goTo} next={`${root}/list`} prev="/apd-overview" />
            )}
          />
        </Switch>
      </Box>
    );
  }
}

Expenses.propTypes = {
  goTo: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(Expenses);
