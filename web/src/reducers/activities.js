import u from 'updeep';

import {
  ADD_ACTIVITY,
  ADD_ACTIVITY_GOAL,
  ADD_ACTIVITY_MILESTONE,
  REMOVE_ACTIVITY_MILESTONE,
  UPDATE_ACTIVITY
} from '../actions/activities';

const newGoal = () => ({ desc: '', obj: '' });

const newMilestone = () => ({ name: '', start: '', end: '' });

const newActivity = id => ({
  id,
  name: '',
  types: ['HIT'],
  descShort: '',
  descLong: '',
  altApproach: '',
  goals: [newGoal()],
  milestones: [newMilestone(), newMilestone(), newMilestone()]
});

const initialState = {
  byId: { 1: newActivity(1) },
  allIds: [1]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACTIVITY: {
      const id = Math.max(...state.allIds, 0) + 1;
      return {
        byId: {
          ...state.byId,
          [id]: newActivity(id)
        },
        allIds: [...state.allIds, id]
      };
    }
    case ADD_ACTIVITY_GOAL:
      return u(
        {
          byId: {
            [action.id]: {
              goals: goals => [...goals, newGoal()]
            }
          }
        },
        state
      );
    case ADD_ACTIVITY_MILESTONE:
      return u(
        {
          byId: {
            [action.id]: {
              milestones: milestones => [...milestones, newMilestone()]
            }
          }
        },
        state
      );
    case REMOVE_ACTIVITY_MILESTONE:
      return u(
        {
          byId: {
            [action.id]: {
              milestones: milestones =>
                milestones.filter((_, i) => i !== action.milestoneIdx)
            }
          }
        },
        state
      );
    case UPDATE_ACTIVITY:
      return u(
        {
          byId: {
            [action.id]: { ...action.updates }
          }
        },
        state
      );

    default:
      return state;
  }
};

export default reducer;
