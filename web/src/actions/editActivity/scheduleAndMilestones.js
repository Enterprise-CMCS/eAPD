import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

export const addMilestone = activityIndex => (dispatch, getState) => {
  dispatch({
    type: ADD_APD_ITEM,
    path: `/activities/${activityIndex}/schedule/-`,
    state: getState()
  });
};

export const removeMilestone = (activityIndex, milestoneIndex) => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/activities/${activityIndex}/schedule/${milestoneIndex}`
  });
};

export const setActivityStartDate = (activityIndex, date) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/plannedStartDate`,
  value: date
});

export const setActivityEndDate = (activityIndex, date) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/plannedEndDate`,
  value: date
});

export const setMilestoneName = (activityIndex, milestoneIndex, name) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/schedule/${milestoneIndex}/milestone`,
  value: name
});

export const setMilestoneEndDate = (activityIndex, milestoneIndex, date) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/schedule/${milestoneIndex}/endDate`,
  value: date
});
