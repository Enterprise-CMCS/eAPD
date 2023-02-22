import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ApdPreviousActivityTableHI from './ApdPreviousActivityTable';
import ApdPreviousActivityTableMMIS from './ApdPreviousActivityTableMMIS';
import ApdPreviousActivityTableTotal from './ApdPreviousActivityTableTotal';

import {
  selectPreviousActivitySummary,
  selectApdType
} from '../../../redux/selectors/apd.selectors';

const PreviousActivities = ({ previousActivitySummary, apdType }) => {
  /* eslint-disable react/no-danger */
  return (
    <div>
      <h2>Results of Previous Activities</h2>
      <h3>Prior Activities Overview</h3>
      <div dangerouslySetInnerHTML={{ __html: previousActivitySummary }} />
      <hr className="subsection-rule" />
      <h3>Actual Expenditures</h3>
      {apdType === 'HITECH' && <ApdPreviousActivityTableHI isViewOnly />}
      <ApdPreviousActivityTableMMIS isViewOnly />
      <ApdPreviousActivityTableTotal />
    </div>
  );
};

PreviousActivities.propTypes = {
  previousActivitySummary: PropTypes.string.isRequired,
  apdType: PropTypes.string
};

const mapStateToProps = state => ({
  previousActivitySummary: selectPreviousActivitySummary(state),
  apdType: selectApdType(state)
});

export default connect(mapStateToProps)(PreviousActivities);
