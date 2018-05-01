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

export const addActivity = () => ({ type: ADD_ACTIVITY });

export const addActivityContractor = id => ({
  type: ADD_ACTIVITY_CONTRACTOR,
  id
});

export const addActivityGoal = id => ({ type: ADD_ACTIVITY_GOAL, id });

export const addActivityExpense = id => ({ type: ADD_ACTIVITY_EXPENSE, id });

export const addActivityMilestone = id => ({
  type: ADD_ACTIVITY_MILESTONE,
  id
});

export const addActivityStatePerson = id => ({
  type: ADD_ACTIVITY_STATE_PERSON,
  id
});

export const expandActivitySection = id => ({
  type: EXPAND_ACTIVITY_SECTION,
  id
});

export const removeActivity = id => ({ type: REMOVE_ACTIVITY, id });

export const removeActivityContractor = (id, contractorId) => ({
  type: REMOVE_ACTIVITY_CONTRACTOR,
  id,
  contractorId
});

export const removeActivityGoal = (id, goalIdx) => ({
  type: REMOVE_ACTIVITY_GOAL,
  id,
  goalIdx
});

export const removeActivityExpense = (id, expenseId) => ({
  type: REMOVE_ACTIVITY_EXPENSE,
  id,
  expenseId
});

export const removeActivityMilestone = (id, milestoneIdx) => ({
  type: REMOVE_ACTIVITY_MILESTONE,
  id,
  milestoneIdx
});

export const removeActivityStatePerson = (id, personId) => ({
  type: REMOVE_ACTIVITY_STATE_PERSON,
  id,
  personId
});

export const toggleActivitySection = id => ({
  type: TOGGLE_ACTIVITY_SECTION,
  id
});

export const updateActivity = (id, updates) => ({
  type: UPDATE_ACTIVITY,
  id,
  updates
});
