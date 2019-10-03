import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from './symbols';
import { updateBudget } from '../apd';

/**
 * Add a new key person to the APD
 */
export const addKeyPerson = () => (dispatch, getState) => {
  dispatch({
    type: ADD_APD_ITEM,
    path: '/keyPersonnel/-',
    state: getState()
  });
};

/**
 * Remove a key person from the APD
 * @param {Number} index Index of the key person to remove
 * @param {Object} di Dependency injection object
 * @param {Object} di.global The window object, which provides window.confirm
 */
export const removeKeyPerson = (
  index,
  { global = window } = {}
) => dispatch => {
  if (global.confirm('Do you really want to delete this key person?')) {
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/keyPersonnel/${index}`
    });
    dispatch(updateBudget());
  }
};

/**
 * Set a key person's name
 * @param {String} name Key person's new name
 * @param {Number} index Index of the key person to update
 */
export const setKeyPersonName = (name, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/name`,
  value: name
});

/**
 * Set a key person's email
 * @param {String} email Key person's new email
 * @param {Number} index Index of the key person to update
 */
export const setKeyPersonEmail = (email, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/email`,
  value: email
});

/**
 * Set a key peron's role
 * @param {String} role Key person's new role
 * @param {Number} index Index of the key person to update
 */
export const setKeyPersonRole = (role, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/position`,
  value: role
});

/**
 * Set a key person's time committment
 * @param {Number} percent Percent of the key person's time to be dedicated to the APD
 * @param {Number} index Index of the key person to update
 */
export const setKeyPersonPercentTime = (percent, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/percentTime`,
  value: percent
});

/**
 * Set whether a key person has costs for the APD
 * @param {Boolean} hasCosts Whether the key person has costs that need to be included in the APD
 * @param {Number} index Index of the key person to update
 */
export const setKeyPersonHasCosts = (hasCosts, index) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/keyPersonnel/${index}/hasCosts`,
    value: hasCosts
  });
  dispatch(updateBudget());
};

/**
 * Set a key person's costs for a federal fiscal year
 * @param {Number} cost The key person's costs to be included in the APD
 * @param {Number} index Index of the key person to update
 * @param {String} year Year the cost applies to, four-digit
 */
export const setKeyPersonCost = (cost, index, year) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/keyPersonnel/${index}/costs/${year}`,
    value: cost
  });
  dispatch(updateBudget());
};
