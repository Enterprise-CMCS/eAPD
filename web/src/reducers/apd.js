import u from 'updeep';

import {
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  UPDATE_APD
} from '../actions/apd';
import { YEAR_OPTIONS } from '../util';

const firstTwoYears = YEAR_OPTIONS.slice(0, 2);

const initialState = {
  data: {
    id: '',
    years: firstTwoYears,
    overview: '',
    hitNarrative: '',
    hieNarrative: '',
    mmisNarrative: '',
    previousActivitySummary: ''
  },
  fetching: false,
  loaded: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APD_REQUEST:
      return { ...state, fetching: true, error: '' };
    case GET_APD_SUCCESS: {
      const {
        id,
        years,
        programOverview: overview,
        narrativeHIT: hitNarrative,
        narrativeHIE: hieNarrative,
        narrativeMMIS: mmisNarrative,
        previousActivitySummary
      } = action.data;

      return {
        ...state,
        fetching: false,
        loaded: true,
        data: {
          id,
          overview,
          hitNarrative,
          hieNarrative,
          mmisNarrative,
          years: years || firstTwoYears,
          previousActivitySummary: previousActivitySummary || ''
        }
      };
    }
    case GET_APD_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case UPDATE_APD:
      return u({ data: { ...action.updates } }, state);
    default:
      return state;
  }
};

export default reducer;
