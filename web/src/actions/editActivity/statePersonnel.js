import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';
import { updateBudget } from '../budget';

export const savePersonnel = (activityIndex, personnelIndex, data) => (dispatch, getState) => {
  const previousState = getState();

  let indexCalculated = personnelIndex;

  if(previousState.apd.data.activities[activityIndex].statePersonnel[personnelIndex] === undefined) {
    indexCalculated = previousState.apd.data.activities[activityIndex].statePersonnel.length;
    dispatch({
      type: ADD_APD_ITEM,
      path: `/activities/${activityIndex}/statePersonnel/-`,
      state: getState()
    });
  }
  
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/statePersonnel/${personnelIndex}`,
    value: data
  });
  
  dispatch(updateBudget());
};

export const removePersonnel = (activityIndex, personnelIndex) => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/activities/${activityIndex}/statePersonnel/${personnelIndex}`
  });
  dispatch(updateBudget());
};