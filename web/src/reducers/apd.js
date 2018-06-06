import u from 'updeep';

import {
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  UPDATE_APD
} from '../actions/apd';

const thisFFY = (() => {
  const year = new Date().getFullYear();

  // Federal fiscal year starts October 1,
  // but Javascript months start with 0 for
  // some reason, so October is month 9.
  if (new Date().getMonth() > 8) {
    return year + 1;
  }
  return year;
})();

// The UI turns the years into strings, so let's
// just make them strings in the state as well;
// that simplifies things
const threeYears = [thisFFY, thisFFY + 1, thisFFY + 2].map(y => `${y}`);
const firstTwoYears = threeYears.slice(0, 2);

const initialState = {
  data: {
    id: '',
    years: firstTwoYears,
    yearOptions: threeYears,
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
          years: years.map(y => `${y}`) || firstTwoYears,
          yearOptions: threeYears,
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
