import auth, { selectIsLoggedIn } from './auth';

import {
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

describe('auth reducer', () => {
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
    latestActivity: null,
    isLoggingOut: false,
    isSessionEnding: false,
    isExtendingSession: false,
    expiresAt: null
  };

  it('should handle initial state', () => {
    const result = auth(undefined, {});
    result.latestActivity = null;
    expect(result).toEqual(initialState);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(auth(initialState, { type: LOGIN_REQUEST })).toEqual({
      ...initialState,
      fetching: true,
      authenticated: false,
      hasEverLoggedOn: false,
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
    expect(auth(initialState, { type: LOGIN_FAILURE, error: 'foo' })).toEqual({
      ...initialState,
      fetching: false,
      error: 'foo'
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(auth(initialState, { type: LOGIN_SUCCESS })).toEqual({
      ...initialState,
      authenticated: true,
      fetching: false,
      initialCheck: true,
      hasEverLoggedOn: true
    });
  });

  it('should not update user info with LOGIN_SUCCESS', () => {
    expect(
      auth(initialState, { type: LOGIN_SUCCESS, data: 'user data' })
    ).toEqual({
      ...initialState,
      authenticated: true,
      fetching: false,
      initialCheck: true,
      hasEverLoggedOn: true
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(auth(initialState, { type: LOGIN_FAILURE, error: 'foo' })).toEqual({
      ...initialState,
      fetching: false,
      error: 'foo'
    });
  });

  it('should handle LOGOUT_REQUEST', () => {
    expect(auth(initialState, { type: LOGOUT_REQUEST })).toEqual({
      ...initialState,
      isLoggingOut: true,
      initialCheck: true
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(auth(initialState, { type: LOGOUT_SUCCESS })).toEqual({
      ...initialState,
      hasEverLoggedOn: true,
      authenticated: false,
      initialCheck: true,
      latestActivity: null,
      expiresAt: null,
      isSessionEnding: false,
      isExtendingSession: false,
      isLoggingOut: false
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
        hasEverLoggedOn: true,
        error: null,
        fetching: false,
        initialCheck: true,
        isLoggingOut: false,
        factorsList: [],
        mfaEnrollType: '',
        mfaPhoneNumber: '',
        verifyData: {},
        latestActivity: null,
        isSessionEnding: false,
        isExtendingSession: false
      });
    });
  });

  describe('handles setting a state', () => {
    it('should set fetching to false if STATE_ACCESS_REQUIRED', () => {
      expect(auth(initialState, { type: STATE_ACCESS_REQUIRED })).toEqual({
        ...initialState,
        fetching: false
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

  describe('manages the users session token', () => {
    // eslint-disable-next-line no-promise-executor-return
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

    it('should update latestActivity on LATEST_ACTIVITY', async () => {
      const now = new Date().getTime();
      await timeout(10);
      const result = auth(
        {
          ...initialState,
          latestActivity: now
        },
        { type: LATEST_ACTIVITY }
      );
      expect(result.latestActivity).toBeGreaterThan(now);
    });

    it('should update isSessionEnding on SESSION_ENDING_ALERT', () => {
      expect(auth(initialState, { type: SESSION_ENDING_ALERT })).toEqual({
        ...initialState,
        isSessionEnding: true
      });
    });

    it('should update isExtendingSession on REQUEST_SESSION_RENEWAL', () => {
      expect(auth(initialState, { type: REQUEST_SESSION_RENEWAL })).toEqual({
        ...initialState,
        isExtendingSession: true
      });
    });

    it('should update all session values on SESSION_RENEWED', async () => {
      const now = new Date().getTime();
      await timeout(10);
      const result = auth(
        {
          ...initialState,
          latestActivity: now,
          isSessionEnding: true,
          isExtendingSession: true
        },
        { type: SESSION_RENEWED }
      );
      expect(result.latestActivity).toBeGreaterThan(now);
      expect({
        ...result,
        latestActivity: null
      }).toEqual({
        ...initialState,
        latestActivity: null,
        isSessionEnding: false,
        isExtendingSession: false
      });
    });
    it('should update the expiresAt value on UPDATE_EXPIRATION', () => {
      const expiresAt = new Date().getTime() + 60000;
      const result = auth(initialState, {
        type: UPDATE_EXPIRATION,
        data: expiresAt / 1000
      });
      expect(result).toEqual({ ...initialState, expiresAt });
    });
  });
});
