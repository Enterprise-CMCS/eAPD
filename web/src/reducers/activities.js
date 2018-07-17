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
import { SELECT_APD, UPDATE_APD } from '../actions/apd';

import {
  arrToObj,
  defaultAPDYears,
  generateKey as defaultGenerateKey
} from '../util';

// Make this thing injectible for testing.
let generateKey = defaultGenerateKey;
export const setKeyGenerator = fn => {
  generateKey = fn;
};

const newGoal = () => ({ key: generateKey(), desc: '', obj: '' });

const newMilestone = (name = '', start = '', end = '') => ({
  key: generateKey(),
  name,
  start,
  end
});

const statePersonDefaultYear = () => ({ amt: '', perc: '' });
const newStatePerson = years => ({
  key: generateKey(),
  title: '',
  desc: '',
  years: arrToObj(years, statePersonDefaultYear())
});

const contractorDefaultYear = () => 0;
const newContractor = years => ({
  key: generateKey(),
  name: '',
  desc: '',
  start: '',
  end: '',
  years: arrToObj(years, contractorDefaultYear())
});

const expenseDefaultYear = () => 0;

const newExpense = years => ({
  key: generateKey(),
  category: 'Hardware, software, and licensing',
  desc: '',
  years: arrToObj(years, expenseDefaultYear())
});

const costAllocationEntry = (other = 0, federal = 90, state = 10) => ({
  other,
  ffp: { federal, state }
});

const quarterlyFFPEntry = () =>
  [1, 2, 3, 4].reduce(
    (acc, quarter) => ({
      ...acc,
      [quarter]: {
        state: 25,
        contractors: 25,
        combined: 25
      }
    }),
    {}
  );

const newActivity = ({
  name = '',
  fundingSource = 'HIT',
  years = [],
  ...rest
} = {}) => ({
  key: generateKey(),
  name,
  fundingSource,
  descShort: '',
  descLong: '',
  altApproach: '',
  costAllocationDesc: '',
  otherFundingDesc: '',
  goals: [newGoal()],
  milestones: [newMilestone()],
  statePersonnel: [
    newStatePerson(years),
    newStatePerson(years),
    newStatePerson(years)
  ],
  contractorResources: [
    newContractor(years),
    newContractor(years),
    newContractor(years)
  ],
  expenses: [newExpense(years), newExpense(years), newExpense(years)],
  costAllocation: arrToObj(years, costAllocationEntry()),
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
  quarterlyFFP: arrToObj(years, quarterlyFFPEntry()),
  years,
  meta: {
    expanded: false
  },
  ...rest
});

const initialState = {
  byKey: {},
  allKeys: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACTIVITY: {
      const activity = newActivity({ years: action.years });
      return {
        byKey: {
          ...state.byKey,
          [activity.key]: activity
        },
        allKeys: [...state.allKeys, activity.key]
      };
    }
    case REMOVE_ACTIVITY: {
      const byKey = { ...state.byKey };
      delete byKey[action.key];
      return {
        byKey,
        allKeys: state.allKeys.filter(key => key !== action.key)
      };
    }
    case ADD_ACTIVITY_CONTRACTOR:
      return u(
        {
          byKey: {
            [action.key]: {
              contractorResources: contractors => [
                ...contractors,
                newContractor(action.years)
              ]
            }
          }
        },
        state
      );
    case REMOVE_ACTIVITY_CONTRACTOR:
      return u(
        {
          byKey: {
            [action.key]: {
              contractorResources: contractors =>
                contractors.filter(c => c.key !== action.contractorKey)
              // TODO: UPDATE ACTION PROP
            }
          }
        },
        state
      );
    case ADD_ACTIVITY_STATE_PERSON:
      return u(
        {
          byKey: {
            [action.key]: {
              statePersonnel: people => [
                ...people,
                newStatePerson(action.years)
              ]
            }
          }
        },
        state
      );
    case REMOVE_ACTIVITY_STATE_PERSON:
      return u(
        {
          byKey: {
            [action.key]: {
              statePersonnel: people =>
                people.filter(p => p.key !== action.personKey)
              // TODO: UPDATE ACTION PROP
            }
          }
        },
        state
      );
    case ADD_ACTIVITY_GOAL:
      return u(
        {
          byKey: {
            [action.key]: {
              goals: goals => [...goals, newGoal()]
            }
          }
        },
        state
      );
    case REMOVE_ACTIVITY_GOAL:
      return u(
        {
          byKey: {
            [action.key]: {
              goals: goals => goals.filter(g => g.key !== action.goalKey)
              // TODO: UPDATE ACTION PROP
            }
          }
        },
        state
      );
    case ADD_ACTIVITY_EXPENSE:
      return u(
        {
          byKey: {
            [action.key]: {
              expenses: expenses => [...expenses, newExpense(action.years)]
            }
          }
        },
        state
      );
    case REMOVE_ACTIVITY_EXPENSE:
      return u(
        {
          byKey: {
            [action.key]: {
              expenses: expenses =>
                expenses.filter(e => e.key !== action.expenseKey)
              // TODO: UPDATE ACTION PROP
            }
          }
        },
        state
      );
    case ADD_ACTIVITY_MILESTONE:
      return u(
        {
          byKey: {
            [action.key]: {
              milestones: milestones => [...milestones, newMilestone()]
            }
          }
        },
        state
      );
    case REMOVE_ACTIVITY_MILESTONE:
      return u(
        {
          byKey: {
            [action.key]: {
              milestones: milestones =>
                milestones.filter(m => m.key !== action.milestoneKey)
              // TODO: UPDATE ACTION PROP
            }
          }
        },
        state
      );
    case EXPAND_ACTIVITY_SECTION:
      return u(
        { byKey: { [action.key]: { meta: { expanded: true } } } },
        // TODO: UPDATE ACTION PROP
        state
      );
    case TOGGLE_ACTIVITY_SECTION:
      return u(
        { byKey: { [action.key]: { meta: { expanded: val => !val } } } },
        // TODO: UPDATE ACTION PROP
        state
      );
    case UPDATE_ACTIVITY:
      return u(
        {
          byKey: {
            [action.key]: { ...action.updates }
            // TODO: UPDATE ACTION PROP
          }
        },
        state
      );
    case UPDATE_APD:
      if (action.updates.years) {
        const { years } = action.updates;
        const update = { byKey: {} };

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
          // but costAllocation is just an object whose properties
          // are the years
          return fixupYears(objects, defaultValue);
        };

        Object.entries(state.byKey).forEach(([key, activity]) => {
          update.byKey[key] = {
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
            costAllocation: fixupExpenses(
              activity.costAllocation,
              costAllocationEntry
            ),
            quarterlyFFP: () =>
              fixupYears(activity.quarterlyFFP, quarterlyFFPEntry)
          };
        });

        return u(update, state);
      }
      return state;
    case SELECT_APD: {
      const byKey = {};
      ((action.apd || {}).activities || []).forEach(a => {
        const key = generateKey();
        byKey[key] = {
          key,
          id: a.id,
          name: a.name,
          fundingSource: a.fundingSource,
          years: action.apd.years,
          descShort: a.summary || '',
          descLong: a.description || '',
          altApproach: a.alternatives || '',
          costAllocationDesc: a.costAllocationNarrative.methodology || '',
          otherFundingDesc: a.costAllocationNarrative.otherSources || '',
          costAllocation: a.costAllocation.reduce(
            (all, ffp) => ({
              ...all,
              [ffp.year]: {
                other: ffp.otherAmount || 0,
                ffp: {
                  federal: ffp.federalPercent * 100,
                  state: ffp.statePercent * 100
                }
              }
            }),
            {}
          ),
          goals: a.goals.map(g => ({
            key: generateKey(),
            id: g.id,
            desc: g.description || '',
            obj: g.objective || ''
          })),
          milestones: a.schedule.map(s => ({
            key: generateKey(),
            id: s.id,
            name: s.milestone || '',
            start: s.plannedStart || '',
            end: s.plannedEnd || ''
          })),
          statePersonnel: a.statePersonnel.map(s => ({
            key: generateKey(),
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
            key: generateKey(),
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
            key: generateKey(),
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
          quarterlyFFP:
            a.quarterlyFFP && a.quarterlyFFP.length
              ? a.quarterlyFFP.reduce(
                  (quarterlyAcc, ffy) => ({
                    ...quarterlyAcc,
                    [ffy.year]: {
                      1: {
                        combined: ffy.q1.combined * 100,
                        contractors: ffy.q1.contractors * 100,
                        state: ffy.q1.state * 100
                      },
                      2: {
                        combined: ffy.q2.combined * 100,
                        contractors: ffy.q2.contractors * 100,
                        state: ffy.q2.state * 100
                      },
                      3: {
                        combined: ffy.q3.combined * 100,
                        contractors: ffy.q3.contractors * 100,
                        state: ffy.q3.state * 100
                      },
                      4: {
                        combined: ffy.q4.combined * 100,
                        contractors: ffy.q4.contractors * 100,
                        state: ffy.q4.state * 100
                      }
                    }
                  }),
                  {}
                )
              : { ...arrToObj(action.apd.years, quarterlyFFPEntry()) },
          meta: {
            expanded: false
          }
        };
      });

      if (Object.keys(byKey).length === 0) {
        const defaultActivity = newActivity({
          name: 'Program Administration',
          fundingSource: 'HIT',
          years: defaultAPDYears
        });
        byKey[defaultActivity.key] = defaultActivity;
      }

      return {
        byKey,
        allKeys: Object.keys(byKey)
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
  statePersonnel: getCategoryTotals(
    activity.statePersonnel,
    d => d.amt * d.perc / 100
  ),
  contractors: getCategoryTotals(activity.contractorResources),
  expenses: getCategoryTotals(activity.expenses)
});

export const getActivityTotals = activity =>
  aggregateByYear(
    Object.values(getActivityCategoryTotals(activity)),
    activity.years
  );
