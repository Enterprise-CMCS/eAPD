import {
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
  LOGIN_REQUEST,
  LOGIN_OTP_STAGE,
  LOGIN_MFA_REQUEST,
  LOGIN_MFA_ENROLL_START,
  LOGIN_MFA_ENROLL_ADD_PHONE,
  LOGIN_MFA_ENROLL_ACTIVATE,
  LOGIN_MFA_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOCKED_OUT,
  RESET_LOCKED_OUT,
  LOGOUT_SUCCESS
} from '../actions/auth';

const initialState = {
  authenticated: false,
  error: '',
  fetching: false,
  hasEverLoggedOn: false,
  otpStage: false,
  initialCheck: false,
  factorsList: '',
  mfaEnrollStartStage: false,
  mfaEnrollAddPhoneStage: false,
  mfaEnrollActivateStage: false,
  mfaPhoneNumber: '',
  mfaEnrollType: '',
  verifyData: null,
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
        error: ''
      };
    case LOGIN_MFA_REQUEST:
      return {
        ...state,
        fetching: true,
        otpStage: true,
        authenticated: false,
        error: ''
      };
    case LOGIN_MFA_ENROLL_START:
      return {
        ...state,
        fetching: false,
        mfaEnrollStartStage: true,
        mfaPhoneNumber: action.data.phoneNumber,
        factorsList: action.data.factors,
        error: ''
      };
    case LOGIN_MFA_ENROLL_ADD_PHONE:
      return {
        ...state,
        fetching: false,
        mfaEnrollStartStage: false,
        mfaEnrollAddPhoneStage: true,
        mfaEnrollType: action.data,
        error: ''
      };
    case LOGIN_MFA_ENROLL_ACTIVATE:
      return {
        ...state,
        fetching: false,
        mfaEnrollStartStage: false,
        mfaEnrollAddPhoneStage: false,
        mfaEnrollActivateStage: true,
        mfaEnrollType: action.data.mfaEnrollType,
        verifyData: action.data.activationData,
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
