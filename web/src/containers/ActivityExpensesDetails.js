import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import FormExpensesDetails from '../components/FormExpensesDetails';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

const ActivityExpensesDetails = ({ goTo }) => (
  <div>
    <FormLogger />
    <h1>
      Equipment and supplies for <em>Administration</em>
    </h1>
    <FormExpensesDetails />
    <PageNavButtons
      goTo={goTo}
      prev="/expenses-list"
      next="/review-and-submit"
    />
  </div>
);

ActivityExpensesDetails.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(
  withSidebar(ActivityExpensesDetails)
);
