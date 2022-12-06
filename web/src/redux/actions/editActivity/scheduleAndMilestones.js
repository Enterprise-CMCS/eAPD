import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

/**
 * Adds or updates a milestone resource from an activity
 * @param {Number} activityIndex Index of the activity the milestone is part of
 * @param {Number} milestoneIndex Index of the milestone
 * @param {Object} data payload of the milestone to be saved
 */
export const saveMilestone =
  (activityIndex, milestoneIndex, data) => (dispatch, getState) => {
    const previousState = getState();

    let indexCalculated = milestoneIndex;

    if (
      previousState.apd.data.activities[activityIndex].milestones[
        milestoneIndex
      ] === undefined
    ) {
      indexCalculated =
        previousState.apd.data.activities[activityIndex].milestones.length;
      dispatch({
        type: ADD_APD_ITEM,
        path: `/activities/${activityIndex}/milestones/-`,
        state: getState()
      });
    }

    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/milestones/${indexCalculated}`,
      value: data
    });
  };

/**
 * Remove a milestone resource from an activity
 * @param {Number} activityIndex Index of the activity to remove the milestone from
 * @param {Number} milestoneIndex Index of the milestone to remove
 */
export const removeMilestone = (activityIndex, milestoneIndex) => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/activities/${activityIndex}/milestones/${milestoneIndex}`
  });
};

export const setActivityStartDate = (activityIndex, date) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/activitySchedule/plannedStartDate`,
  value: date
});

export const setActivityEndDate = (activityIndex, date) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/activitySchedule/plannedEndDate`,
  value: date
});
