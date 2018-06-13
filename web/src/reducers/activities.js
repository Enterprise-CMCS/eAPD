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
import { GET_APD_SUCCESS, SELECT_APD, UPDATE_APD } from '../actions/apd';

import { arrToObj, defaultAPDYears, nextSequence } from '../util';

const newGoal = () => ({ desc: '', obj: '' });

const newMilestone = () => ({ name: '', start: '', end: '' });

const statePersonDefaultYear = () => ({ amt: '', perc: '' });
const newStatePerson = (id, years) => ({
  id,
  title: '',
  desc: '',
  years: arrToObj(years, statePersonDefaultYear())
});

const contractorDefaultYear = () => 0;
const newContractor = (id, years) => ({
  id,
  name: '',
  desc: '',
  start: '',
  end: '',
  years: arrToObj(years, contractorDefaultYear())
});

const expenseDefaultYear = () => 0;
const newExpense = (id, years) => ({
  id,
  category: 'Hardware, software, and licensing',
  desc: '',
  years: arrToObj(years, expenseDefaultYear())
});

const costFFPDefaultYear = () => ({ fed: 90, state: 10, other: 0 });

const newActivity = (
  id,
  { name = '', fundingSource = 'HIT', years = [] } = {}
) => ({
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
  statePersonnel: [
    newStatePerson(1, years),
    newStatePerson(2, years),
    newStatePerson(3, years)
  ],
  contractorResources: [
    newContractor(1, years),
    newContractor(2, years),
    newContractor(3, years)
  ],
  expenses: [newExpense(1, years), newExpense(2, years), newExpense(3, years)],
  costFFP: arrToObj(years, { fed: 90, state: 10, other: 0 }),
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
  years,
  meta: {
    expanded: false
  }
});

const initialState = {
  byId: {},
  allIds: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACTIVITY: {
      const id = nextSequence(state.allIds);
      return {
        byId: {
          ...state.byId,
          [id]: newActivity(id, { years: action.years })
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
                newContractor(
                  nextSequence(contractors.map(c => c.id)),
                  action.years
                )
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
                newStatePerson(
                  nextSequence(people.map(p => p.id)),
                  action.years
                )
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
                newExpense(nextSequence(expenses.map(e => e.id)), action.years)
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
    case UPDATE_APD:
      if (action.updates.years) {
        const { years } = action.updates;
        const update = { byId: {} };

        const fixupYears = (obj, defaultValue) => {
          // Can't clone in the typical way because the incoming
          // object derives from redux state and preventExtensions()
          // has been called on it.  That means we can't add
          // years if necessary.  To get around that, stringify
          // then parse.  It's brute force but it works.
          const out = JSON.parse(JSON.stringify(obj));

          Object.keys(obj).forEach(year => {
            if (!years.includes(year)) {
              delete out[year];
            }
          });

          years.forEach(year => {
            if (!out[year]) {
              out[year] = defaultValue();
            }
          });

          return out;
        };

        const fixupExpenses = (objects, defaultValue) => () => {
          // contractorResources, statePersonnel, and expenses
          // are all arrays with years subproperties
          if (Array.isArray(objects)) {
            return objects.map(o => ({
              ...o,
              years: fixupYears(o.years, defaultValue)
            }));
          }
          // but costFFP is just an object whose properties
          // are the years
          return fixupYears(objects, defaultValue);
        };

        Object.entries(state.byId).forEach(([id, activity]) => {
          update.byId[id] = {
            years,
            statePersonnel: fixupExpenses(
              activity.statePersonnel,
              statePersonDefaultYear
            ),
            contractorResources: fixupExpenses(
              activity.contractorResources,
              contractorDefaultYear
            ),
            expenses: fixupExpenses(activity.expenses, expenseDefaultYear),
            costFFP: fixupExpenses(activity.costFFP, costFFPDefaultYear)
          };
        });

        return u(update, state);
      }
      return state;
    case SELECT_APD: {
      const byId = {};
      ((action.apd || {}).activities || []).forEach(a => {
        byId[a.id] = {
          id: a.id,
          name: a.name,
          fundingSource: 'HIT', // TODO
          years: action.apd.years,
          descShort: a.summary || '',
          descLong: a.description || '',
          altApproach: a.alternatives || '',
          costAllocateDesc: a.costAllocationNarrative.methodology || '',
          otherFundingDesc: a.costAllocationNarrative.otherSources || '',
          otherFundingAmt: 0,
          costFFP: a.costAllocation.reduce(
            (all, ffp) => ({
              ...all,
              [ffp.year]: {
                fed: ffp.federal * 100,
                state: ffp.state * 100,
                other: ffp.other * 100
              }
            }),
            {}
          ),
          goals: a.goals.map(g => ({
            desc: g.description || '',
            obj: g.objective || ''
          })),
          milestones: a.schedule.map(s => ({
            id: s.id,
            name: s.milestone || '',
            start: s.plannedStart || '',
            end: s.plannedEnd || ''
          })),
          statePersonnel: a.statePersonnel.map(s => ({
            id: s.id,
            title: s.title || '',
            desc: s.description || '',
            years: s.years.reduce(
              (years, y) => ({
                ...years,
                [y.year]: {
                  amt: y.cost,
                  perc: y.fte * 100
                }
              }),
              {}
            )
          })),
          contractorResources: a.contractorResources.map(c => ({
            id: c.id,
            name: c.name || '',
            desc: c.description || '',
            start: c.start || '',
            end: c.end || '',
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
            category: e.category || '',
            desc: e.description || '',
            years: e.entries.reduce(
              (years, y) => ({
                ...years,
                [y.year]: +y.amount
              }),
              {}
            )
          })),

          standardsAndConditions: {
            bizResults: a.standardsAndConditions.businessResults || '',
            documentation: a.standardsAndConditions.documentation || '',
            industry: a.standardsAndConditions.industryStandards || '',
            interoperability: a.standardsAndConditions.interoperability || '',
            keyPersonnel: a.standardsAndConditions.keyPersonnel || '',
            leverage: a.standardsAndConditions.leverage || '',
            modularity: a.standardsAndConditions.modularity || '',
            minimizeCost: a.standardsAndConditions.minimizeCost || '',
            mita: a.standardsAndConditions.mita || '',
            mitigation: a.standardsAndConditions.mitigationStrategy || '',
            reporting: a.standardsAndConditions.reporting || ''
          },
          meta: {
            expanded: false
          }
        };
      });

      if (Object.keys(byId).length === 0) {
        byId[1] = newActivity(1, {
          name: 'Program Administration',
          fundingSource: 'HIT',
          years: defaultAPDYears
        });
      }

      return {
        byId,
        allIds: Object.keys(byId)
      };
    }
    default:
      return state;
  }
};

export default reducer;

// data munging / aggregation functions

export const aggregateByYear = (dataArray, years, iteratee = x => x) =>
  dataArray.reduce((accum, datum) => {
    const totals = accum;
    years.forEach(yr => {
      totals[yr] += +iteratee(datum[yr]);
    });
    return totals;
  }, arrToObj(years, 0));

export const getCategoryTotals = (entries, iteratee = x => x) => {
  let years = [];
  if (entries.length) {
    years = Object.keys(entries[0].years);
  }
  return aggregateByYear(entries.map(e => e.years), years, iteratee);
};

export const getActivityCategoryTotals = activity => ({
  statePersonnel: getCategoryTotals(activity.statePersonnel, d => d.amt),
  contractors: getCategoryTotals(activity.contractorResources),
  expenses: getCategoryTotals(activity.expenses)
});

export const getActivityTotals = activity =>
  aggregateByYear(
    Object.values(getActivityCategoryTotals(activity)),
    activity.years
  );
