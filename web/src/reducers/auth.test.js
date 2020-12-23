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
  LOGOUT_SUCCESS,
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
    hasEverLoggedOn: false,
    initialCheck: false,
    factorsList: [],
    mfaPhoneNumber: '',
    mfaEnrollType: '',
    verifyData: null,
    selectState: false,
    isLocked: false,
    user: null,
    latestActivity: null,
    isSessionEnding: false,
    isExtendingSession: false,
    expiresAt: null
  };

  it('should handle initial state', () => {
    const result = auth(undefined, {});
    result.latestActivity = null;
    expect(result).toEqual(initialState);
  });

  it('should handle AUTH_CHECK_SUCCESS', () => {
    expect(
      auth(initialState, { type: AUTH_CHECK_SUCCESS, data: 'user info' })
    ).toEqual({
      ...initialState,
      authenticated: true,
      hasEverLoggedOn: true,
      initialCheck: true,
      user: 'user info'
    });
  });

  it('should handle AUTH_CHECK_FAILURE', () => {
    expect(auth(initialState, { type: AUTH_CHECK_FAILURE })).toEqual({
      ...initialState,
      authenticated: false,
      initialCheck: true,
      error: null
    });
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
      hasEverLoggedOn: false,
      isLocked: false,
      fetching: false,
      error: null
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(auth(initialState, { type: LOGOUT_SUCCESS })).toEqual({
      ...initialState,
      hasEverLoggedOn: false,
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
        hasEverLoggedOn: false,
        error: '',
        fetching: false,
        initialCheck: true,
        otpStage: false,
        isLocked: false,
        user: null,
        requestAccess: false,
        requestAccessSuccess: false,
        selectState: false,
        factorsList: '',
        mfaEnrollActivateStage: false,
        mfaEnrollAddPhoneStage: false,
        mfaEnrollStartStage: false,
        mfaEnrollType: '',
        mfaPhoneNumber: '',
        verifyData: null,
        latestActivity: null,
        isSessionEnding: false,
        isExtendingSession: false
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
