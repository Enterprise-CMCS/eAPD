import { apply_patch as applyPatch } from 'jsonpatch';
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
  TOGGLE_ACTIVITY_CONTRACTOR_HOURLY,
  TOGGLE_ACTIVITY_SECTION,
  UPDATE_ACTIVITY
} from '../actions/activities';
import { SAVE_APD_SUCCESS } from '../actions/apd';
import { SELECT_APD } from '../actions/app';

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

export const newGoal = () => ({
  key: generateKey(),
  initialCollapsed: false,
  description: '',
  objective: ''
});

export const newMilestone = (milestone = '', endDate = '') => ({
  initialCollapsed: false,
  key: generateKey(),
  milestone,
  endDate
});

export const statePersonDefaultYear = () => ({ amt: '', perc: '' });
export const newStatePerson = years => ({
  key: generateKey(),
  initialCollapsed: false,
  title: '',
  description: '',
  years: arrToObj(years, statePersonDefaultYear())
});

export const contractorDefaultYear = () => 0;
export const contractorDefaultHourly = () => ({ hours: '', rate: '' });
export const newContractor = years => ({
  key: generateKey(),
  initialCollapsed: false,
  name: '',
  description: '',
  start: '',
  end: '',
  files: [],
  totalCost: 0,
  years: arrToObj(years, contractorDefaultYear()),
  hourly: {
    useHourly: false,
    data: arrToObj(years, contractorDefaultHourly())
  }
});

export const expenseDefaultYear = () => 0;

export const newExpense = years => ({
  key: generateKey(),
  initialCollapsed: false,
  category: 'Hardware, software, and licensing',
  description: '',
  years: arrToObj(years, expenseDefaultYear())
});

export const costAllocationEntry = (other = 0, federal = 90, state = 10) => ({
  other,
  ffp: { federal, state }
});

export const quarterlyFFPEntry = () =>
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

export const newActivity = ({
  name = '',
  fundingSource = 'HIT',
  years = [],
  ...rest
} = {}) => ({
  alternatives: '',
  contractorResources: [newContractor(years)],
  costAllocation: arrToObj(years, costAllocationEntry()),
  costAllocationNarrative: {
    methodology: '',
    otherSources: ''
  },
  description: '',
  expenses: [newExpense(years)],
  fundingSource,
  goals: [newGoal()],
  initialCollapsed: false,
  key: generateKey(),
  name,
  plannedEndDate: '',
  plannedStartDate: '',
  schedule: [newMilestone()],
  statePersonnel: [newStatePerson(years)],
  summary: '',
  standardsAndConditions: {
    modularity: '',
    mita: '',
    industryStandards: '',
    leverage: '',
    businessResults: '',
    reporting: '',
    interoperability: '',
    mitigationStrategy: '',
    keyPersonnel: '',
    documentation: '',
    minimizeCost: ''
  },
  quarterlyFFP: arrToObj(years, quarterlyFFPEntry()),
  years,
  meta: {
    expanded: name === 'Program Administration'
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
              schedule: milestones => [...milestones, newMilestone()]
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
              schedule: milestones =>
                milestones.filter(m => m.key !== action.milestoneKey)
            }
          }
        },
        state
      );
    case EXPAND_ACTIVITY_SECTION:
      return u(
        { byKey: { [action.key]: { meta: { expanded: true } } } },
        state
      );
    case TOGGLE_ACTIVITY_CONTRACTOR_HOURLY: {
      const { key, contractorKey, useHourly } = action;
      const { contractorResources: contractorsOld, years } = state.byKey[key];

      // if switching to hourly, clear out yearly totals
      // if switch to yearly, clear out hourly numbers
      const contractorResources = contractorsOld.map(contractor =>
        contractor.key !== contractorKey
          ? contractor
          : {
              ...contractor,
              ...(useHourly && {
                years: arrToObj(years, contractorDefaultYear())
              }),
              hourly: {
                ...contractor.hourly,
                useHourly,
                ...(!useHourly && {
                  data: arrToObj(years, contractorDefaultHourly())
                })
              }
            }
      );

      const updates = { byKey: { [key]: { contractorResources } } };
      return u(updates, state);
    }
    case TOGGLE_ACTIVITY_SECTION:
      return u(
        { byKey: { [action.key]: { meta: { expanded: val => !val } } } },
        state
      );
    case UPDATE_ACTIVITY:
      return u(
        {
          byKey: {
            [action.key]: { ...action.updates }
          }
        },
        state
      );

    case SELECT_APD: {
      const byKey = {};
      ((action.apd || {}).activities || []).forEach(a => {
        byKey[a.key] = {
          ...a,
          meta: { expanded: a.name === 'Program Administration' }
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
    case SAVE_APD_SUCCESS: {
      // When an APD is saved, we should grab any local activities that
      // don't have IDs and pull their new IDs from the API data.
      const activitiesWithoutIDs = Object.values(state.byKey).filter(
        a => !a.id
      );
      if (activitiesWithoutIDs.length) {
        const updates = { byKey: {} };
        activitiesWithoutIDs.forEach(localActivity => {
          const { id } = [
            ...action.data.activities.filter(
              apdActivity => apdActivity.name === localActivity.name
            ),
            {}
          ][0];
          if (id) {
            updates.byKey[localActivity.key] = { id };
          }
        });

        return u(updates, state);
      }
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
