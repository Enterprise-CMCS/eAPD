import {
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
  LOGIN_REQUEST,
  LOGIN_OTP_STAGE,
  LOGIN_MFA_REQUEST,
  LOGIN_MFA_ENROLL,
  LOGIN_MFA_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOCKED_OUT,
  RESET_LOCKED_OUT,
  LOGOUT_SUCCESS
} from '../actions/auth';

const initialState = {
  otpStage: false,
  authenticated: false,
  error: '',
  fetching: false,
  hasEverLoggedOn: false,
  initialCheck: false,
  mfaEnrolled: false,
  mfaType: '',
  isLocked: false,
  user: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHECK_SUCCESS:
      return {
        ...state,
        otpStage: false,
        authenticated: true,
        hasEverLoggedOn: true,
        initialCheck: true,
        user: action.data
      };
    case AUTH_CHECK_FAILURE:
      return {
        ...state,
        initialCheck: true,
        otpStage: false,
        authenticated: false
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
        otpStage: false,
        authenticated: false,
        error: ''
      };
    case LOGIN_OTP_STAGE:
      return {
        ...state,
        fetching: false,
        otpStage: true,
        authenticated: false,
        error: '',
        mfaType: action.data
      };
    case LOGIN_MFA_REQUEST:
      return {
        ...state,
        fetching: true,
        otpStage: true,
        authenticated: false,
        error: ''
      };
    case LOGIN_MFA_ENROLL:
      return {
        ...state,
        fetching: false,
        otpStage: true,
        authenticated: false,
        mfaEnrolled: false,
        mfaTypeSelected: '',
        error: ''
      };
    case LOGIN_MFA_FAILURE:
      return { 
        ...state, 
        fetching: false, 
        error: action.error 
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        otpStage: false,
        authenticated: true,
        fetching: false,
        hasEverLoggedOn: true,
        user: action.data
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        otpStage: false,
        fetching: false,
        error: action.error
      };
    case LOCKED_OUT:
      return {
        ...state,
        isLocked: true,
        fetching: false,
        error: ''
      };     
    case RESET_LOCKED_OUT:
      return {
        ...state,
        isLocked: false,
        fetching: false,
        error: ''
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        otpStage: false,
        hasEverLoggedOn: state.hasEverLoggedOn,
        initialCheck: state.initialCheck
      };
    default:
      return state;
  }
};

export default auth;

export const selectIsLoggedIn = state => state.auth.authenticated;
