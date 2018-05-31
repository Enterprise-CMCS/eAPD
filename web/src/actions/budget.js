export const UPDATE_BUDGET = 'EDIT_BUDGET';

export const updateBudget = (expense, fundingSource, year) => ({
  type: UPDATE_BUDGET,
  expense: {
    expense,
    fundingSource,
    year
  }
});
