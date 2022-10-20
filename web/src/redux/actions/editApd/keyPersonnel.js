import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from './symbols';

/**
 * Adds or updates a key personnel resource from an apd
 * @param {Number} index Index of the key personnel
 * @param {Object} data payload of the key personnel to be saved
 */
export const saveKeyPersonnel = (index, data) => (dispatch, getState) => {
  const previousState = getState();

  let indexCalculated = index;

  if (
    previousState.apd.data.keyStatePersonnel.keyPersonnel[index] === undefined
  ) {
    indexCalculated =
      previousState.apd.data.keyStatePersonnel.keyPersonnel.length;
    dispatch({
      type: ADD_APD_ITEM,
      path: '/keyStatePersonnel/keyPersonnel/-',
      state: getState()
    });
  }

  dispatch({
    type: EDIT_APD,
    path: `/keyStatePersonnel/keyPersonnel/${indexCalculated}`,
    value: data
  });
};

/**
 * Remove a key personnel from the APD
 * @param {Number} index Index of the key person to remove
 * @param {Object} di Dependency injection object
 */
export const removeKeyPersonnel = index => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/keyStatePersonnel/keyPersonnel/${index}`
  });
};
