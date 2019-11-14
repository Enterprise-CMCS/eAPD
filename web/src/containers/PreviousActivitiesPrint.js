import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ApdPreviousActivityTableHI from './ApdPreviousActivityTable';
import ApdPreviousActivityTableMMIS from './ApdPreviousActivityTableMMIS';
import ApdPreviousActivityTableTotal from './ApdPreviousActivityTableTotal';

import { selectPreviousActivitySummary } from '../reducers/apd.selectors';

const PreviousActivities = ({ previousActivitySummary }) => {
  return (
    <div>
      <h2>Results of Previous Activities</h2>
      <div dangerouslySetInnerHTML={{__html: previousActivitySummary}} />
      <h3>Actual Costs of Previous Activities</h3>
      <ApdPreviousActivityTableHI isViewOnly/>
      <ApdPreviousActivityTableMMIS isViewOnly />
      <ApdPreviousActivityTableTotal isViewOnly />
    </div>
  )
};

PreviousActivities.propTypes = {
  previousActivitySummary: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  previousActivitySummary: selectPreviousActivitySummary(state)
});

export default connect(
  mapStateToProps
)(PreviousActivities);