import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from './symbols';
import { updateBudget } from '../budget';
import { getKeyPersonnel } from '../../reducers/apd.js';

/**
 * Add a new key person to the APD
 */
export const createKeyPerson = (years, isPrimary) => {
  console.log("create key person called with:", {years, isPrimary})
  return getKeyPersonnel(years, isPrimary);
};

/**
 * Save key person to the APD
 */
export const saveKeyPerson = (index, data) => (dispatch, getState) => {
  const previousState = getState();
  
  // Use the provided index unless we are creating a new item in the array
  // If its a newly created item set it to the length which will be the latest
  // added item
  let indexCalculated = index;
  console.log("index", index);
  
  if(previousState.apd.data.keyPersonnel[index] === undefined) {
    indexCalculated = previousState.apd.data.keyPersonnel.length;
    dispatch({
      type: ADD_APD_ITEM,
      path: '/keyPersonnel/-',
      state: getState()
    });
  }
  
  dispatch({
    type: EDIT_APD,
    path: `/keyPersonnel/${indexCalculated}`,
    value: data
  });
  
  dispatch(updateBudget());
};

/**
 * Edit person to the APD
 */
export const editKeyPerson = () => () => {
  console.log("edit Key Person")
};

/**
 * Remove a key person from the APD
 * @param {Number} index Index of the key person to remove
 * @param {Object} di Dependency injection object
 */
export const removeKeyPerson = index => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/keyPersonnel/${index}`
  });
  dispatch(updateBudget());
};