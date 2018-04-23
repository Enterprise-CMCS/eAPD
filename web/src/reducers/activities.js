import u from 'updeep';

import {
  ADD_ACTIVITY,
  ADD_ACTIVITY_CONTRACTOR_RESOURCE,
  ADD_ACTIVITY_GOAL,
  ADD_ACTIVITY_MILESTONE,
  REMOVE_ACTIVITY_CONTRACTOR_RESOURCE,
  REMOVE_ACTIVITY_MILESTONE,
  UPDATE_ACTIVITY
} from '../actions/activities';

const newGoal = () => ({ desc: '', obj: '' });

const newContractorResource = idx => ({
  idx,
  name: '',
  desc: '',
  start: '',
  end: '',
  years: {
    2018: 0,
    2019: 0
  }
});

const newMilestone = () => ({ name: '', start: '', end: '' });

const newActivity = id => ({
  id,
  name: '',
  types: ['HIT'],
  descShort: '',
  descLong: '',
  altApproach: '',
  contractorResources: [
    newContractorResource(0),
    newContractorResource(1),
    newContractorResource(2)
  ],
  goals: [newGoal()],
  milestones: [newMilestone(), newMilestone(), newMilestone()],
  standardsAndConditions: {
    modularity: '',
    mita: '',
    industry: '',
    leverage: '',
    bizResults: '',
    reporting: '',
    interoperability: '',
    mitigation: '',
    keyPersonnel: '',
    documentation: '',
    minimizeCost: ''
  }
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
    case ADD_ACTIVITY_CONTRACTOR_RESOURCE:
      return u(
        {
          byId: {
            [action.id]: {
              contractorResources: contractors => [
                ...contractors,
                newContractorResource(contractors.length)
              ]
            }
          }
        },
        state
      );
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
    case REMOVE_ACTIVITY_CONTRACTOR_RESOURCE:
      return u(
        {
          byId: {
            [action.id]: {
              contractorResources: contractors =>
                contractors.filter(c => c.idx !== action.contractorResourceIdx)
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
