import axios from '../../util/api';

export const LOAD_BUDGET = 'LOAD_BUDGET';
export const UPDATE_BUDGET_FAILURE = 'UPDATE_BUDGET_FAILURE';
export const UPDATE_BUDGET_REQUEST = 'UPDATE_BUDGET_REQUEST';
export const UPDATE_BUDGET_SUCCESS = 'UPDATE_BUDGET_SUCCESS';

export const updateBudget = apdID => dispatch => {
  dispatch({ type: UPDATE_BUDGET_REQUEST });
  return axios
    .patch(`/apds/${apdID}/budget`)
    .then(res => {
      dispatch({ type: UPDATE_BUDGET_SUCCESS, budget: res.data.budget });
    })
    .catch(() => {
      const error = 'There was an error updating the budget';
      dispatch({ type: UPDATE_BUDGET_FAILURE, data: error });
    });
};

export const loadBudget = budget => dispatch =>
  dispatch({ type: LOAD_BUDGET, budget });
