import { updateBudget } from './apd';

export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const ADD_ACTIVITY_CONTRACTOR = 'ADD_ACTIVITY_CONTRACTOR';
export const ADD_ACTIVITY_GOAL = 'ADD_ACTIVITY_GOAL';
export const ADD_ACTIVITY_EXPENSE = 'ADD_ACTIVITY_EXPENSE';
export const ADD_ACTIVITY_MILESTONE = 'ADD_ACTIVITY_MILESTONE';
export const ADD_ACTIVITY_STATE_PERSON = 'ADD_ACTIVITY_STATE_PERSON';
export const EXPAND_ACTIVITY_SECTION = 'EXPAND_ACTIVITY_SECTION';
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';
export const REMOVE_ACTIVITY_CONTRACTOR = 'REMOVE_ACTIVITY_CONTRACTOR';
export const REMOVE_ACTIVITY_GOAL = 'REMOVE_ACTIVITY_GOAL';
export const REMOVE_ACTIVITY_EXPENSE = 'REMOVE_ACTIVITY_EXPENSE';
export const REMOVE_ACTIVITY_MILESTONE = 'REMOVE_ACTIVITY_MILESTONE';
export const REMOVE_ACTIVITY_STATE_PERSON = 'REMOVE_ACTIVITY_STATE_PERSON';
export const TOGGLE_ACTIVITY_SECTION = 'TOGGLE_ACTIVITY_SECTION';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

const actionWithYears = (type, other) => (dispatch, getState) =>
  dispatch({ type, ...other, years: getState().apd.data.years });

export const addActivity = () => actionWithYears(ADD_ACTIVITY);

export const addActivityContractor = id =>
  actionWithYears(ADD_ACTIVITY_CONTRACTOR, { id });

export const addActivityGoal = id => ({ type: ADD_ACTIVITY_GOAL, id });

export const addActivityExpense = id =>
  actionWithYears(ADD_ACTIVITY_EXPENSE, { id });

export const addActivityMilestone = id => ({
  type: ADD_ACTIVITY_MILESTONE,
  id
});

export const addActivityStatePerson = id =>
  actionWithYears(ADD_ACTIVITY_STATE_PERSON, { id });

export const expandActivitySection = id => ({
  type: EXPAND_ACTIVITY_SECTION,
  id
});

export const removeActivity = id => dispatch => {
  dispatch({ type: REMOVE_ACTIVITY, id });
  dispatch(updateBudget());
};

export const removeActivityContractor = (id, contractorId) => dispatch => {
  dispatch({
    type: REMOVE_ACTIVITY_CONTRACTOR,
    id,
    contractorId
  });
  dispatch(updateBudget());
};

export const removeActivityGoal = (id, goalIdx) => ({
  type: REMOVE_ACTIVITY_GOAL,
  id,
  goalIdx
});

export const removeActivityExpense = (id, expenseId) => dispatch => {
  dispatch({
    type: REMOVE_ACTIVITY_EXPENSE,
    id,
    expenseId
  });
  dispatch(updateBudget());
};

export const removeActivityMilestone = (id, milestoneIdx) => ({
  type: REMOVE_ACTIVITY_MILESTONE,
  id,
  milestoneIdx
});

export const removeActivityStatePerson = (id, personId) => dispatch => {
  dispatch({
    type: REMOVE_ACTIVITY_STATE_PERSON,
    id,
    personId
  });
  dispatch(updateBudget());
};

export const toggleActivitySection = id => ({
  type: TOGGLE_ACTIVITY_SECTION,
  id
});

export const updateActivity = (id, updates, isExpense = false) => dispatch => {
  dispatch({
    type: UPDATE_ACTIVITY,
    id,
    updates
  });
  if (isExpense) {
    dispatch(updateBudget());
  }
};
