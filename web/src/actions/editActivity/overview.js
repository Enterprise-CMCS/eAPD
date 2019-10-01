import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';
import { updateBudget } from '../apd';

export const addActivity = () => (dispatch, getState) => {
  dispatch({
    type: ADD_APD_ITEM,
    path: '/activities/-',
    state: getState()
  });
  dispatch(updateBudget());
};

export const removeActivity = (index, { global = window } = {}) => dispatch => {
  if (global.confirm('Do you really want to delete this activity?')) {
    dispatch({ type: REMOVE_APD_ITEM, path: `/activities/${index}` });
    dispatch(updateBudget());
  }
};

export const setActivityName = (index, name) => ({
  type: EDIT_APD,
  path: `/activities/${index}/name`,
  value: name
});

export const setActivityFundingSource = (index, source) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${index}/fundingSource`,
    value: source
  });
  dispatch(updateBudget());
};
