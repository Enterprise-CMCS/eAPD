import { EDIT_APD } from '../editApd';
import { updateBudget } from '../budget';

export const setCostAllocationMethodology = (index, methodology) => ({
  type: EDIT_APD,
  path: `/activities/${index}/costAllocationNarrative/methodology`,
  value: methodology
});

export const setCostAllocationOtherFunding = (index, year, otherFunding) => ({
  type: EDIT_APD,
  path: `/activities/${index}/costAllocationNarrative/years/${year}/otherSources`,
  value: otherFunding
});

export const setCostAllocationFFPFundingSplit =
  (index, year, federal, state) => dispatch => {
    dispatch({
      type: EDIT_APD,
      path: `/activities/${index}/costAllocation/${year}/ffp/federal`,
      value: federal
    });
    dispatch({
      type: EDIT_APD,
      path: `/activities/${index}/costAllocation/${year}/ffp/state`,
      value: state
    });
    dispatch(updateBudget());
  };

export const setCostAllocationFFPOtherFunding =
  (index, year, otherFunding) => dispatch => {
    dispatch({
      type: EDIT_APD,
      path: `/activities/${index}/costAllocation/${year}/other`,
      value: otherFunding
    });
    dispatch(updateBudget());
  };

export const setFFPForInHouseCostsForFiscalQuarter =
  (activityIndex, year, quarter, ffpPercent) => dispatch => {
    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/quarterlyFFP/${year}/${quarter}/inHouse`,
      value: ffpPercent
    });
    dispatch(updateBudget());
  };

export const setFFPForContractorCostsForFiscalQuarter =
  (activityIndex, year, quarter, ffpPercent) => dispatch => {
    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/quarterlyFFP/${year}/${quarter}/contractors`,
      value: ffpPercent
    });
    dispatch(updateBudget());
  };
