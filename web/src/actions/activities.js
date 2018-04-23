export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const ADD_ACTIVITY_CONTRACTOR_RESOURCE =
  'ADD_ACTIVITY_CONTRACTOR_RESOURCE';
export const ADD_ACTIVITY_GOAL = 'ADD_ACTIVITY_GOAL';
export const ADD_ACTIVITY_MILESTONE = 'ADD_ACTIVITY_MILESTONE';
export const REMOVE_ACTIVITY_CONTRACTOR_RESOURCE =
  'REMOVE_ACTIVITY_CONTRACTOR_RESOURCE';
export const REMOVE_ACTIVITY_MILESTONE = 'REMOVE_ACTIVITY_MILESTONE';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

export const addActivity = () => ({ type: ADD_ACTIVITY });

export const addActivityContractorResource = id => ({
  type: ADD_ACTIVITY_CONTRACTOR_RESOURCE,
  id
});
export const removeActivityContractorResource = (
  id,
  contractorResourceIdx
) => ({
  type: REMOVE_ACTIVITY_CONTRACTOR_RESOURCE,
  id,
  contractorResourceIdx
});

export const addActivityGoal = id => ({ type: ADD_ACTIVITY_GOAL, id });

export const addActivityMilestone = id => ({
  type: ADD_ACTIVITY_MILESTONE,
  id
});

export const removeActivityMilestone = (id, milestoneIdx) => ({
  type: REMOVE_ACTIVITY_MILESTONE,
  id,
  milestoneIdx
});

export const updateActivity = (id, updates) => ({
  type: UPDATE_ACTIVITY,
  id,
  updates
});
