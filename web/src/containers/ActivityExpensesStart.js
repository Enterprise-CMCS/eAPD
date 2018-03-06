import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import FormExpensesStart from '../components/FormExpensesStart';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

const ActivityExpensesStart = ({ goTo }) => (
  <div>
    <FormLogger />
    <h1>Let’s take a look at your other expenses</h1>
    <FormExpensesStart />
    <PageNavButtons goTo={goTo} prev="/state-personnel" next="/expenses-list" />
  </div>
);

ActivityExpensesStart.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ goTo: (path) => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(
  withSidebar(ActivityExpensesStart)
);
