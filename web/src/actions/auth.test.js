import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './auth';
import * as apdActions from './apd';
import axios from '../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

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

  it('completeLogout should create LOGOUT_SUCCESS action', () => {
    expect(actions.completeLogout()).toEqual({ type: actions.LOGOUT_SUCCESS });
  });

  describe('login (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    it('creates LOGIN_SUCCESS after successful auth', () => {
      const store = mockStore({});
      fetchMock.onPost().reply(200, { moop: 'moop' });

      const expectedActions = [
        { type: actions.LOGIN_REQUEST },
        { type: actions.LOGIN_SUCCESS, data: { moop: 'moop' } },
        { type: apdActions.GET_APD_REQUEST }
      ];

      return store.dispatch(actions.login()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOGIN_FAILURE after unsuccessful auth', () => {
      const store = mockStore({});
      fetchMock.onPost().reply(401, 'foo');

      const expectedActions = [
        { type: actions.LOGIN_REQUEST },
        { type: actions.LOGIN_FAILURE, error: 'foo' }
      ];

      return store.dispatch(actions.login()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('logout (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    it('creates LOGOUT_SUCCESS after successful request', () => {
      const store = mockStore({});
      fetchMock.onGet().reply(200);

      const expectedActions = [{ type: actions.LOGOUT_SUCCESS }];

      return store.dispatch(actions.logout()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('checkAuth (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    it('creates AUTH_CHEK_SUCCESS after successful auth and loads APDs', () => {
      const store = mockStore({});
      fetchMock.onGet().reply(200, { name: 'bloop' });

      const expectedActions = [
        { type: actions.AUTH_CHECK_REQUEST },
        { type: actions.AUTH_CHECK_SUCCESS, data: { name: 'bloop' } },
        { type: apdActions.GET_APD_REQUEST }
      ];

      return store.dispatch(actions.checkAuth()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates AUTH_CHECK_FAILURE after unsuccessful auth and does not load APDs', () => {
      const store = mockStore({});
      fetchMock.onGet().reply(403);

      const expectedActions = [
        { type: actions.AUTH_CHECK_REQUEST },
        { type: actions.AUTH_CHECK_FAILURE }
      ];

      return store.dispatch(actions.checkAuth()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
