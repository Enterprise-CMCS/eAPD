import { EDIT_APD } from '../editApd';
import { updateBudget } from '../budget';

export const setCostAllocationMethodology = (index, methodology) => ({
  type: EDIT_APD,
  path: `/activities/${index}/costAllocationNarrative/methodology`,
  value: methodology
});

export const setCostAllocationOtherFunding = (index, otherFunding) => ({
  type: EDIT_APD,
  path: `/activities/${index}/costAllocationNarrative/otherSources`,
  value: otherFunding
});

export const setCostAllocationFFPFundingSplit = (
  index,
  year,
  fundingSource,
  percentage) => ({
  type: EDIT_APD,
  path: `/activities/${index}/costAllocation/${year}/ffp/${fundingSource}`,
  value: percentage
});

export const setCostAllocationFFPOtherFunding = (
  index,
  year,
  otherFunding) => dispatch =>{
    dispatch({
      type: EDIT_APD,
      path: `/activities/${index}/costAllocation/${year}/other`,
      value: otherFunding
    });
    dispatch(updateBudget());
  };