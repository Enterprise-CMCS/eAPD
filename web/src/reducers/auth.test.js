import auth, { selectIsLoggedIn } from './auth';
import {
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
  LOGIN_REQUEST,
  LOGIN_OTP_STAGE,
  LOGIN_MFA_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_MFA_FAILURE,
  LOGOUT_SUCCESS,
  LOCKED_OUT,
  RESET_LOCKED_OUT
} from '../actions/auth';

describe('auth reducer', () => {
  const initialState = {
    authenticated: false,
    isLocked: false,
    error: '',
    factorsList: '',
    fetching: false,
    hasEverLoggedOn: false,
    initialCheck: false,
    mfaEnrollActivateStage: false,
    mfaEnrollAddPhoneStage: false,
    mfaEnrollStartStage: false,
    mfaEnrollType: '',
    mfaPhoneNumber: '',
    otpStage: false,
    user: null,
    verifyData: null
  };

  it('should handle initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it('should handle AUTH_CHECK_SUCCESS', () => {
    expect(
      auth(initialState, { type: AUTH_CHECK_SUCCESS, data: 'user info' })
    ).toEqual({
      ...initialState,
      otpStage: false,
      authenticated: true,
      hasEverLoggedOn: true,
      initialCheck: true,
      user: 'user info'
    });
  });

  it('should handle AUTH_CHECK_FAILURE', () => {
    expect(auth(initialState, { type: AUTH_CHECK_FAILURE })).toEqual({
      ...initialState,
      initialCheck: true,
      otpStage: false,
      authenticated: false
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(auth(initialState, { type: LOGIN_REQUEST })).toEqual({
      ...initialState,
      fetching: true,
      otpStage: false,
      authenticated: false,
      error: ''
    });
  });

  it('should handle LOGIN_OTP_STAGE', () => {
    expect(auth(initialState, { type: LOGIN_OTP_STAGE })).toEqual({
      ...initialState,
      fetching: false,
      otpStage: true,
      authenticated: false,
      error: ''
    });
  });

  it('should handle LOGIN_MFA_REQUEST', () => {
    expect(auth(initialState, { type: LOGIN_MFA_REQUEST })).toEqual({
      ...initialState,
      fetching: true,
      otpStage: true,
      authenticated: false,
      error: ''
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      auth(initialState, { type: LOGIN_SUCCESS, data: 'user goes here' })
    ).toEqual({
      ...initialState,
      otpStage: false,
      authenticated: true,
      fetching: false,
      hasEverLoggedOn: true,
      user: 'user goes here'
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(auth(initialState, { type: LOGIN_FAILURE, error: 'foo' })).toEqual({
      ...initialState,
      otpStage: false,
      fetching: false,
      error: 'foo'
    });
  });

  it('should handle LOGIN_MFA_FAILURE', () => {
    expect(
      auth(initialState, { type: LOGIN_MFA_FAILURE, error: 'foo' })
    ).toEqual({
      ...initialState,
      fetching: false,
      error: 'foo'
    });
  });

  it('should handle LOCKED_OUT', () => {
    expect(auth(initialState, { type: LOCKED_OUT })).toEqual({
      ...initialState,
      isLocked: true
    });
  });

  it('should handle RESET_LOCKED_OUT', () => {
    expect(auth(initialState, { type: RESET_LOCKED_OUT })).toEqual({
      ...initialState,
      isLocked: false
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(auth(initialState, { type: LOGOUT_SUCCESS })).toEqual({
      ...initialState,
      otpStage: false,
      hasEverLoggedOn: false,
      initialCheck: false
    });
  });

  describe('when user is already logged in', () => {
    it('should reset auth after LOGOUT_SUCCESS', () => {
      const state = {
        authenticated: true,
        initialCheck: true,
        hasEverLoggedOn: true
      };

      expect(auth(state, { type: LOGOUT_SUCCESS })).toEqual({
        authenticated: false,
        error: '',
        fetching: false,
        hasEverLoggedOn: true,
        initialCheck: true,
        otpStage: false,
        mfaType: '',
        isLocked: false,
        user: null
      });
    });
  });

  it('selects the current logged-in state', () => {
    expect(
      selectIsLoggedIn({
        auth: { authenticated: 'this is the authenticated state value' }
      })
    ).toEqual('this is the authenticated state value');
  });
});
