import auth from './auth';
import {
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions/auth';

describe('auth reducer', () => {
  const initialState = {
    authenticated: false,
    error: '',
    fetching: false,
    hasEverLoggedOn: false,
    initialCheck: false,
    user: null
  };

  it('should handle initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it('should handle AUTH_CHECK_SUCCESS', () => {
    expect(
      auth(initialState, { type: AUTH_CHECK_SUCCESS, data: 'user info' })
    ).toEqual({
      authenticated: true,
      error: '',
      fetching: false,
      hasEverLoggedOn: true,
      initialCheck: true,
      user: 'user info'
    });
  });

  it('should handle AUTH_CHECK_FAILURE', () => {
    expect(auth(initialState, { type: AUTH_CHECK_FAILURE })).toEqual({
      authenticated: false,
      error: '',
      fetching: false,
      hasEverLoggedOn: false,
      initialCheck: true,
      user: null
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(auth(initialState, { type: LOGIN_REQUEST })).toEqual({
      authenticated: false,
      error: '',
      fetching: true,
      hasEverLoggedOn: false,
      initialCheck: false,
      user: null
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      auth(initialState, { type: LOGIN_SUCCESS, data: 'user goes here' })
    ).toEqual({
      authenticated: true,
      error: '',
      fetching: false,
      hasEverLoggedOn: true,
      initialCheck: false,
      user: 'user goes here'
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(auth(initialState, { type: LOGIN_FAILURE, error: 'foo' })).toEqual({
      authenticated: false,
      error: 'foo',
      fetching: false,
      hasEverLoggedOn: false,
      initialCheck: false,
      user: null
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(auth(initialState, { type: LOGOUT_SUCCESS })).toEqual({
      authenticated: false,
      error: '',
      fetching: false,
      hasEverLoggedOn: false,
      initialCheck: false,
      user: null
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
        user: null
      });
    });
  });
});
