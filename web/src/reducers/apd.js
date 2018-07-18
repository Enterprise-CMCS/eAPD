import u from 'updeep';

import {
  ADD_APD_POC,
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  REMOVE_APD_POC,
  SELECT_APD,
  UPDATE_APD
} from '../actions/apd';
import {
  INCENTIVE_ENTRIES,
  arrToObj,
  defaultAPDYearOptions,
  defaultAPDYears
} from '../util';
import { fromAPI } from '../util/serialization/apd';

import assurancesList from '../data/assurancesAndCompliance.yaml';

export const initIncentiveData = () =>
  arrToObj(
    INCENTIVE_ENTRIES.map(e => e.id),
    arrToObj(defaultAPDYearOptions, { 1: 0, 2: 0, 3: 0, 4: 0 })
  );

export const initialAssurances = Object.entries(assurancesList).reduce(
  (acc, [name, regulations]) => ({
    ...acc,
    [name]: Object.keys(regulations).map(reg => ({
      title: reg,
      checked: false,
      explanation: ''
    }))
  }),
  {}
);

export const getPreviousActivityExpense = () => ({
  hie: {
    federalActual: 0,
    federalApproved: 0,
    stateActual: 0,
    stateApproved: 0
  },
  hit: {
    federalActual: 0,
    federalApproved: 0,
    stateActual: 0,
    stateApproved: 0
  },
  mmis: {
    federal90Actual: 0,
    federal90Approved: 0,
    federal75Actual: 0,
    federal75Approved: 0,
    federal50Actual: 0,
    federal50Approved: 0,
    state10Actual: 0,
    state10Approved: 0,
    state25Actual: 0,
    state25Approved: 0,
    state50Actual: 0,
    state50Approved: 0
  }
});

export const getPointOfContact = () => ({ name: '', position: '', email: '' });

const initialState = {
  data: {
    id: '',
    years: defaultAPDYears,
    yearOptions: defaultAPDYearOptions,
    overview: '',
    hitNarrative: '',
    hieNarrative: '',
    mmisNarrative: '',
    pointsOfContact: [getPointOfContact()],
    previousActivitySummary: '',
    previousActivityExpenses: defaultAPDYearOptions.reduce(
      (acc, year) => ({
        ...acc,
        [year - 2]: getPreviousActivityExpense()
      }),
      {}
    ),
    incentivePayments: initIncentiveData(),
    stateProfile: {
      medicaidDirector: {
        name: '',
        email: '',
        phone: ''
      },
      medicaidOffice: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      }
    },
    assurancesAndCompliance: { ...initialAssurances }
  },
  byId: {},
  fetching: false,
  loaded: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_APD_POC:
      return u(
        {
          data: {
            pointsOfContact: pocs => [...pocs, getPointOfContact()]
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
            [apd.id]: {
              ...fromAPI(apd, {
                assurancesAndCompliance: initialAssurances,
                incentivePayments: initIncentiveData(),
                previousActivityExpenses: defaultAPDYearOptions.reduce(
                  (previous, year) => ({
                    ...previous,
                    [year - 2]: getPreviousActivityExpense()
                  }),
                  {}
                ),
                previousActivitySummary: '',
                years: defaultAPDYears
              }),
              yearOptions: defaultAPDYearOptions
            }
          }),
          {}
        ),
        data: { ...initialState.data }
      };
    }
    case GET_APD_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case REMOVE_APD_POC:
      return u(
        {
          data: {
            pointsOfContact: pocs => pocs.filter((_, i) => i !== action.index)
          }
        },
        state
      );
    case SELECT_APD:
      return { ...state, data: { ...action.apd } };
    case UPDATE_APD:
      return u({ data: { ...action.updates } }, state);
    default:
      return state;
  }
};

export default reducer;
