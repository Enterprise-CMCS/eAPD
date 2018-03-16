import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './apd';
import axios from '../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

describe('state actions', () => {
  it('requestApd should create GET_APD_REQUEST action', () => {
    expect(actions.requestApd()).toEqual({ type: actions.GET_APD_REQUEST });
  });

  it('receiveApd should create GET_APD_SUCCESS action', () => {
    const data = { name: 'foo' };
    expect(actions.receiveApd(data)).toEqual({
      type: actions.GET_APD_SUCCESS,
      data
    });
  });

  it('failApd should create GET_APD_FAILURE action', () => {
    expect(actions.failApd('foo')).toEqual({
      type: actions.GET_APD_FAILURE,
      error: 'foo'
    });
  });

  it('requestApdActivityUpdate should create UPDATE_APD_ACTIVITY_REQUEST action', () => {
    expect(actions.requestApdActivityUpdate()).toEqual({
      type: actions.UPDATE_APD_ACTIVITY_REQUEST
    });
  });

  it('receiveApdActivityUpdate should create UPDATE_APD_ACTIVITY_SUCCESS action', () => {
    const data = { name: 'foo' };
    expect(actions.receiveApdActivityUpdate(data)).toEqual({
      type: actions.UPDATE_APD_ACTIVITY_SUCCESS,
      data
    });
  });

  it('failApdActivityUpdate should create GET_APD_ACTIVITY_FAILURE action', () => {
    expect(actions.failApdActivityUpdate('foo')).toEqual({
      type: actions.UPDATE_APD_ACTIVITY_FAILURE,
      error: 'foo'
    });
  });

  describe('fetchApd (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    it('creates GET_APD_SUCCESS after successful APD fetch', () => {
      const store = mockStore({});
      fetchMock.onGet('/apds').reply(200, { foo: 'bar' });

      const expectedActions = [
        { type: actions.GET_APD_REQUEST },
        { type: actions.GET_APD_SUCCESS, data: { foo: 'bar' } }
      ];

      return store.dispatch(actions.fetchApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates GET_APD_FAILURE after unsuccessful APD fetch', () => {
      const store = mockStore({});
      fetchMock.onGet('/apds').reply(403, 'foo');

      const expectedActions = [
        { type: actions.GET_APD_REQUEST },
        { type: actions.GET_APD_FAILURE, error: 'foo' }
      ];

      return store.dispatch(actions.fetchApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('updateApdActivity (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    it('creates UPDATE_APD_ACTIVITY_SUCCESS after successful APD activity update', () => {
      const store = mockStore({});
      fetchMock.onPut('/activities/activity-id').reply(200, { foo: 'bar' });

      const expectedActions = [
        { type: actions.UPDATE_APD_ACTIVITY_REQUEST },
        { type: actions.UPDATE_APD_ACTIVITY_SUCCESS, data: { foo: 'bar' } }
      ];

      return store
        .dispatch(actions.updateApdActivity('activity-id', {}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates UPDATE_APD_ACTIVITY_FAILURE after unsuccessful APD activity update', () => {
      const store = mockStore({});
      fetchMock.onPut('/activities/activity-id').reply(403, 'foo');

      const expectedActions = [
        { type: actions.UPDATE_APD_ACTIVITY_REQUEST },
        { type: actions.UPDATE_APD_ACTIVITY_FAILURE, error: 'foo' }
      ];

      return store
        .dispatch(actions.updateApdActivity('activity-id', {}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('updateApdActivity (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    it('creates UPDATE_APD_ACTIVITY_SUCCESS after successful APD activity goal update', () => {
      const store = mockStore({});
      fetchMock
        .onPut('/activities/activity-id/goals')
        .reply(200, { foo: 'bar' });

      const expectedActions = [
        { type: actions.UPDATE_APD_ACTIVITY_REQUEST },
        { type: actions.UPDATE_APD_ACTIVITY_SUCCESS, data: { foo: 'bar' } }
      ];

      return store
        .dispatch(actions.updateApdActivityGoals('activity-id', {}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates UPDATE_APD_ACTIVITY_FAILURE after unsuccessful APD activity goal update', () => {
      const store = mockStore({});
      fetchMock.onPut('/activities/activity-id/goals').reply(403, 'foo');

      const expectedActions = [
        { type: actions.UPDATE_APD_ACTIVITY_REQUEST },
        { type: actions.UPDATE_APD_ACTIVITY_FAILURE, error: 'foo' }
      ];

      return store
        .dispatch(actions.updateApdActivityGoals('activity-id', {}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('fetch APD data if needed (async)', async () => {
    it('fetches data if it is not already loaded', async () => {
      const store = mockStore({
        apd: {
          loaded: false
        }
      });

      const expectedActions = [{ type: actions.GET_APD_REQUEST }];

      await store.dispatch(actions.fetchApdDataIfNeeded());
      expect(store.getActions()).toEqual(
        expect.arrayContaining(expectedActions)
      );
    });

    it('does not fetch data if it is already loaded', async () => {
      const store = mockStore({
        apd: {
          loaded: true
        }
      });

      await store.dispatch(actions.fetchApdDataIfNeeded());
      expect(store.getActions()).toEqual([]);
    });
  });
});
