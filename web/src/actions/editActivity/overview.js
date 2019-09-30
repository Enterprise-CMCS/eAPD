import { ADD_ACTIVITY, EDIT_ACTIVITY, REMOVE_ACTIVITY } from './symbols';
import { updateBudget } from '../apd';

export const addActivity = () => (dispatch, getState) => {
  dispatch({
    type: ADD_ACTIVITY,
    state: getState()
  });
  dispatch(updateBudget());
};

export const removeActivity = key => (dispatch, getState) => {
  if (global.confirm('Do you really want to delete this activity?')) {
    const index = getState().activities.allKeys.indexOf(key);
    dispatch({ type: REMOVE_ACTIVITY, index, key });
    dispatch(updateBudget());
  }
};

export const setActivityName = (index, name) => ({
  type: EDIT_ACTIVITY,
  path: `/activities/${index}/name`,
  value: name
});

export const setActivityFundingSource = (index, source) => dispatch => {
  dispatch({
    type: EDIT_ACTIVITY,
    path: `/activities/${index}/fundingSource`,
    value: source
  });
  dispatch(updateBudget());
};
