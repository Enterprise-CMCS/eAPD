import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './user';
import axios from '../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

describe('user actions', () => {
  it('requestUser should create GET_USER_REQUEST action', () => {
    expect(actions.requestUser()).toEqual({ type: actions.GET_USER_REQUEST });
  });

  it('receiveUser should create GET_USER_SUCCESS action', () => {
    const data = { name: 'foo' };
    expect(actions.receiveUser(data)).toEqual({
      type: actions.GET_USER_SUCCESS,
      data
    });
  });

  it('failUser should create GET_USER_FAILURE action', () => {
    expect(actions.failUser('foo')).toEqual({
      type: actions.GET_USER_FAILURE,
      error: 'foo'
    });
  });

  it('requestUserUpdate should create UPDATE_USER_REQUEST action', () => {
    expect(actions.requestUserUpdate()).toEqual({
      type: actions.UPDATE_USER_REQUEST
    });
  });

  it('receiveUserUpdate should create UPDATE_USER_SUCCESS action', () => {
    const data = { name: 'foo' };
    expect(actions.receiveUserUpdate(data)).toEqual({
      type: actions.UPDATE_USER_SUCCESS,
      data
    });
  });

  it('failUserUpdate should create GET_USER_FAILURE action', () => {
    expect(actions.failUserUpdate('foo')).toEqual({
      type: actions.UPDATE_USER_FAILURE,
      error: 'foo'
    });
  });

  describe('fetchUser (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    it('creates GET_USER_SUCCESS after successful user fetch', () => {
      const store = mockStore({});
      fetchMock.onGet().reply(200, { foo: 'bar' });

      const expectedActions = [
        { type: actions.GET_USER_REQUEST },
        { type: actions.GET_USER_SUCCESS, data: { foo: 'bar' } }
      ];

      return store.dispatch(actions.fetchUser()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates GET_USER_FAILURE after unsuccessful user fetch', () => {
      const store = mockStore({});
      fetchMock.onGet().reply(403, 'foo');

      const expectedActions = [
        { type: actions.GET_USER_REQUEST },
        { type: actions.GET_USER_FAILURE, error: 'foo' }
      ];

      return store.dispatch(actions.fetchUser()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('updateUser (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    it('creates UPDATE_USER_SUCCESS after successful user fetch', () => {
      const store = mockStore({});
      fetchMock.onPut().reply(200, { foo: 'bar' });

      const expectedActions = [
        { type: actions.UPDATE_USER_REQUEST },
        { type: actions.UPDATE_USER_SUCCESS, data: { foo: 'bar' } }
      ];

      return store.dispatch(actions.updateUser()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates UPDATE_USER_FAILURE after unsuccessful user fetch', () => {
      const store = mockStore({});
      fetchMock.onPut().reply(403, 'foo');

      const expectedActions = [
        { type: actions.UPDATE_USER_REQUEST },
        { type: actions.UPDATE_USER_FAILURE, error: 'foo' }
      ];

      return store.dispatch(actions.updateUser()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('shouldFetchUser)', () => {
    it('does nothing if a user is already loaded', () => {
      const store = mockStore({ user: { loaded: true } });
      store.dispatch(actions.fetchUserDataIfNeeded('id'));

      expect(store.getActions()).toEqual([]);
    });

    it('fetches the current users if not already loaded', () => {
      const store = mockStore({ user: { loaded: false } });

      const expectedActions = [
        {
          type: actions.GET_USER_REQUEST
        }
      ];

      store.dispatch(actions.fetchUserDataIfNeeded('id'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
