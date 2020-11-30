import auth, { selectIsLoggedIn } from './auth';

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

describe('auth reducer', () => {
  const initialState = {
    authenticated: false,
    error: null,
    fetching: false,
    hasEverLoggedOn: false,
    factorsList: '',
    mfaPhoneNumber: '',
    mfaEnrollType: '',
    verifyData: null,
    selectState: false,
    isLocked: false,
    user: null
  };

  it('should handle initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it('should handle AUTH_CHECK_SUCCESS', () => {
    expect(
      auth(initialState, { type: AUTH_CHECK_SUCCESS, data: 'user info' })
    ).toEqual({
      ...initialState,
      authenticated: true,
      hasEverLoggedOn: true,
      user: 'user info'
    });
  });

  it('should handle AUTH_CHECK_FAILURE', () => {
    expect(
      auth(initialState, { type: AUTH_CHECK_FAILURE, error: 'blah' })
    ).toEqual({
      ...initialState,
      authenticated: false,
      error: 'blah'
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(auth(initialState, { type: LOGIN_REQUEST })).toEqual({
      ...initialState,
      fetching: true,
      authenticated: false,
      hasEverLoggedOn: true,
      error: null
    });
  });

  it('should handle LOGIN_OTP_STAGE', () => {
    expect(auth(initialState, { type: LOGIN_OTP_STAGE })).toEqual({
      ...initialState,
      fetching: false,
      authenticated: false,
      error: null
    });
  });

  it('should handle LOGIN_MFA_REQUEST', () => {
    expect(auth(initialState, { type: LOGIN_MFA_REQUEST })).toEqual({
      ...initialState,
      fetching: true,
      authenticated: false,
      error: null
    });
  });

  it('should handle LOGIN_MFA_ENROLL_START', () => {
    expect(
      auth(initialState, {
        type: LOGIN_MFA_ENROLL_START,
        data: { phoneNumber: '4108675309', factors: [{}] }
      })
    ).toEqual({
      ...initialState,
      fetching: false,
      mfaPhoneNumber: '4108675309',
      factorsList: [{}],
      error: null
    });
  });

  it('should handle LOGIN_MFA_ENROLL_ADD_PHONE', () => {
    expect(
      auth(initialState, { type: LOGIN_MFA_ENROLL_ADD_PHONE, data: 'Call' })
    ).toEqual({
      ...initialState,
      fetching: false,
      mfaEnrollType: 'Call',
      error: null
    });
  });

  it('should handle LOGIN_MFA_ENROLL_ACTIVATE', () => {
    expect(
      auth(initialState, {
        type: LOGIN_MFA_ENROLL_ACTIVATE,
        data: { mfaEnrollType: 'Call', activationData: 'bar' }
      })
    ).toEqual({
      ...initialState,
      fetching: false,
      mfaEnrollType: 'Call',
      verifyData: 'bar',
      error: null
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

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      auth(initialState, { type: LOGIN_SUCCESS, data: 'user goes here' })
    ).toEqual({
      ...initialState,
      authenticated: true,
      fetching: false,
      hasEverLoggedOn: true,
      user: 'user goes here'
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(auth(initialState, { type: LOGIN_FAILURE, error: 'foo' })).toEqual({
      ...initialState,
      fetching: false,
      error: 'foo'
    });
  });

  it('should handle LOCKED_OUT', () => {
    expect(auth(initialState, { type: LOCKED_OUT })).toEqual({
      ...initialState,
      isLocked: true,
      fetching: false,
      error: null
    });
  });

  it('should handle RESET_LOCKED_OUT', () => {
    expect(auth(initialState, { type: RESET_LOCKED_OUT })).toEqual({
      ...initialState,
      isLocked: false,
      fetching: false,
      error: null
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(auth(initialState, { type: LOGOUT_SUCCESS })).toEqual({
      ...initialState,
      hasEverLoggedOn: true,
      authenticated: false
    });
  });

  describe('when user is already logged in', () => {
    it('should reset auth after LOGOUT_SUCCESS', () => {
      const state = {
        authenticated: true,
        hasEverLoggedOn: true
      };

      expect(auth(state, { type: LOGOUT_SUCCESS })).toEqual({
        ...initialState,
        authenticated: false,
        hasEverLoggedOn: true
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
