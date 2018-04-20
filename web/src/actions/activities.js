export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const ADD_ACTIVITY_GOAL = 'ADD_ACTIVITY_GOAL';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

export const addActivity = () => ({ type: ADD_ACTIVITY });
export const addActivityGoal = id => ({ type: ADD_ACTIVITY_GOAL, id });
export const updateActivity = (id, updates) => ({
  type: UPDATE_ACTIVITY,
  id,
  updates
});
