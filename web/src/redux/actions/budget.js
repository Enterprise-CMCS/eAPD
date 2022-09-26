export const LOAD_BUDGET = 'LOAD_BUDGET';

export const loadBudget = budget => dispatch =>
  dispatch({ type: LOAD_BUDGET, budget });
