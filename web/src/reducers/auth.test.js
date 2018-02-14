import auth from './auth';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions/auth';

describe('auth reducer', () => {
  const initialState = {
    authenticated: false,
    error: '',
    fetching: false
  };

  it('should handle initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(auth(initialState, { type: LOGIN_REQUEST })).toEqual({
      authenticated: false,
      error: '',
      fetching: true
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(auth(initialState, { type: LOGIN_SUCCESS })).toEqual({
      authenticated: true,
      error: '',
      fetching: false
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(auth(initialState, { type: LOGIN_FAILURE, error: 'foo' })).toEqual({
      authenticated: false,
      error: 'foo',
      fetching: false
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(auth(initialState, { type: LOGOUT_SUCCESS })).toEqual({
      authenticated: false,
      error: '',
      fetching: false
    });
  });

  describe('when user is already logged in', () => {
    it('should reset auth after LOGOUT_SUCCESS', () => {
      const state = { authenticated: true };

      expect(auth(state, { type: LOGOUT_SUCCESS })).toEqual({
        authenticated: false,
        error: '',
        fetching: false
      });
    });
  });
});
