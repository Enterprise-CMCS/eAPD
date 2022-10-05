import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

/**
 * Adds or updates a contractor resource from an activity
 * @param {Number} activityIndex Index of the activity the contractor is part of
 * @param {Number} contractorIndex Index of the contractor
 * @param {Object} data payload of the contractor to be saved
 */
export const saveContractor =
  (activityIndex, contractorIndex, data) => (dispatch, getState) => {
    const previousState = getState();

    let indexCalculated = contractorIndex;

    if (
      previousState.apd.data.activities[activityIndex].contractorResources[
        contractorIndex
      ] === undefined
    ) {
      indexCalculated =
        previousState.apd.data.activities[activityIndex].contractorResources
          .length;
      dispatch({
        type: ADD_APD_ITEM,
        path: `/activities/${activityIndex}/contractorResources/-`,
        state: getState()
      });
    }

    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/contractorResources/${indexCalculated}`,
      value: data
    });
  };

/**
 * Remove a contractor resource from an activity
 * @param {Number} activityIndex Index of the activity to remove the contractor from
 * @param {Number} contractorIndex Index of the contractor to remove
 */
export const removeContractor =
  (activityIndex, contractorIndex) => dispatch => {
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/contractorResources/${contractorIndex}`
    });
  };
