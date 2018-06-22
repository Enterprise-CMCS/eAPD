import u from 'updeep';

import {
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  SELECT_APD,
  UPDATE_APD
} from '../actions/apd';
import {
  INCENTIVE_ENTRIES,
  arrToObj,
  defaultAPDYearOptions,
  defaultAPDYears
} from '../util';

export const initIncentiveData = () =>
  arrToObj(
    INCENTIVE_ENTRIES.map(e => e.id),
    arrToObj(defaultAPDYearOptions, { 1: 0, 2: 0, 3: 0, 4: 0 })
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
  }
});

const initialState = {
  data: {
    id: '',
    years: defaultAPDYears,
    yearOptions: defaultAPDYearOptions,
    overview: '',
    hitNarrative: '',
    hieNarrative: '',
    mmisNarrative: '',
    previousActivitySummary: '',
    previousActivityExpenses: defaultAPDYearOptions.reduce(
      (acc, year) => ({
        ...acc,
        [year - 2]: getPreviousActivityExpense()
      }),
      {}
    ),
    incentivePayments: initIncentiveData(),
    state: {
      id: '--',
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
    }
  },
  byId: {},
  fetching: false,
  loaded: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APD_REQUEST:
      return { ...state, fetching: true, error: '' };
    case GET_APD_SUCCESS: {
      return {
        ...state,
        fetching: false,
        loaded: true,
        byId: action.data.reduce((acc, apd) => {
          // TODO: capture previous activity expenses when it's returned by the API
          const {
            id,
            years,
            programOverview: overview,
            narrativeHIT: hitNarrative,
            narrativeHIE: hieNarrative,
            narrativeMMIS: mmisNarrative,
            previousActivitySummary,
            incentivePayments,
            activities
          } =
            apd || {};

          return {
            ...acc,
            [apd.id]: {
              id,
              overview,
              hitNarrative,
              hieNarrative,
              mmisNarrative,
              years: (years || defaultAPDYears).map(y => `${y}`),
              yearOptions: defaultAPDYearOptions,
              previousActivitySummary: previousActivitySummary || '',
              previousActivityExpenses: defaultAPDYearOptions.reduce(
                (previous, year) => ({
                  ...previous,
                  [year - 2]: getPreviousActivityExpense()
                }),
                {}
              ),
              incentivePayments: incentivePayments || initIncentiveData(),
              state: { ...initialState.data.state }, // TODO: get from API
              activities
            }
          };
        }, {}),
        data: { ...initialState.data }
      };
    }
    case GET_APD_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case SELECT_APD:
      return { ...state, data: { ...action.apd } };
    case UPDATE_APD:
      return u({ data: { ...action.updates } }, state);
    default:
      return state;
  }
};

export default reducer;
