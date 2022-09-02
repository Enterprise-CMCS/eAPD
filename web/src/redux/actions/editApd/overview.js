import {
  ADD_APD_YEAR,
  EDIT_APD,
  EDIT_APD_NAME,
  REMOVE_APD_YEAR
} from './symbols';
import { updateBudget } from '../budget';

/**
 * Rename an apd
 * @param {String} name The new apd name
 */
export const setApdName = name => (dispatch, getState) => {
  dispatch({
    type: EDIT_APD,
    path: `/name`,
    value: name,
    state: getState()
  });
  dispatch({
    type: EDIT_APD_NAME,
    id: getState().apd.data.id,
    name
  });
};

/**
 * Add a fiscal year to the APD
 * @param {String} year Year to add, four-digit
 */
export const addYear = year => (dispatch, getState) => {
  dispatch({ type: ADD_APD_YEAR, value: year, state: getState() });
  dispatch(updateBudget());
};

/**
 * Remove a fiscal year from the APD
 * @param {String} year Year to add, four-digit
 */
export const removeYear = year => (dispatch, getState) => {
  dispatch({ type: REMOVE_APD_YEAR, value: year, state: getState() });
  dispatch(updateBudget());
};

/**
 * Set the APD's HIE narrative
 * @param {String} text New HIE narrative text
 */
export const setNarrativeForHIE = text => ({
  type: EDIT_APD,
  path: '/apdOverview/narrativeHIE',
  value: text
});

/**
 * Set the APD's HIT narrative
 * @param {String} text New HIT narrative text
 */
export const setNarrativeForHIT = text => ({
  type: EDIT_APD,
  path: '/apdOverview/narrativeHIT',
  value: text
});

/**
 * Set the APD's MMIS narrative
 * @param {String} text New MMIS narrative text
 */
export const setNarrativeForMMIS = text => ({
  type: EDIT_APD,
  path: '/apdOverview/narrativeMMIS',
  value: text
});

/**
 * Set the program overview for the APD
 * @param {String} text New program overview
 */
export const setProgramOverview = text => ({
  type: EDIT_APD,
  path: '/apdOverview/programOverview',
  value: text
});
