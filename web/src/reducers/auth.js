import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions/auth';

const initialState = {
  fetching: false,
  authenticated: true,
  error: ''
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, fetching: true, authenticated: false, error: '' };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, authenticated: true };
    case LOGIN_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case LOGOUT_SUCCESS:
      return { ...initialState };
    default:
      return state;
  }
};

export default auth;
