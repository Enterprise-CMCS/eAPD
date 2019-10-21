export const UPDATE_BUDGET = Symbol('update budget');

export const updateBudget = () => (dispatch, getState) =>
  dispatch({ type: UPDATE_BUDGET, state: getState() });
