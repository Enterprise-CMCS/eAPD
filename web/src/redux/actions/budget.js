import axios from '../../util/api';

export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const UPDATE_BUDGET_FAILURE = 'UPDATE_BUDGET_FAILURE';

export const updateBudget = apdID => dispatch =>
  axios
    .patch(`/apds/${apdID}/budget`)
    .then(res => {
      dispatch({ type: UPDATE_BUDGET, budget: res.data.budget });
    })
    .catch(() => {
      const error = 'There was an error updating the budget';
      dispatch({ type: UPDATE_BUDGET_FAILURE, data: error });
    });

export const loadBudget = budget => dispatch =>
  dispatch({ type: UPDATE_BUDGET, budget });
