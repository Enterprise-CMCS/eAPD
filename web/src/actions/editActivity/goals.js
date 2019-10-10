import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';

export const addGoal = activityIndex => (dispatch, getState) =>
  dispatch({
    type: ADD_APD_ITEM,
    path: `/activities/${activityIndex}/goals/-`,
    state: getState()
  });

export const removeGoal = (
  activityIndex,
  goalIndex,
  { global = window } = {}
) => dispatch => {
  if (global.confirm('Do you really want to delete this goal?')) {
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/goals/${goalIndex}`
    });
  }
};

export const setGoalDescription = (activityIndex, goalIndex, description) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/goals/${goalIndex}/description`,
  value: description
});

export const setGoalObjective = (activityIndex, goalIndex, objective) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/goals/${goalIndex}/objective`,
  value: objective
});
