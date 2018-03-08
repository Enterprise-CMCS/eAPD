import {
  GET_STATE_REQUEST,
  GET_STATE_SUCCESS,
  GET_STATE_FAILURE,
  UPDATE_STATE_REQUEST,
  UPDATE_STATE_SUCCESS,
  UPDATE_STATE_FAILURE
} from '../actions/state';

const initialState = {
  data: {
    id: '',
    name: '',
    medicaid_office: null,
    program_benefits: '',
    program_vision: '',
    state_pocs: []
  },
  fetching: false,
  loaded: false,
  error: ''
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATE_REQUEST:
      return { ...state, fetching: true, error: '' };
    case GET_STATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        loaded: true,
        data: { ...action.data }
      };
    case GET_STATE_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case UPDATE_STATE_REQUEST:
      return { ...state, fetching: true, error: '' };
    case UPDATE_STATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        loaded: true,
        data: { ...state.data, ...action.data }
      };
    case UPDATE_STATE_FAILURE:
      return { ...state, fetching: false, error: action.error };
    default:
      return state;
  }
};

export default stateReducer;
