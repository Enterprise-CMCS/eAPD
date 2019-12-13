import u from 'updeep';
import { apply_patch as applyPatch } from 'jsonpatch';

import {
  contractorDefaultHourly,
  contractorDefaultYear,
  costAllocationEntry,
  expenseDefaultYear,
  newActivity,
  newContractor,
  newExpense,
  newGoal,
  newMilestone,
  newStatePerson,
  quarterlyFFPEntry,
  statePersonDefaultYear
} from './activities';
import {
  CREATE_APD_SUCCESS,
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  SET_SELECT_APD_ON_LOAD,
  SUBMIT_APD_SUCCESS,
  WITHDRAW_APD_SUCCESS
} from '../actions/apd';
import {
  ADD_APD_ITEM,
  ADD_APD_YEAR,
  EDIT_APD,
  REMOVE_APD_ITEM,
  REMOVE_APD_YEAR
} from '../actions/editApd';
import { SAVE_APD_SUCCESS, SELECT_APD } from '../actions/app';
import { defaultAPDYearOptions, generateKey } from '../util';

export const getPatchesToAddYear = (state, year) => {
  const years = [...state.data.years, year].sort();
  const patches = [
    { op: 'replace', path: '/years', value: years },
    {
      op: 'add',
      path: `/incentivePayments/ehAmt/${year}`,
      value: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    {
      op: 'add',
      path: `/incentivePayments/ehCt/${year}`,
      value: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    {
      op: 'add',
      path: `/incentivePayments/epAmt/${year}`,
      value: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    {
      op: 'add',
      path: `/incentivePayments/epCt/${year}`,
      value: { 1: 0, 2: 0, 3: 0, 4: 0 }
    }
  ];

  state.data.activities.forEach((activity, activityIndex) => {
    activity.contractorResources.forEach((_, i) => {
      patches.push({
        op: 'add',
        path: `/activities/${activityIndex}/contractorResources/${i}/hourly/data/${year}`,
        value: contractorDefaultHourly()
      });
      patches.push({
        op: 'add',
        path: `/activities/${activityIndex}/contractorResources/${i}/years/${year}`,
        value: contractorDefaultYear()
      });
    });

    activity.expenses.forEach((_, i) => {
      patches.push({
        op: 'add',
        path: `/activities/${activityIndex}/expenses/${i}/years/${year}`,
        value: expenseDefaultYear()
      });
    });

    activity.statePersonnel.forEach((_, i) => {
      patches.push({
        op: 'add',
        path: `/activities/${activityIndex}/statePersonnel/${i}/years/${year}`,
        value: statePersonDefaultYear()
      });
    });

    patches.push({
      op: 'add',
      path: `/activities/${activityIndex}/costAllocation/${year}`,
      value: costAllocationEntry()
    });

    patches.push({
      op: 'add',
      path: `/activities/${activityIndex}/quarterlyFFP/${year}`,
      value: quarterlyFFPEntry()
    });
  });

  state.data.keyPersonnel.forEach((_, i) => {
    patches.push({
      op: 'add',
      path: `/keyPersonnel/${i}/costs/${year}`,
      value: 0
    });
  });

  return patches;
};

export const getPatchesToRemoveYear = (state, year) => {
  const index = state.data.years.indexOf(year);

  const patches = [
    { op: 'remove', path: `/years/${index}` },
    {
      op: 'remove',
      path: `/incentivePayments/ehAmt/${year}`
    },
    {
      op: 'remove',
      path: `/incentivePayments/ehCt/${year}`
    },
    {
      op: 'remove',
      path: `/incentivePayments/epAmt/${year}`
    },
    {
      op: 'remove',
      path: `/incentivePayments/epCt/${year}`
    }
  ];

  state.data.activities.forEach((activity, activityIndex) => {
    activity.contractorResources.forEach((_, i) => {
      patches.push({
        op: 'remove',
        path: `/activities/${activityIndex}/contractorResources/${i}/hourly/data/${year}`
      });
      patches.push({
        op: 'remove',
        path: `/activities/${activityIndex}/contractorResources/${i}/years/${year}`
      });
    });

    activity.expenses.forEach((_, i) => {
      patches.push({
        op: 'remove',
        path: `/activities/${activityIndex}/expenses/${i}/years/${year}`
      });
    });

    activity.statePersonnel.forEach((_, i) => {
      patches.push({
        op: 'remove',
        path: `/activities/${activityIndex}/statePersonnel/${i}/years/${year}`
      });
    });

    patches.push({
      op: 'remove',
      path: `/activities/${activityIndex}/costAllocation/${year}`
    });

    patches.push({
      op: 'remove',
      path: `/activities/${activityIndex}/quarterlyFFP/${year}`
    });
  });

  state.data.keyPersonnel.forEach((_, i) => {
    patches.push({
      op: 'remove',
      path: `/keyPersonnel/${i}/costs/${year}`
    });
  });

  return patches;
};

const getHumanTimestamp = iso8601 => {
  const d = new Date(iso8601);

  return `${d.toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })}, ${d.toLocaleTimeString('en-us', {
    timeZoneName: 'short',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  })}`;
};

export const getKeyPersonnel = (years = []) => ({
  costs: years.reduce((c, year) => ({ ...c, [year]: 0 }), {}),
  email: '',
  expanded: true,
  hasCosts: false,
  isPrimary: false,
  percentTime: '0',
  name: '',
  position: '',
  key: generateKey(),
  initialCollapsed: false
});

export const getAPDName = ({
  apd: {
    data: { name }
  }
}) => name;

export const getAPDYearRange = ({
  apd: {
    data: { years }
  }
}) =>
  years && years.length
    ? `${years[0]}${years.length > 1 ? `-${years[years.length - 1]}` : ''}`
    : '';

export const getIsAnAPDSelected = ({
  apd: {
    data: { id }
  }
}) => !!id;

export const getPatchesForAddingItem = (state, path) => {
  switch (path) {
    case '/keyPersonnel/-':
      return [{ op: 'add', path, value: getKeyPersonnel(state.data.years) }];
    case '/activities/-':
      return [
        { op: 'add', path, value: newActivity({ years: state.data.years }) }
      ];
    default:
      if (/^\/activities\/\d+\/contractorResources\/-$/.test(path)) {
        return [{ op: 'add', path, value: newContractor(state.data.years) }];
      }
      if (/^\/activities\/\d+\/expenses\/-$/.test(path)) {
        return [{ op: 'add', path, value: newExpense(state.data.years) }];
      }
      if (/^\/activities\/\d+\/goals\/-$/.test(path)) {
        return [{ op: 'add', path, value: newGoal() }];
      }
      if (/^\/activities\/\d+\/schedule\/-$/.test(path)) {
        return [{ op: 'add', path, value: newMilestone() }];
      }
      if (/^\/activities\/\d+\/statePersonnel\/-$/.test(path)) {
        return [{ op: 'add', path, value: newStatePerson(state.data.years) }];
      }
      return [{ op: 'add', path, value: null }];
  }
};

const initialState = {
  data: {},
  byId: {},
  fetching: false,
  loaded: false,
  error: '',
  selectAPDOnLoad: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_APD_ITEM: {
      const patches = getPatchesForAddingItem(state, action.path);
      return {
        ...state,
        data: applyPatch(state.data, patches)
      };
    }

    case ADD_APD_YEAR: {
      const patches = getPatchesToAddYear(state, action.value);
      return { ...state, data: applyPatch(state.data, patches) };
    }

    case EDIT_APD: {
      return {
        ...state,
        data: applyPatch(state.data, [
          {
            op: 'replace',
            path: action.path,
            value: action.value
          }
        ])
      };
    }

    case REMOVE_APD_ITEM: {
      return {
        ...state,
        data: applyPatch(state.data, [
          {
            op: 'remove',
            path: action.path
          }
        ])
      };
    }

    case REMOVE_APD_YEAR: {
      const patches = getPatchesToRemoveYear(state, action.value);
      return { ...state, data: applyPatch(state.data, patches) };
    }

    case CREATE_APD_SUCCESS:
      return u(
        {
          byId: {
            [action.data.id]: {
              ...action.data,
              updated: getHumanTimestamp(action.data.updated),
              yearOptions: defaultAPDYearOptions
            }
          }
        },
        state
      );
    case GET_APD_REQUEST:
      return { ...state, fetching: true, error: '' };
    case GET_APD_SUCCESS: {
      return {
        ...state,
        fetching: false,
        loaded: true,
        byId: action.data.reduce(
          (acc, apd) => ({
            ...acc,
            [apd.id]: { ...apd, updated: getHumanTimestamp(apd.updated) }
          }),
          {}
        )
      };
    }
    case GET_APD_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case SAVE_APD_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.data.id]: {
            ...state.byId[action.data.id],
            updated: getHumanTimestamp(action.data.updated)
          }
        },
        data: {
          ...state.data,
          updated: getHumanTimestamp(action.data.updated)
        }
      };
    case SELECT_APD:
      return {
        ...state,
        data: {
          ...action.apd,
          updated: getHumanTimestamp(action.apd.updated),
          yearOptions: defaultAPDYearOptions
        }
      };
    case SET_SELECT_APD_ON_LOAD:
      return { ...state, selectAPDOnLoad: true };
    case SUBMIT_APD_SUCCESS:
      return u({ data: { status: 'submitted' } }, state);

    case WITHDRAW_APD_SUCCESS:
      return u({ data: { status: 'draft' } }, state);

    default:
      return state;
  }
};

export default reducer;
