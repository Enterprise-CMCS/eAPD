import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './state';
import axios from '../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

describe('state actions', () => {
  it('requestState should create GET_STATE_REQUEST action', () => {
    expect(actions.requestState()).toEqual({ type: actions.GET_STATE_REQUEST });
  });

  it('receiveState should create GET_STATE_SUCCESS action', () => {
    const data = { name: 'foo' };
    expect(actions.receiveState(data)).toEqual({
      type: actions.GET_STATE_SUCCESS,
      data
    });
  });

  it('failState should create GET_STATE_FAILURE action', () => {
    expect(actions.failState('foo')).toEqual({
      type: actions.GET_STATE_FAILURE,
      error: 'foo'
    });
  });

  it('requestStateUpdate should create UPDATE_STATE_REQUEST action', () => {
    expect(actions.requestStateUpdate()).toEqual({
      type: actions.UPDATE_STATE_REQUEST
    });
  });

  it('receiveStateUpdate should create UPDATE_STATE_SUCCESS action', () => {
    const data = { name: 'foo' };
    expect(actions.receiveStateUpdate(data)).toEqual({
      type: actions.UPDATE_STATE_SUCCESS,
      data
    });
  });

  it('failStateUpdate should create GET_STATE_FAILURE action', () => {
    expect(actions.failStateUpdate('foo')).toEqual({
      type: actions.UPDATE_STATE_FAILURE,
      error: 'foo'
    });
  });

  describe('fetchState (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    describe('without an explicit ID', () => {
      it('creates GET_STATE_SUCCESS after successful state fetch', () => {
        const store = mockStore({});
        fetchMock.onGet('/states').reply(200, { foo: 'bar' });

        const expectedActions = [
          { type: actions.GET_STATE_REQUEST },
          { type: actions.GET_STATE_SUCCESS, data: { foo: 'bar' } }
        ];

        return store.dispatch(actions.fetchState()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('creates GET_STATE_FAILURE after unsuccessful state fetch', () => {
        const store = mockStore({});
        fetchMock.onGet('/states').reply(403, 'foo');

        const expectedActions = [
          { type: actions.GET_STATE_REQUEST },
          { type: actions.GET_STATE_FAILURE, error: 'foo' }
        ];

        return store.dispatch(actions.fetchState()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('with an explicit ID', () => {
      it('creates GET_STATE_SUCCESS after successful state fetch', () => {
        const store = mockStore({});
        fetchMock.onGet('/states/fr').reply(200, { foo: 'bar' });

        const expectedActions = [
          { type: actions.GET_STATE_REQUEST },
          { type: actions.GET_STATE_SUCCESS, data: { foo: 'bar' } }
        ];

        return store.dispatch(actions.fetchState('fr')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('creates GET_STATE_FAILURE after unsuccessful state fetch', () => {
        const store = mockStore({});
        fetchMock.onGet('/states/fr').reply(403, 'foo');

        const expectedActions = [
          { type: actions.GET_STATE_REQUEST },
          { type: actions.GET_STATE_FAILURE, error: 'foo' }
        ];

        return store.dispatch(actions.fetchState('fr')).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });

  describe('updateState (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    it('creates UPDATE_STATE_SUCCESS after successful state fetch', () => {
      const store = mockStore({});
      fetchMock.onPut('/states/fr').reply(200, { foo: 'bar' });

      const expectedActions = [
        { type: actions.UPDATE_STATE_REQUEST },
        { type: actions.UPDATE_STATE_SUCCESS, data: { foo: 'bar' } }
      ];

      return store.dispatch(actions.updateState('fr', {})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates UPDATE_STATE_FAILURE after unsuccessful state fetch', () => {
      const store = mockStore({});
      fetchMock.onPut('/states/fr').reply(403, 'foo');

      const expectedActions = [
        { type: actions.UPDATE_STATE_REQUEST },
        { type: actions.UPDATE_STATE_FAILURE, error: 'foo' }
      ];

      return store.dispatch(actions.updateState('fr', {})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('deletes the medicaid director if all fields are empty', () => {
      const store = mockStore({});
      fetchMock
        .onPut('/states/fr', { medicaid_office: {} })
        .reply(200, { foo: 'bar' });

      const expectedActions = [
        { type: actions.UPDATE_STATE_REQUEST },
        { type: actions.UPDATE_STATE_SUCCESS, data: { foo: 'bar' } }
      ];

      const newStateInfo = {
        medicaid_office: { director: { name: '', email: '', phone: '' } }
      };
      return store
        .dispatch(actions.updateState('fr', newStateInfo))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('fetch state data if needed (async)', async () => {
    it('fetches data if it is not already loaded', async () => {
      const store = mockStore({
        state: {
          loaded: false
        }
      });

      const expectedActions = [{ type: actions.GET_STATE_REQUEST }];

      await store.dispatch(actions.fetchStateDataIfNeeded());
      expect(store.getActions()).toEqual(
        expect.arrayContaining(expectedActions)
      );
    });

    it('does not fetch data if it is already loaded', async () => {
      const store = mockStore({
        state: {
          loaded: true
        }
      });

      await store.dispatch(actions.fetchStateDataIfNeeded());
      expect(store.getActions()).toEqual([]);
    });
  });
});
