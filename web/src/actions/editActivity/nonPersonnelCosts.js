import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';
import { updateBudget } from '../budget';

export const addNonPersonnelCost = activityIndex => (dispatch, getState) => {
  dispatch({
    type: ADD_APD_ITEM,
    path: `/activities/${activityIndex}/expenses/-`,
    state: getState()
  });
  dispatch(updateBudget());
};

export const removeNonPersonnelCost = (
  activityIndex,
  costIndex,
  { global = window } = {}
) => dispatch => {
  if (global.confirm('Do you really want to delete this personnel entry?')) {
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/expenses/${costIndex}`
    });
    dispatch(updateBudget());
  }
};

export const setNonPersonnelCostCategory = (
  activityIndex,
  costIndex,
  category
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/expenses/${costIndex}/category`,
  value: category
});

export const setNonPersonnelCostDescription = (
  activityIndex,
  costIndex,
  description
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/expenses/${costIndex}/description`,
  value: description
});

export const setNonPersonnelCostForYear = (
  activityIndex,
  costIndex,
  year,
  cost
) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/expenses/${costIndex}/years/${year}`,
    value: cost
  });
  dispatch(updateBudget());
};
