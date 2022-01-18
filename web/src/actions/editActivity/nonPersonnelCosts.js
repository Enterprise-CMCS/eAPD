import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';
import { updateBudget } from '../budget';

export const saveNonPersonnelCost = (activityIndex, nonPersonnelIndex, data) => (dispatch, getState) => {
  const previousState = getState();

  let indexCalculated = nonPersonnelIndex;

  if(previousState.apd.data.activities[activityIndex].expenses[nonPersonnelIndex] === undefined) {
    indexCalculated = previousState.apd.data.activities[activityIndex].expenses.length;
    dispatch({
      type: ADD_APD_ITEM,
      path: `/activities/${activityIndex}/expenses/-`,
      state: getState()
    });
  }
  
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/expenses/${nonPersonnelIndex}`,
    value: data
  });
  
  dispatch(updateBudget());
};

export const removeNonPersonnelCost = (
  activityIndex,
  costIndex
) => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/activities/${activityIndex}/expenses/${costIndex}`
  });
  dispatch(updateBudget());
};