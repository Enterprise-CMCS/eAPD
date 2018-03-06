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
    initialCheck: false,
    authenticated: false,
    error: '',
    fetching: false
  };

  it('should handle initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it('should handle AUTH_CHECK_SUCCESS', () => {
    expect(auth(initialState, { type: AUTH_CHECK_SUCCESS })).toEqual({
      initialCheck: true,
      authenticated: true,
      error: '',
      fetching: false
    });
  });

  it('should handle AUTH_CHECK_FAILURE', () => {
    expect(auth(initialState, { type: AUTH_CHECK_FAILURE })).toEqual({
      initialCheck: true,
      authenticated: false,
      error: '',
      fetching: false
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(auth(initialState, { type: LOGIN_REQUEST })).toEqual({
      initialCheck: false,
      authenticated: false,
      error: '',
      fetching: true
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(auth(initialState, { type: LOGIN_SUCCESS })).toEqual({
      initialCheck: false,
      authenticated: true,
      error: '',
      fetching: false
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(auth(initialState, { type: LOGIN_FAILURE, error: 'foo' })).toEqual({
      initialCheck: false,
      authenticated: false,
      error: 'foo',
      fetching: false
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(auth(initialState, { type: LOGOUT_SUCCESS })).toEqual({
      initialCheck: false,
      authenticated: false,
      error: '',
      fetching: false
    });
  });

  describe('when user is already logged in', () => {
    it('should reset auth after LOGOUT_SUCCESS', () => {
      const state = { initialCheck: true, authenticated: true };

      expect(auth(state, { type: LOGOUT_SUCCESS })).toEqual({
        initialCheck: true,
        authenticated: false,
        error: '',
        fetching: false
      });
    });
  });
});
