import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link as RRLink } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Absolute, Box, Border, Heading, Link, Relative, Text } from 'rebass';
import { bindActionCreators } from 'redux';

import PageNavButtons from '../components/PageNavButtons';

const expenses = [
  ['Hardware, Software, and Licensing', 'Edit', '#!'],
  ['State Travel', 'Edit', '#!'],
  ['Training and Outreach', 'Start', '#!'],
  [
    'Equipment and Supplies',
    'Start',
    '/expenses-details/equipment-and-supplies'
  ]
];

const ActivityExpensesList = ({ goTo }) => (
  <Box py={4}>
    <Heading mb={3}>Expenses</Heading>
    <Box mb={5}>
      {expenses.map(([name, status, href]) => (
        <Border key={name} py={2} bottom>
          <Relative>
            <Absolute right>
              {href === '#!' ? (
                <Text color="gray">{status}</Text>
              ) : (
                <Link to={href} is={RRLink}>
                  {status}
                </Link>
              )}
            </Absolute>
            {name}
          </Relative>
        </Border>
      ))}
    </Box>
    <PageNavButtons goTo={goTo} prev="/expenses-start" />
  </Box>
);

ActivityExpensesList.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(ActivityExpensesList);
