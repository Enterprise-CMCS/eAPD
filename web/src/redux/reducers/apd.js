import u from 'updeep';
import { apply_patch as applyPatch } from 'jsonpatch';

import {
  contractorDefaultHourly,
  contractorDefaultYear,
  costAllocationEntry,
  costAllocationNarrative,
  expenseDefaultYear,
  newActivity,
  newContractor,
  newExpense,
  newMilestone,
  newOutcome,
  newOutcomeMetric,
  newStatePerson,
  quarterlyFFPEntry,
  statePersonDefaultYear
} from './activities';
import {
  ADD_APD_ITEM,
  ADD_APD_YEAR,
  EDIT_APD,
  EDIT_APD_NAME,
  REMOVE_APD_ITEM,
  REMOVE_APD_YEAR
} from '../actions/editApd';
import {
  CREATE_APD_SUCCESS,
  FETCH_ALL_APDS_FAILURE,
  FETCH_ALL_APDS_REQUEST,
  FETCH_ALL_APDS_SUCCESS,
  RESET,
  SAVE_APD_SUCCESS,
  SELECT_APD_SUCCESS,
  SELECT_APD_FAILURE,
  SET_APD_TO_SELECT_ON_LOAD,
  ADMIN_CHECK_TOGGLE,
  ADMIN_CHECK_COLLAPSE_TOGGLE,
  ADMIN_CHECK_COMPLETE_TOGGLE
} from '../actions/app';
import { generateKey, defaultAPDYearOptions } from '@cms-eapd/common';
import initialAssurances from '../../util/regulations';

export const getPatchesToAddYear = (state, year) => {
  const years = [...state.data.years, year].sort();
  const patches = [
    { op: 'replace', path: '/years', value: years },
    {
      op: 'add',
      path: `/proposedBudget/incentivePayments/ehAmt/${year}`,
      value: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    {
      op: 'add',
      path: `/proposedBudget/incentivePayments/ehCt/${year}`,
      value: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    {
      op: 'add',
      path: `/proposedBudget/incentivePayments/epAmt/${year}`,
      value: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    {
      op: 'add',
      path: `/proposedBudget/incentivePayments/epCt/${year}`,
      value: { 1: 0, 2: 0, 3: 0, 4: 0 }
    }
  ];

  state.data.activities.forEach((activity, activityIndex) => {
    activity.contractorResources.forEach((_, i) => {
      patches.push({
        op: 'add',
        path: `/activities/${activityIndex}/contractorResources/${i}/hourly/${year}`,
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
      path: `/activities/${activityIndex}/costAllocationNarrative/years/${year}`,
      value: costAllocationNarrative()
    });

    patches.push({
      op: 'add',
      path: `/activities/${activityIndex}/quarterlyFFP/${year}`,
      value: quarterlyFFPEntry()
    });
  });

  state.data.keyStatePersonnel.keyPersonnel.forEach((_, i) => {
    patches.push({
      op: 'add',
      path: `/keyStatePersonnel/keyPersonnel/${i}/costs/${year}`,
      value: 0
    });

    patches.push({
      op: 'add',
      path: `/keyStatePersonnel/keyPersonnel/${i}/fte/${year}`,
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
      path: `/proposedBudget/incentivePayments/ehAmt/${year}`
    },
    {
      op: 'remove',
      path: `/proposedBudget/incentivePayments/ehCt/${year}`
    },
    {
      op: 'remove',
      path: `/proposedBudget/incentivePayments/epAmt/${year}`
    },
    {
      op: 'remove',
      path: `/proposedBudget/incentivePayments/epCt/${year}`
    }
  ];

  state.data.activities.forEach((activity, activityIndex) => {
    activity.contractorResources.forEach((_, i) => {
      patches.push({
        op: 'remove',
        path: `/activities/${activityIndex}/contractorResources/${i}/hourly/${year}`
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
      path: `/activities/${activityIndex}/costAllocationNarrative/years/${year}`
    });

    patches.push({
      op: 'remove',
      path: `/activities/${activityIndex}/quarterlyFFP/${year}`
    });
  });

  state.data.keyStatePersonnel.keyPersonnel.forEach((_, i) => {
    patches.push({
      op: 'remove',
      path: `/keyStatePersonnel/keyPersonnel/${i}/costs/${year}`
    });

    patches.push({
      op: 'remove',
      path: `/keyStatePersonnel/keyPersonnel/${i}/fte/${year}`
    });
  });

  return patches;
};

const getHumanDatestamp = iso8601 => {
  const d = new Date(iso8601);

  return `${d.toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })}`;
};

const getHumanTimestamp = iso8601 => {
  const d = new Date(iso8601);

  return `${getHumanDatestamp(iso8601)}, ${d.toLocaleTimeString('en-us', {
    timeZoneName: 'short',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  })}`;
};

export const getKeyPersonnel = (years = [], isPrimary = false) => ({
  costs: years.reduce((c, year) => ({ ...c, [year]: 0 }), {}),
  email: '',
  expanded: true,
  hasCosts: null,
  isPrimary,
  fte: years.reduce((p, year) => ({ ...p, [year]: 0 }), {}),
  name: '',
  position: '',
  key: generateKey()
});

export const getAPDId = ({
  apd: {
    data: { id }
  }
}) => id;

export const getAPDCreation = ({
  apd: {
    data: { created }
  }
}) => created;

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

export const getPatchesForAddingItem = (state, path, key = null) => {
  switch (path) {
    case '/keyStatePersonnel/keyPersonnel/-':
      return [
        {
          op: 'add',
          path,
          value: getKeyPersonnel(
            state.data.years,
            !state.data.keyStatePersonnel?.keyPersonnel ||
              state.data.keyStatePersonnel.keyPersonnel.length === 0
          )
        }
      ];
    case '/activities/-':
      return [
        {
          op: 'add',
          path,
          value: newActivity({
            years: state.data.years,
            key,
            apdType: state.data.apdType
          })
        }
      ];
    default:
      if (/^\/activities\/\d+\/contractorResources\/-$/.test(path)) {
        return [{ op: 'add', path, value: newContractor(state.data.years) }];
      }
      if (/^\/activities\/\d+\/expenses\/-$/.test(path)) {
        return [{ op: 'add', path, value: newExpense(state.data.years) }];
      }
      if (/^\/activities\/\d+\/outcomes\/-$/.test(path)) {
        return [{ op: 'add', path, value: newOutcome() }];
      }
      if (/^\/activities\/\d+\/outcomes\/\d+\/metrics\/-$/.test(path)) {
        return [{ op: 'add', path, value: newOutcomeMetric() }];
      }
      if (/^\/activities\/\d+\/milestones\/-$/.test(path)) {
        return [{ op: 'add', path, value: newMilestone() }];
      }
      if (/^\/activities\/\d+\/statePersonnel\/-$/.test(path)) {
        return [{ op: 'add', path, value: newStatePerson(state.data.years) }];
      }
      return [{ op: 'add', path, value: null }];
  }
};

const getAssurancesAndCompliances = assurancesAndCompliances =>
  Object.values(assurancesAndCompliances).every(regs => regs.length > 0)
    ? assurancesAndCompliances
    : initialAssurances;

const initialState = {
  data: {},
  byId: {},
  fetching: false,
  loaded: false,
  error: '',
  selectAPDOnLoad: false,
  adminCheck: {
    errors: [],
    enabled: false,
    collapsed: false,
    complete: false
  }
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_APD_ITEM: {
      const patches = getPatchesForAddingItem(state, action.path, action.key);
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

    case EDIT_APD_NAME: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            name: action.name
          }
        }
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

    case ADMIN_CHECK_TOGGLE: {
      return {
        ...state,
        adminCheck: {
          ...state.adminCheck,
          enabled: action.data
        }
      };
    }

    case ADMIN_CHECK_COLLAPSE_TOGGLE: {
      return {
        ...state,
        adminCheck: {
          ...state.adminCheck,
          collapsed: action.data
        }
      };
    }

    case ADMIN_CHECK_COMPLETE_TOGGLE: {
      return {
        ...state,
        adminCheck: {
          ...state.adminCheck,
          complete: action.data
        }
      };
    }

    case CREATE_APD_SUCCESS:
      return u(
        {
          byId: {
            [action.data.id]: {
              ...action.data,
              created: getHumanDatestamp(action.data.created),
              updated: getHumanTimestamp(action.data.updated),
              yearOptions: defaultAPDYearOptions()
            }
          }
        },
        state
      );
    case FETCH_ALL_APDS_REQUEST:
      return { ...state, fetching: true, error: '' };
    case FETCH_ALL_APDS_SUCCESS: {
      return {
        ...state,
        fetching: false,
        loaded: true,
        byId: action.data.reduce(
          (acc, apd) => ({
            ...acc,
            [apd.id]: {
              ...apd,
              created: getHumanDatestamp(apd.created),
              updated: getHumanTimestamp(apd.updated)
            }
          }),
          {}
        )
      };
    }

    case FETCH_ALL_APDS_FAILURE:
      return { ...state, fetching: false, error: action.error };

    case SAVE_APD_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.data.apd.id]: {
            ...state.byId[action.data.apd.id],
            updated: getHumanTimestamp(action.data.apd.updated)
          }
        },
        data: {
          ...state.data,
          created: getHumanDatestamp(action.data.apd.created),
          updated: getHumanTimestamp(action.data.apd.updated)
        },
        adminCheck: {
          ...state.adminCheck,
          errors: action.data.adminCheck
        }
      };

    case RESET:
      return { ...state, data: {} };

    case SELECT_APD_SUCCESS: {
      return {
        ...state,
        data: {
          ...action.data.apd,
          created: getHumanDatestamp(action.data.apd.created),
          updated: getHumanTimestamp(action.data.apd.updated),
          keyStatePersonnel: {
            ...action.data.apd.keyStatePersonnel,
            keyPersonnel: action.data.apd.keyStatePersonnel.keyPersonnel.map(
              kp => ({
                ...kp,
                key: generateKey()
              })
            )
          },
          activities: action.data.apd.activities.map(
            ({
              activityId,
              milestones,
              outcomes,
              statePersonnel,
              expenses,
              contractorResources,
              ...activity
            }) => ({
              ...activity,
              key: activityId,
              activityId,
              milestones: milestones.map(milestone => ({
                ...milestone,
                key: generateKey()
              })),
              outcomes: outcomes.map(({ metrics = [], ...outcome }) => ({
                ...outcome,
                metrics: metrics.map(metric => ({
                  ...metric,
                  key: generateKey()
                })),
                key: generateKey()
              })),
              statePersonnel: statePersonnel.map(person => ({
                ...person,
                key: generateKey()
              })),
              expenses: expenses.map(expense => ({
                ...expense,
                key: generateKey()
              })),
              contractorResources: contractorResources.map(contractor => ({
                ...contractor,
                key: generateKey()
              }))
            })
          ),
          assurancesAndCompliances: getAssurancesAndCompliances(
            action.data.apd.assurancesAndCompliances
          )
        },
        adminCheck: {
          ...state.adminCheck,
          errors: action.data.adminCheck
        }
      };
    }
    case SELECT_APD_FAILURE:
      return { ...state, data: {}, fetching: false, error: action.data };
    case SET_APD_TO_SELECT_ON_LOAD:
      return { ...state, selectAPDOnLoad: true };

    default:
      return state;
  }
};

export default reducer;
