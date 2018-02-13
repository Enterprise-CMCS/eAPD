import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './auth';

const mockStore = configureStore([thunk]);

describe('auth actions', () => {
  it('requestLogin should create LOGIN_REQUEST action', () => {
    expect(actions.requestLogin()).toEqual({ type: actions.LOGIN_REQUEST });
  });

  it('completeLogin should create LOGIN_SUCCESS action', () => {
    expect(actions.completeLogin()).toEqual({ type: actions.LOGIN_SUCCESS });
  });

  it('failLogin should create LOGIN_FAILURE action', () => {
    expect(actions.failLogin('foo')).toEqual({
      type: actions.LOGIN_FAILURE,
      error: 'foo'
    });
  });

  it('logout should create LOGOUT_SUCCESS action', () => {
    expect(actions.logout()).toEqual({ type: actions.LOGOUT_SUCCESS });
  });

  describe('attemptLogin (async)', () => {
    it('creates LOGIN_SUCCESS after successful auth', () => {
      const store = mockStore({});

      const expectedActions = [
        { type: actions.LOGIN_REQUEST },
        { type: actions.LOGIN_FAILURE }
      ];

      return store.dispatch(actions.attemptLogin()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
