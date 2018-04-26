import u from 'updeep';

import {
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  UPDATE_APD
} from '../actions/apd';

const initialState = {
  data: {
    id: '',
    years: ['2018'],
    overview: '',
    hitNarrative: '',
    hieNarrative: '',
    mmisNarrative: ''
  },
  fetching: false,
  loaded: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APD_REQUEST:
      return { ...state, fetching: true, error: '' };
    case GET_APD_SUCCESS:
      return {
        ...state,
        fetching: false,
        loaded: true,
        data: { ...action.data[0] }
      };
    case GET_APD_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case UPDATE_APD:
      return u({ data: { ...action.updates } }, state);
    default:
      return state;
  }
};

export default reducer;
