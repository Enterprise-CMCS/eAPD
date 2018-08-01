import u from 'updeep';

import {
  ADD_APD_POC,
  CREATE_APD_SUCCESS,
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  REMOVE_APD_POC,
  SELECT_APD,
  UPDATE_APD
} from '../actions/apd';
import { INCENTIVE_ENTRIES, arrToObj, defaultAPDYearOptions } from '../util';
import { fromAPI } from '../util/serialization/apd';

export const initIncentiveData = () =>
  arrToObj(
    INCENTIVE_ENTRIES.map(e => e.id),
    arrToObj(defaultAPDYearOptions, { 1: 0, 2: 0, 3: 0, 4: 0 })
  );

export const getPointOfContact = () => ({ name: '', position: '', email: '' });

const initialState = {
  data: {},
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
