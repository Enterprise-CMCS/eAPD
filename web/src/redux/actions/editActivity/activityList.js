import { generateKey } from '@cms-eapd/common';
import {
  ADD_APD_ITEM,
  APD_ACTIVITIES_CHANGE,
  EDIT_APD,
  REMOVE_APD_ITEM
} from '../editApd';

/**
 * Add a new activity to the current APD
 */

export const addActivity = () => (dispatch, getState) => {
  const key = generateKey();
  dispatch({
    type: ADD_APD_ITEM,
    path: '/activities/-',
    state: getState(),
    key
  });
  dispatch({
    type: APD_ACTIVITIES_CHANGE,
    activities: getState().apd.data.activities
  });
};

/**
 * Remove an activity from the current APD
 * @param {Number} index The index of the activity to be removed
 */
export const removeActivity = index => (dispatch, getState) => {
  dispatch({ type: REMOVE_APD_ITEM, path: `/activities/${index}` });
  dispatch({
    type: APD_ACTIVITIES_CHANGE,
    activities: getState().apd.data.activities
  });
};

/**
 * Rename an activity
 * @param {Number} index The index of the activity to rename
 * @param {String} name The new activity name
 */
export const setActivityName = (index, name) => (dispatch, getState) => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${index}/name`,
    value: name
  });
  dispatch({
    type: APD_ACTIVITIES_CHANGE,
    activities: getState().apd.data.activities,
    url: `/apd/activity/${index}/overview`
  });
};

/**
 * Change an activity's Medicaid program funding source
 * @param {Number} index The index of the activity to change
 * @param {String} source The funding source to switch to - 'HIE', 'HIT', or 'MMIS'
 */
export const setActivityFundingSource = (index, source) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${index}/fundingSource`,
    value: source
  });
};
