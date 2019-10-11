import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';
import { updateBudget } from '../budget';

export const addPersonnel = activityIndex => (dispatch, getState) => {
  dispatch({
    type: ADD_APD_ITEM,
    path: `/activities/${activityIndex}/statePersonnel/-`,
    state: getState()
  });
  dispatch(updateBudget());
};

export const removePersonnel = (
  activityIndex,
  personnelIndex,
  { global = window } = {}
) => dispatch => {
  if (global.confirm('Do you really want to delete this personnel entry?')) {
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/statePersonnel/${personnelIndex}`
    });
    dispatch(updateBudget());
  }
};

export const setPersonnelTitle = (activityIndex, personnelIndex, title) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/statePersonnel/${personnelIndex}/title`,
  value: title
});

export const setPersonnelDescription = (
  activityIndex,
  personnelIndex,
  description
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/statePersonnel/${personnelIndex}/description`,
  value: description
});

export const setPersonnelCostForYear = (
  activityIndex,
  personnelIndex,
  year,
  cost
) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/statePersonnel/${personnelIndex}/years/${year}/amt`,
    value: cost
  });
  dispatch(updateBudget());
};

export const setPersonnelFTEForYear = (
  activityIndex,
  personnelIndex,
  year,
  fte
) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/statePersonnel/${personnelIndex}/years/${year}/perc`,
    value: fte
  });
  dispatch(updateBudget());
};
