import axios from '../../util/api';

export const UPDATE_BUDGET = 'UPDATE_BUDGET';

export const updateBudget = apdID => dispatch =>
  axios.patch(`/apds/${apdID}/budget`).then(res => {
    dispatch({ type: UPDATE_BUDGET, budget: res.data.budget });
  });

export const loadBudget = budget => dispatch =>
  dispatch({ type: UPDATE_BUDGET, budget });
