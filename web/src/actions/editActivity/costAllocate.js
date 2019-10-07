import {EDIT_APD} from '../editApd';

export const setCostAllocationMethodology = (index, methodology) => ({
  type: EDIT_APD,
  path: `/activities/${index}/costAllocationDesc`,
  value: methodology
});

export const setCostAllocationOtherFunding = (index, otherFunding) => ({
    type: EDIT_APD,
    path: `/activities/${index}/otherFundingDesc`,
    value: otherFunding
});