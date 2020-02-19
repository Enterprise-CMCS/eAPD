import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';

export const addObjective = activityIndex => (dispatch, getState) =>
  dispatch({
    type: ADD_APD_ITEM,
    path: `/activities/${activityIndex}/objectives/-`,
    state: getState()
  });

export const addObjectiveKeyResult = (activityIndex, okrIndex) => (
  dispatch,
  getState
) =>
  dispatch({
    type: ADD_APD_ITEM,
    path: `/activities/${activityIndex}/objectives/${okrIndex}/keyResults/-`,
    state: getState()
  });

export const removeObjective = (
  activityIndex,
  okrIndex,
  { global = window } = {}
) => dispatch => {
  if (
    global.confirm(
      'Do you really want to delete this objective and key result?'
    )
  ) {
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/objectives/${okrIndex}`
    });
  }
};

export const setObjective = (activityIndex, okrIndex, objective) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/objectives/${okrIndex}/objective`,
  value: objective
});

export const setObjectiveKeyResult = (
  activityIndex,
  okrIndex,
  keyResultIndex,
  keyResult
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/objectives/${okrIndex}/keyResults/${keyResultIndex}/keyResult`,
  value: keyResult
});

export const setObjectiveKeyResultTarget = (
  activityIndex,
  okrIndex,
  keyResultIndex,
  target
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/objectives/${okrIndex}/keyResults/${keyResultIndex}/target`,
  value: target
});

export const setObjectiveKeyResultBaseline = (
  activityIndex,
  okrIndex,
  keyResultIndex,
  baseline
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/objectives/${okrIndex}/keyResults/${keyResultIndex}/baseline`,
  value: baseline
});
