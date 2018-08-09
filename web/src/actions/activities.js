import { updateBudget } from './apd';

export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const ADD_ACTIVITY_CONTRACTOR = 'ADD_ACTIVITY_CONTRACTOR';
export const ADD_ACTIVITY_DIRTY = 'ADD_ACTIVITY_DIRYT';
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
export const TOGGLE_ACTIVITY_CONTRACTOR_HOURLY =
  'TOGGLE_ACTIVITY_CONTRACTOR_HOURLY';
export const TOGGLE_ACTIVITY_SECTION = 'TOGGLE_ACTIVITY_SECTION';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

const actionWithYears = (type, other) => (dispatch, getState) =>
  dispatch({ type, ...other, years: getState().apd.data.years });

export const addActivity = () => (dispatch, getState) => {
  const oldActivities = getState().activities.allKeys;

  dispatch(actionWithYears(ADD_ACTIVITY));
  dispatch(updateBudget());

  const newKey = getState().activities.allKeys.filter(
    k => !oldActivities.includes(k)
  )[0];
  dispatch({
    type: ADD_ACTIVITY_DIRTY,
    data: getState().activities.byKey[newKey]
  });
};

export const addActivityContractor = key =>
  actionWithYears(ADD_ACTIVITY_CONTRACTOR, { key });

export const addActivityGoal = key => ({ type: ADD_ACTIVITY_GOAL, key });

export const addActivityExpense = key =>
  actionWithYears(ADD_ACTIVITY_EXPENSE, { key });

export const addActivityMilestone = key => ({
  type: ADD_ACTIVITY_MILESTONE,
  key
});

export const addActivityStatePerson = key =>
  actionWithYears(ADD_ACTIVITY_STATE_PERSON, { key });

export const expandActivitySection = key => ({
  type: EXPAND_ACTIVITY_SECTION,
  key
});

export const removeActivity = key => dispatch => {
  dispatch({ type: REMOVE_ACTIVITY, key });
  dispatch(updateBudget());
};

export const removeActivityContractor = (key, contractorKey) => dispatch => {
  dispatch({
    type: REMOVE_ACTIVITY_CONTRACTOR,
    key,
    contractorKey
  });
  dispatch(updateBudget());
};

export const removeActivityGoal = (key, goalKey) => ({
  type: REMOVE_ACTIVITY_GOAL,
  key,
  goalKey
});

export const removeActivityExpense = (key, expenseKey) => dispatch => {
  dispatch({
    type: REMOVE_ACTIVITY_EXPENSE,
    key,
    expenseKey
  });
  dispatch(updateBudget());
};

export const removeActivityMilestone = (key, milestoneKey) => ({
  type: REMOVE_ACTIVITY_MILESTONE,
  key,
  milestoneKey
});

export const removeActivityStatePerson = (key, personKey) => dispatch => {
  dispatch({
    type: REMOVE_ACTIVITY_STATE_PERSON,
    key,
    personKey
  });
  dispatch(updateBudget());
};

export const toggleActivitySection = key => ({
  type: TOGGLE_ACTIVITY_SECTION,
  key
});

export const updateActivity = (key, updates, isExpense = false) => dispatch => {
  dispatch({
    type: UPDATE_ACTIVITY,
    key,
    updates
  });
  if (isExpense) {
    dispatch(updateBudget());
  }
};

export const toggleActivityContractorHourly = (
  key,
  contractorKey,
  useHourly
) => dispatch => {
  dispatch({
    type: TOGGLE_ACTIVITY_CONTRACTOR_HOURLY,
    key,
    contractorKey,
    useHourly
  });
  dispatch(updateBudget());
};
