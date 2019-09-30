import { ADD_APD_YEAR, EDIT_APD, REMOVE_APD_YEAR } from './symbols';
import { updateBudget } from '../apd';

export const addYear = year => (dispatch, getState) => {
  dispatch({ type: ADD_APD_YEAR, value: year, state: getState() });
  dispatch(updateBudget());
};

export const removeYear = year => (dispatch, getState) => {
  dispatch({ type: REMOVE_APD_YEAR, value: year, state: getState() });
  dispatch(updateBudget());
};

export const setNarrativeForHIE = text => ({
  type: EDIT_APD,
  path: '/narrativeHIE',
  value: text
});

export const setNarrativeForHIT = text => ({
  type: EDIT_APD,
  path: '/narrativeHIT',
  value: text
});

export const setNarrativeForMMIS = text => ({
  type: EDIT_APD,
  path: '/narrativeMMIS',
  value: text
});

export const setProgramOverview = text => ({
  type: EDIT_APD,
  path: '/programOverview',
  value: text
});
