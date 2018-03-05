import {
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions/auth';

const initialState = {
  initialCheck: false,
  fetching: false,
  authenticated: false,
  error: ''
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHECK_SUCCESS:
      return { ...state, initialCheck: true, authenticated: true };
    case AUTH_CHECK_FAILURE:
      return { ...state, initialCheck: true, authenticated: false };
    case LOGIN_REQUEST:
      return { ...state, fetching: true, authenticated: false, error: '' };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, authenticated: true };
    case LOGIN_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case LOGOUT_SUCCESS:
      return { ...initialState, initialCheck: state.initialCheck };
    default:
      return state;
  }
};

export default auth;
