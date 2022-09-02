import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';
import { updateBudget } from '../budget';

/**
 * Adds or updates a personnel resource from an activity
 * @param {Number} activityIndex Index of the activity the personnel is part of
 * @param {Number} personnelIndex Index of the personnel
 * @param {Object} data payload of the personnel to be saved
 */
export const savePersonnel =
  (activityIndex, personnelIndex, data) => (dispatch, getState) => {
    const previousState = getState();

    let indexCalculated = personnelIndex;

    if (
      previousState.apd.data.activities[activityIndex].statePersonnel[
        personnelIndex
      ] === undefined
    ) {
      indexCalculated =
        previousState.apd.data.activities[activityIndex].statePersonnel.length;
      dispatch({
        type: ADD_APD_ITEM,
        path: `/activities/${activityIndex}/statePersonnel/-`,
        state: getState()
      });
    }

    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/statePersonnel/${indexCalculated}`,
      value: data
    });

    dispatch(updateBudget());
  };

/**
 * Remove a personnel resource from an activity
 * @param {Number} activityIndex Index of the activity to remove the personnel from
 * @param {Number} personnelIndex Index of the personnel to remove
 */
export const removePersonnel = (activityIndex, personnelIndex) => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/activities/${activityIndex}/statePersonnel/${personnelIndex}`
  });
  dispatch(updateBudget());
};
