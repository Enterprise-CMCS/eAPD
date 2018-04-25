import u from 'updeep';

import {
  ADD_ACTIVITY,
  ADD_ACTIVITY_CONTRACTOR_RESOURCE,
  ADD_ACTIVITY_GOAL,
  ADD_ACTIVITY_EXPENSE,
  ADD_ACTIVITY_MILESTONE,
  REMOVE_ACTIVITY,
  REMOVE_ACTIVITY_CONTRACTOR_RESOURCE,
  REMOVE_ACTIVITY_EXPENSE,
  REMOVE_ACTIVITY_MILESTONE,
  UPDATE_ACTIVITY
} from '../actions/activities';

const newGoal = () => ({ desc: '', obj: '' });

const newContractorResource = id => ({
  id,
  name: '',
  desc: '',
  start: '',
  end: '',
  years: {
    2018: 0,
    2019: 0
  }
});

const newExpense = id => ({
  id,
  category: 'Expense A',
  desc: '',
  years: {
    2018: 100,
    2019: 100
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
  expenses: [newExpense(0), newExpense(1), newExpense(2)],
  milestones: [newMilestone(), newMilestone(), newMilestone()],
  costAllocateDesc: '',
  otherFundingDesc: '',
  otherFundingAmt: '',
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

const nextSequence = arrOfNums => Math.max(...arrOfNums, 0) + 1;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACTIVITY: {
      const id = nextSequence(state.allIds);
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
                newContractorResource(nextSequence(contractors.map(c => c.id)))
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
    case ADD_ACTIVITY_EXPENSE:
      return u(
        {
          byId: {
            [action.id]: {
              expenses: expenses => [
                ...expenses,
                newExpense(nextSequence(expenses.map(e => e.id)))
              ]
            }
          }
        },
        state
      );
    case REMOVE_ACTIVITY_EXPENSE:
      return u(
        {
          byId: {
            [action.id]: {
              expenses: expenses =>
                expenses.filter(e => e.id !== action.expenseId)
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
    case REMOVE_ACTIVITY: {
      const byId = { ...state.byId };
      delete byId[action.id];

      return {
        byId,
        allIds: state.allIds.filter(id => id !== action.id)
      };
    }
    case REMOVE_ACTIVITY_CONTRACTOR_RESOURCE:
      return u(
        {
          byId: {
            [action.id]: {
              contractorResources: contractors =>
                contractors.filter(c => c.id !== action.contractorResourceId)
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
