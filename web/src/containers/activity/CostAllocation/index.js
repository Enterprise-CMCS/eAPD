import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import CostAllocate from './CostAllocate';
import OtherFunding from './OtherFunding';

const CostAllocation = ({ activityIndex }) => (
  <Fragment>
    <CostAllocate activityIndex={activityIndex} />
    <OtherFunding activityIndex={activityIndex} />
  </Fragment>
);

CostAllocation.propTypes = {
  activityIndex: PropTypes.number.isRequired
};

export default CostAllocation;
