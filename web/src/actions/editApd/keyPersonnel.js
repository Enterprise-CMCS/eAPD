import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from './symbols';
import { updateBudget } from '../apd';

export const addKeyPerson = () => (dispatch, getState) => {
  dispatch({
    type: ADD_APD_ITEM,
    path: '/keyPersonnel/-',
    state: getState()
  });
};

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

export const setKeyPersonName = (name, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/name`,
  value: name
});

export const setKeyPersonEmail = (email, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/email`,
  value: email
});

export const setKeyPersonRole = (role, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/position`,
  value: role
});

export const setKeyPersonPercentTime = (percent, index) => ({
  type: EDIT_APD,
  path: `/keyPersonnel/${index}/percentTime`,
  value: percent
});

// needs to trigger budget calculation
export const setKeyPersonHasCosts = (hasCosts, index) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/keyPersonnel/${index}/hasCosts`,
    value: hasCosts
  });
  dispatch(updateBudget());
};

// needs to trigger budget calculation
export const setKeyPersonCost = (cost, index, year) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/keyPersonnel/${index}/costs/${year}`,
    value: cost
  });
  dispatch(updateBudget());
};
