import diff from 'lodash.difference';
import u from 'updeep';

import {
  ADD_APD_KEY_PERSON,
  CREATE_APD_SUCCESS,
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  REMOVE_APD_KEY_PERSON,
  SELECT_APD,
  SET_KEY_PERSON_PRIMARY,
  SET_SELECT_APD_ON_LOAD,
  SUBMIT_APD_SUCCESS,
  UPDATE_APD
} from '../actions/apd';
import {
  INCENTIVE_ENTRIES,
  arrToObj,
  defaultAPDYearOptions,
  generateKey
} from '../util';
import { fromAPI } from '../util/serialization/apd';

export const initIncentiveData = () =>
  arrToObj(
    INCENTIVE_ENTRIES.map(e => e.id),
    arrToObj(defaultAPDYearOptions, { 1: 0, 2: 0, 3: 0, 4: 0 })
  );

export const getKeyPersonnel = () => ({
  costs: {},
  email: '',
  hasCosts: false,
  isPrimary: false,
  name: '',
  position: '',
  key: generateKey()
});

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
    case ADD_APD_KEY_PERSON:
      return u(
        {
          data: {
            keyPersonnel: pocs => [...pocs, getKeyPersonnel()]
          }
        },
        state
      );
    case CREATE_APD_SUCCESS:
      return u(
        {
          byId: {
            [action.data.id]: {
              ...fromAPI(action.data),
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
            [apd.id]: {
              ...fromAPI(apd),
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
    case REMOVE_APD_KEY_PERSON:
      return u(
        {
          data: {
            keyPersonnel: people => people.filter((_, i) => i !== action.index)
          }
        },
        state
      );
    case SELECT_APD:
      return { ...state, data: { ...action.apd } };
    case SET_KEY_PERSON_PRIMARY:
      return {
        ...state,
        data: {
          ...state.data,
          keyPersonnel: state.data.keyPersonnel.map((person, i) => ({
            ...person,
            isPrimary: i === action.index
          }))
        }
      };
    case SET_SELECT_APD_ON_LOAD:
      return { ...state, selectAPDOnLoad: true };
    case SUBMIT_APD_SUCCESS:
      return u({ data: { status: 'submitted' } }, state);
    case UPDATE_APD: {
      if (!action.updates.years) {
        return u({ data: { ...action.updates } }, state);
      }

      const { years } = action.updates;
      const { years: yearsPrev } = state.data;

      // this should never happen, but being defensive
      if (years.length === yearsPrev.length) return state;

      const hasNewYear = years.length > yearsPrev.length;
      const yearDelta = (hasNewYear
        ? diff(years, yearsPrev)
        : diff(yearsPrev, years))[0];

      const incentivePayments = JSON.parse(
        JSON.stringify(state.data.incentivePayments)
      );

      Object.keys(incentivePayments).forEach(key => {
        if (!hasNewYear) delete incentivePayments[key][yearDelta];
        else incentivePayments[key][yearDelta] = { 1: 0, 2: 0, 3: 0, 4: 0 };
      });

      const keyPersonnel = JSON.parse(JSON.stringify(state.data.keyPersonnel));
      if (hasNewYear) {
        keyPersonnel.forEach(kp => {
          kp.costs[yearDelta] = 0;
        });
      } else {
        keyPersonnel.forEach(kp => delete kp.costs[yearDelta]);
      }

      // using updeep was not deleting year objects (even
      // though `incentivePayments` was changed), hence using
      // the traditional way to update state here
      return {
        ...state,
        data: {
          ...state.data,
          years,
          incentivePayments,
          keyPersonnel
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
