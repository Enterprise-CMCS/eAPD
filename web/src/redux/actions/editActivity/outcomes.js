import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

/**
 * Adds or updates an outcome resource from an activity
 * @param {Number} activityIndex Index of the activity the outcome is part of
 * @param {Number} outcomeIndex Index of the outcome
 * @param {Object} data payload of the outcome to be saved
 */
export const saveOutcome =
  (activityIndex, outcomeIndex, data) => (dispatch, getState) => {
    const previousState = getState();

    let indexCalculated = outcomeIndex;

    if (
      previousState.apd.data.activities[activityIndex].outcomes[
        outcomeIndex
      ] === undefined
    ) {
      indexCalculated =
        previousState.apd.data.activities[activityIndex].outcomes.length;
      dispatch({
        type: ADD_APD_ITEM,
        path: `/activities/${activityIndex}/outcomes/-`,
        state: getState()
      });
    }

    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/outcomes/${indexCalculated}`,
      value: data
    });
  };

/**
 * Remove an outcome resource from an activity
 * @param {Number} activityIndex Index of the activity to remove the outcome from
 * @param {Number} outcomeIndex Index of the outcome to remove
 */
export const removeOutcome = (activityIndex, outcomeIndex) => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/activities/${activityIndex}/outcomes/${outcomeIndex}`
  });
};
