import {
  AUTH_CHECK_REQUEST,
  LOGIN_REQUEST,
  LOGIN_OTP_STAGE,
  LOGIN_MFA_REQUEST,
  LOGIN_MFA_ENROLL_START,
  LOGIN_MFA_ENROLL_ADD_PHONE,
  LOGIN_MFA_ENROLL_ACTIVATE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  STATE_ACCESS_REQUIRED,
  LATEST_ACTIVITY,
  SESSION_ENDING_ALERT,
  REQUEST_SESSION_RENEWAL,
  SESSION_RENEWED,
  UPDATE_EXPIRATION
} from '../actions/auth';

const initialState = {
  authenticated: false,
  error: null,
  fetching: false,
  initialCheck: false,
  hasEverLoggedOn: false,
  factorsList: [],
  mfaPhoneNumber: '',
  mfaEnrollType: '',
  verifyData: {},
  latestActivity: new Date().getTime(),
  isLoggingOut: false,
  isSessionEnding: false,
  isExtendingSession: false,
  expiresAt: null
};

// eslint-disable-next-line default-param-last
const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHECK_REQUEST:
      return {
        ...state,
        initialCheck: true
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
        authenticated: false,
        error: null
      };
    case LOGIN_OTP_STAGE:
      return {
        ...state,
        fetching: false,
        authenticated: false,
        error: null
      };
    case LOGIN_MFA_REQUEST:
      return {
        ...state,
        fetching: true,
        authenticated: false,
        error: null
      };
    case LOGIN_MFA_ENROLL_START:
      return {
        ...state,
        fetching: false,
        mfaPhoneNumber: action.data.phoneNumber,
        factorsList: action.data.factors,
        error: null
      };
    case LOGIN_MFA_ENROLL_ADD_PHONE:
      return {
        ...state,
        fetching: false,
        mfaEnrollType: action.data,
        error: null
      };
    case LOGIN_MFA_ENROLL_ACTIVATE:
      return {
        ...state,
        fetching: false,
        mfaEnrollType: action.data.mfaEnrollType,
        verifyData: action.data.activationData,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        fetching: false,
        hasEverLoggedOn: true,
        initialCheck: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        initialCheck: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        authenticated: false,
        error: null,
        hasEverLoggedOn: true,
        initialCheck: true,
        latestActivity: null,
        expiresAt: null,
        isSessionEnding: false,
        isExtendingSession: false,
        isLoggingOut: false
      };
    case STATE_ACCESS_REQUIRED:
      return {
        ...state,
        fetching: false
      };
    case LATEST_ACTIVITY:
      return {
        ...state,
        latestActivity: new Date().getTime()
      };
    case SESSION_ENDING_ALERT:
      return {
        ...state,
        isSessionEnding: true
      };
    case REQUEST_SESSION_RENEWAL:
      return {
        ...state,
        isExtendingSession: true
      };
    case SESSION_RENEWED:
      return {
        ...state,
        isSessionEnding: false,
        isExtendingSession: false,
        latestActivity: new Date().getTime()
      };
    case UPDATE_EXPIRATION:
      return {
        ...state,
        expiresAt: action.data * 1000 // convert to milliseconds
      };
    default:
      return state;
  }
};

export default auth;

export const selectIsLoggedIn = state => state.auth.authenticated;
