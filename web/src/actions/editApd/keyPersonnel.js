import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from './symbols';
import { updateBudget } from '../budget';

/**
 * Save key personnel to the APD
 */
export const saveKeyPersonnel = (index, data) => (dispatch, getState) => {
  const previousState = getState();

  let indexCalculated = index;
  
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
 * Remove a key personnel from the APD
 * @param {Number} index Index of the key person to remove
 * @param {Object} di Dependency injection object
 */
export const removeKeyPersonnel = index => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/keyPersonnel/${index}`
  });
  dispatch(updateBudget());
};