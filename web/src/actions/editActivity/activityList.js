import {
  ADD_APD_ITEM,
  APD_ACTIVITIES_CHANGE,
  EDIT_APD,
  REMOVE_APD_ITEM
} from '../editApd/symbols';
import { updateBudget } from '../budget';

// extract activites from state, safely
const getActivites = (getState) =>
  (((getState() || {}).apd || {}).data || {}).activities || [];

/**
 * Add a new activity to the current APD
 */
export const addActivity = () => (dispatch, getState) => {
  dispatch({
    type: ADD_APD_ITEM,
    path: '/activities/-',
    state: getState()
  });
  dispatch({
    type: APD_ACTIVITIES_CHANGE,
    activities: getActivites(getState)
  });
  dispatch(updateBudget());
};

/**
 * Remove an activity from the current APD
 * @param {Number} index The index of the activity to be removed
 * @param {Object} di Dependency injection object
 * @param {Object} di.global The window object, which provides window.confirm
 */
export const removeActivity = (index, { global = window } = {}) => (
  dispatch,
  getState
) => {
  if (global.confirm('Do you really want to delete this activity?')) {
    dispatch({ type: REMOVE_APD_ITEM, path: `/activities/${index}` });
    dispatch({
      type: APD_ACTIVITIES_CHANGE,
      activities: getActivites(getState)
    });
    dispatch(updateBudget());
  }
};

/**
 * Rename an activity
 * @param {Number} index The index of the activity to rename
 * @param {String} name The new activity name
 */
export const setActivityName = (index, name) => ({
  type: EDIT_APD,
  path: `/activities/${index}/name`,
  value: name
});

/**
 * Change an activity's Medicaid program funding source
 * @param {Number} index The index of the activity to change
 * @param {String} source The funding source to switch to - 'HIE', 'HIT', or 'MMIS'
 */
export const setActivityFundingSource = (index, source) => (dispatch) => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${index}/fundingSource`,
    value: source
  });
  dispatch(updateBudget());
};
