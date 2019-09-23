import diff from 'lodash.difference';
import u from 'updeep';
import { apply_patch as applyPatch } from 'jsonpatch';

import {
  ADD_APD_KEY_PERSON,
  CREATE_APD_SUCCESS,
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  REMOVE_APD_KEY_PERSON,
  SELECT_APD,
  SET_SELECT_APD_ON_LOAD,
  SUBMIT_APD_SUCCESS,
  UPDATE_APD,
  WITHDRAW_APD_SUCCESS,
  SAVE_APD_SUCCESS
} from '../actions/apd';
import { EDIT_APD } from '../actions/editApd';
import { defaultAPDYearOptions, generateKey } from '../util';

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

export const getKeyPersonnel = () => ({
  costs: {},
  email: '',
  expanded: true,
  hasCosts: false,
  isPrimary: false,
  percentTime: 0,
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

export const getAPDFirstYear = ({
  apd: {
    data: { years }
  }
}) => (years && years.length ? years[0] : '');

export const getIsAnAPDSelected = ({
  apd: {
    data: { id }
  }
}) => !!id;

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
            keyPersonnel: people =>
              people.filter(({ key }) => key !== action.key)
          }
        },
        state
      );
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

    case WITHDRAW_APD_SUCCESS:
      return u({ data: { status: 'draft' } }, state);

    default:
      return state;
  }
};

export default reducer;
