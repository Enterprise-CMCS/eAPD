export const UPDATE_BUDGET = 'UPDATE_BUDGET';

export const updateBudget = () => (dispatch, getState) =>
  dispatch({ type: UPDATE_BUDGET, state: getState() });
