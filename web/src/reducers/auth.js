import {
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions/auth';

const initialState = {
  authenticated: false,
  error: '',
  fetching: false,
  hasEverLoggedOn: false,
  initialCheck: false,
  user: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHECK_SUCCESS:
      return {
        ...state,
        authenticated: true,
        hasEverLoggedOn: true,
        initialCheck: true,
        user: action.data
      };
    case AUTH_CHECK_FAILURE:
      return { ...state, initialCheck: true, authenticated: false };
    case LOGIN_REQUEST:
      return { ...state, fetching: true, authenticated: false, error: '' };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        fetching: false,
        hasEverLoggedOn: true,
        user: action.data
      };
    case LOGIN_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        hasEverLoggedOn: state.hasEverLoggedOn,
        initialCheck: state.initialCheck
      };
    default:
      return state;
  }
};

export default auth;

export const selectIsLoggedIn = state => state.auth.authenticated;
