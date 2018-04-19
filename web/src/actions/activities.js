export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

export const addActivity = () => ({ type: ADD_ACTIVITY });
export const updateActivity = data => ({ type: UPDATE_ACTIVITY, data });
