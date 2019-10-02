import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';
import { updateBudget } from '../apd';

export const addContractor = activityIndex => (dispatch, getState) => {
  dispatch({
    type: ADD_APD_ITEM,
    path: `/activities/${activityIndex}/contractorResources/-`,
    state: getState()
  });
  dispatch(updateBudget());
};

export const removeContractor = (
  activityIndex,
  contractorIndex,
  { global = window } = {}
) => dispatch => {
  if (
    global.confirm('Do you really want to delete this contractor resource?')
  ) {
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/contractorResources/${contractorIndex}`
    });
    dispatch(updateBudget());
  }
};

export const setContractorName = (activityIndex, contractorIndex, name) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/name`,
  value: name
});

export const setContractorDescription = (
  activityIndex,
  contractorIndex,
  description
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/desc`,
  value: description
});

export const setContractorEndDate = (activityIndex, contractorIndex, date) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/end`,
  value: date
});

export const setContractorStartDate = (
  activityIndex,
  contractorIndex,
  date
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/start`,
  value: date
});

export const setContractorTotalCost = (
  activityIndex,
  contractorIndex,
  cost
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/totalCost`,
  value: cost
});

export const setContractorCostForYear = (
  activityIndex,
  contractorIndex,
  year,
  cost
) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/years/${year}`,
    value: cost
  });
  dispatch(updateBudget());
};

export const setContractorIsHourly = (
  activityIndex,
  contractorIndex,
  isHourly
) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/hourly/useHourly`,
    value: isHourly
  });
  dispatch(updateBudget());
};

export const setContractorHourlyRateForYear = (
  activityIndex,
  contractorIndex,
  year,
  rate
) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/hourly/data/${year}/rate`,
    value: rate
  });
  dispatch(updateBudget());
};

export const setContractorNumberOfHoursForYear = (
  activityIndex,
  contractorIndex,
  year,
  hours
) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/hourly/data/${year}/hours`,
    value: hours
  });
  dispatch(updateBudget());
};
