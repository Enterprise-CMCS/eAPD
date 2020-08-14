import React from 'react';

import CostAllocate from './CostAllocate';
import OtherFunding from './OtherFunding';

const CostAllocation = ({ activityIndex }) => (
  <>
    <CostAllocate activityIndex={activityIndex} />
    <OtherFunding activityIndex={activityIndex} />
  </>
);

export default CostAllocation;
