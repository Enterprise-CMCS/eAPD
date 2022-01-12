import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

export const saveOutcome = (activityIndex, outcomeIndex, data) => (dispatch, getState) => {
  const previousState = getState();
  
  let indexCalculated = outcomeIndex;
  
  console.log("stuff", {activityIndex, outcomeIndex, data});
  
  if(previousState.apd.data.activities[activityIndex].outcomes[outcomeIndex] === undefined) {
    indexCalculated = previousState.apd.data.activities[activityIndex].outcomes.length;
    dispatch({
      type: ADD_APD_ITEM,
      path: `/activities/${activityIndex}/outcomes/-`,
      state: getState()
    });
  }
  
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/outcomes/${outcomeIndex}`,
    value: data
  });
}

export const addOutcomeMetric = (activityIndex, omIndex) => (
  dispatch,
  getState
) =>
  dispatch({
    type: ADD_APD_ITEM,
    path: `/activities/${activityIndex}/outcomes/${omIndex}/metrics/-`,
    state: getState()
  });

export const removeOutcome = (activityIndex, omIndex) => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/activities/${activityIndex}/outcomes/${omIndex}`
  });
};

export const removeOutcomeMetric = (
  activityIndex,
  omIndex,
  metricIndex
) => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/activities/${activityIndex}/outcomes/${omIndex}/metrics/${metricIndex}`
  });
};

export const setOutcome = (activityIndex, omIndex, outcome) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/outcomes/${omIndex}/outcome`,
  value: outcome
});

export const setOutcomeMetric = (
  activityIndex,
  omIndex,
  metricIndex,
  metric
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/outcomes/${omIndex}/metrics/${metricIndex}/metric`,
  value: metric
});
