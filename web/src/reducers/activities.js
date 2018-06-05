import u from 'updeep';

import {
  ADD_ACTIVITY,
  ADD_ACTIVITY_CONTRACTOR,
  ADD_ACTIVITY_GOAL,
  ADD_ACTIVITY_EXPENSE,
  ADD_ACTIVITY_MILESTONE,
  ADD_ACTIVITY_STATE_PERSON,
  EXPAND_ACTIVITY_SECTION,
  REMOVE_ACTIVITY,
  REMOVE_ACTIVITY_CONTRACTOR,
  REMOVE_ACTIVITY_GOAL,
  REMOVE_ACTIVITY_EXPENSE,
  REMOVE_ACTIVITY_MILESTONE,
  REMOVE_ACTIVITY_STATE_PERSON,
  TOGGLE_ACTIVITY_SECTION,
  UPDATE_ACTIVITY
} from '../actions/activities';
import { GET_APD_SUCCESS } from '../actions/apd';

import { YEAR_OPTIONS, arrToObj, nextSequence } from '../util';

const newGoal = () => ({ desc: '', obj: '' });

const newMilestone = () => ({ name: '', start: '', end: '' });

const newStatePerson = id => ({
  id,
  title: '',
  desc: '',
  years: arrToObj(YEAR_OPTIONS, { amt: '', perc: '' })
});

const newContractor = id => ({
  id,
  name: '',
  desc: '',
  start: '',
  end: '',
  years: arrToObj(YEAR_OPTIONS, 0)
});

const newExpense = id => ({
  id,
  category: 'Hardware, software, and licensing',
  desc: '',
  years: arrToObj(YEAR_OPTIONS, 100)
});

const newActivity = (id, name = '', fundingSource = 'HIT') => ({
  id,
  name,
  fundingSource,
  descShort: '',
  descLong: '',
  altApproach: '',
  costAllocateDesc: '',
  otherFundingDesc: '',
  otherFundingAmt: '',
  goals: [newGoal()],
  milestones: [newMilestone(), newMilestone(), newMilestone()],
  statePersonnel: [newStatePerson(1), newStatePerson(2), newStatePerson(3)],
  contractorResources: [newContractor(1), newContractor(2), newContractor(3)],
  expenses: [newExpense(1), newExpense(2), newExpense(3)],
  costFFP: arrToObj(YEAR_OPTIONS, { fed: 90, state: 10, other: 0 }),
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
  },
  meta: {
    expanded: false
  }
});

const initialState = {
  byId: {
    1: newActivity(1, 'Program Administration', 'HIT'),
    2: newActivity(2, 'Test', 'HIE')
  },
  allIds: [1, 2]
};

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
    case REMOVE_ACTIVITY: {
      const byId = { ...state.byId };
      delete byId[action.id];
      return {
        byId,
        allIds: state.allIds.filter(id => id !== action.id)
      };
    }
    case ADD_ACTIVITY_CONTRACTOR:
      return u(
        {
          byId: {
            [action.id]: {
              contractorResources: contractors => [
                ...contractors,
                newContractor(nextSequence(contractors.map(c => c.id)))
              ]
            }
          }
        },
        state
      );
    case REMOVE_ACTIVITY_CONTRACTOR:
      return u(
        {
          byId: {
            [action.id]: {
              contractorResources: contractors =>
                contractors.filter(c => c.id !== action.contractorId)
            }
          }
        },
        state
      );
    case ADD_ACTIVITY_STATE_PERSON:
      return u(
        {
          byId: {
            [action.id]: {
              statePersonnel: people => [
                ...people,
                newStatePerson(nextSequence(people.map(p => p.id)))
              ]
            }
          }
        },
        state
      );
    case REMOVE_ACTIVITY_STATE_PERSON:
      return u(
        {
          byId: {
            [action.id]: {
              statePersonnel: people =>
                people.filter(p => p.id !== action.personId)
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
    case REMOVE_ACTIVITY_GOAL:
      return u(
        {
          byId: {
            [action.id]: {
              goals: goals => goals.filter((_, i) => i !== action.goalIdx)
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
    case EXPAND_ACTIVITY_SECTION:
      return u({ byId: { [action.id]: { meta: { expanded: true } } } }, state);
    case TOGGLE_ACTIVITY_SECTION:
      return u(
        { byId: { [action.id]: { meta: { expanded: val => !val } } } },
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
    case GET_APD_SUCCESS: {
      const byId = {};
      action.data.activities.forEach(a => {
        byId[a.id] = {
          id: a.id,
          name: a.name,
          fundingSource: 'HIT', // TODO
          descShort: '', // TODO
          descLong: a.description,
          altApproach: '', // TODO
          costAllocateDesc: '', // TODO
          otherFundingDesc: a.otherFundingSources.description,
          otherFundingAmt: +a.otherFundingSources.amount,
          goals: a.goals.map(g => ({
            desc: g.description,
            obj: g.objectives[0] // TODO - don't assume there's one objective; tie objective directly to the goal instead of a mapped table
          })),
          milestones: a.schedule.map(s => ({
            id: s.id,
            name: s.milestone,
            start: s.plannedStart,
            end: s.plannedEnd
          })),
          statePersonnel: a.statePersonnel.map(s => ({
            id: s.id,
            title: s.title,
            desc: s.description,
            years: s.years.reduce(
              (years, y) => ({
                ...years,
                [y.year]: {
                  amt: y.cost,
                  perc: y.fte
                }
              }),
              {}
            )
          })),
          contractorResources: a.contractorResources.map(c => ({
            id: c.id,
            name: c.name,
            desc: c.description,
            start: c.start,
            end: c.end,
            years: c.years.reduce(
              (years, y) => ({
                ...years,
                [y.year]: +y.cost
              }),
              {}
            )
          })),
          expenses: a.expenses.map(e => ({
            id: e.id,
            category: e.category,
            desc: e.description,
            years: e.entries.reduce(
              (years, y) => ({
                ...years,
                [y.year]: +y.amount
              }),
              {}
            )
          })),

          standardsAndConditions: {
            // TODO
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
          },
          meta: {
            expanded: false
          }
        };
      });

      return {
        byId,
        allIds: action.data.activities.map(a => a.id)
      };
    }
    default:
      return state;
  }
};

export default reducer;

// data munging / aggregation functions

export const aggregateByYear = (
  dataArray,
  iteratee = x => x,
  years = YEAR_OPTIONS
) =>
  dataArray.reduce((accum, datum) => {
    const totals = accum;
    years.forEach(yr => {
      totals[yr] += +iteratee(datum[yr]);
    });
    return totals;
  }, arrToObj(years, 0));

export const getCategoryTotals = (entries, iteratee = x => x) =>
  aggregateByYear(entries.map(e => e.years), iteratee);

export const getActivityCategoryTotals = activity => ({
  statePersonnel: getCategoryTotals(activity.statePersonnel, d => d.amt),
  contractors: getCategoryTotals(activity.contractorResources),
  expenses: getCategoryTotals(activity.expenses)
});

export const getActivitiesCategoryTotals = activities => {
  const totalsByCat = activities.map(a => getActivityCategoryTotals(a));
  const catNames = ['statePersonnel', 'contractors', 'expenses'];

  return catNames.reduce((obj, cat) => {
    obj[cat] = aggregateByYear(totalsByCat.map(t => t[cat])); // eslint-disable-line no-param-reassign
    return obj;
  }, {});
};

export const getActivityTotals = activity =>
  aggregateByYear(Object.values(getActivityCategoryTotals(activity)));

export const getActivitiesTotals = activities =>
  aggregateByYear(activities.map(a => getActivityTotals(a)));
