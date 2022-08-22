import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';
import { updateBudget } from '../budget';

/**
 * Adds or updates a expense resource from an activity
 * @param {Number} activityIndex Index of the activity the expense is part of
 * @param {Number} nonPersonnelIndex Index of the expense
 * @param {Object} data payload of the expense to be saved
 */
export const saveNonPersonnelCost =
  (activityIndex, nonPersonnelIndex, data) => (dispatch, getState) => {
    const previousState = getState();

    let indexCalculated = nonPersonnelIndex;

    if (
      previousState.apd.data.activities[activityIndex].expenses[
        nonPersonnelIndex
      ] === undefined
    ) {
      indexCalculated =
        previousState.apd.data.activities[activityIndex].expenses.length;
      dispatch({
        type: ADD_APD_ITEM,
        path: `/activities/${activityIndex}/expenses/-`,
        state: getState()
      });
    }

    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/expenses/${indexCalculated}`,
      value: data
    });

    dispatch(updateBudget());
  };

/**
 * Remove an expense resource from an activity
 * @param {Number} activityIndex Index of the activity to remove the expense from
 * @param {Number} nonPersonnelIndex Index of the expense to remove
 */
export const removeNonPersonnelCost =
  (activityIndex, nonPersonnelIndex) => dispatch => {
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/expenses/${nonPersonnelIndex}`
    });
    dispatch(updateBudget());
  };
