import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';

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
  <div>
    <h1>Expenses</h1>
    <div className="mb2">
      {expenses.map(([name, status, href]) => (
        <div key={name} className="py1 relative border-bottom border-silver">
          <div className="absolute right-0">
            {href === '#!' ? (
              <span className="gray">{status}</span>
            ) : (
              <Link to={href}>{status}</Link>
            )}
          </div>
          {name}
        </div>
      ))}
    </div>
    <PageNavButtons goTo={goTo} prev="/expenses-start" />
  </div>
);

ActivityExpensesList.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(
  withSidebar(ActivityExpensesList)
);
