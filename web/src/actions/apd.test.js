import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import * as actions from './apd';
import axios from '../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

describe('apd actions', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

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

  it('selectApdOnLoad should create SET_SELECT_APD_ON_LOAD action if user is not an admin', async () => {
    const store = mockStore({ user: { data: { role: 'not an admin' } } });

    await store.dispatch(actions.selectApdOnLoad());

    expect(store.getActions()).toEqual([
      {
        type: actions.SET_SELECT_APD_ON_LOAD
      }
    ]);
  });

  it('selectApdOnLoad should do nothing if user is an admin', async () => {
    const store = mockStore({ user: { data: { role: 'admin' } } });

    await store.dispatch(actions.selectApdOnLoad());

    expect(store.getActions()).toEqual([]);
  });

  describe('delete an APD', () => {
    it('should handle an API error', () => {
      const store = mockStore();
      fetchMock.onDelete('/apds/apd-id').reply(400);

      return store.dispatch(actions.deleteApd('apd-id')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.DELETE_APD_REQUEST },
          { type: actions.DELETE_APD_FAILURE }
        ]);
      });
    });

    it('should handle an API success', () => {
      const store = mockStore();
      const fetch = sinon.stub().returns({ type: 'apd fetch' });
      fetchMock.onDelete('/apds/apd-id').reply(200);

      return store.dispatch(actions.deleteApd('apd-id', { fetch })).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.DELETE_APD_REQUEST },
          { type: actions.DELETE_APD_SUCCESS },
          { type: 'apd fetch' }
        ]);
      });
    });
  });

  describe('fetchApd (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    describe('creates GET_APD_SUCCESS after successful APD fetch', () => {
      it('does not select an APD by default', () => {
        const store = mockStore({ apd: { selectAPDOnLoad: false } });
        fetchMock
          .onGet('/apds')
          .reply(200, [
            { foo: 'bar', status: 'draft' },
            { foo: 'bar', status: 'archived' }
          ]);

        const expectedActions = [
          { type: actions.GET_APD_REQUEST },
          {
            type: actions.GET_APD_SUCCESS,
            // expected the archived APD to have been removed
            data: [{ foo: 'bar', status: 'draft' }]
          }
        ];

        return store.dispatch(actions.fetchApd()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('does not select an APD if there is no local storage', () => {
        const store = mockStore({ apd: { selectAPDOnLoad: true } });
        fetchMock.onGet('/apds').reply(200, [{ foo: 'bar' }]);

        const expectedActions = [
          { type: actions.GET_APD_REQUEST },
          { type: actions.GET_APD_SUCCESS, data: [{ foo: 'bar' }] }
        ];

        const global = {};

        return store.dispatch(actions.fetchApd({ global })).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('does not select an APD if local storage does not contain a last APD ID', () => {
        const store = mockStore({ apd: { selectAPDOnLoad: true } });
        fetchMock.onGet('/apds').reply(200, [{ foo: 'bar' }]);

        const expectedActions = [
          { type: actions.GET_APD_REQUEST },
          { type: actions.GET_APD_SUCCESS, data: [{ foo: 'bar' }] }
        ];

        const global = {
          localStorage: { getItem: sinon.stub().returns(null) }
        };

        return store.dispatch(actions.fetchApd({ global })).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('selects an APD if local storage contains a last APD ID', async () => {
        const state = {
          apd: { selectAPDOnLoad: true }
        };
        const store = mockStore(state);
        fetchMock.onGet('/apds').reply(200, [{ foo: 'bar' }]);

        const pushRoute = route => ({ type: 'FAKE_PUSH', pushRoute: route });

        const select = sinon.stub().returns({ type: 'SELECT_MOCK' });

        const expectedActions = [
          { type: actions.GET_APD_REQUEST },
          { type: actions.GET_APD_SUCCESS, data: [{ foo: 'bar' }] },
          { type: 'SELECT_MOCK' }
        ];

        const global = {
          localStorage: {
            getItem: sinon.stub().returns('7'),
            setItem: sinon.spy()
          }
        };

        await store.dispatch(actions.fetchApd({ global, pushRoute, select }));

        expect(store.getActions()).toEqual(expectedActions);
        expect(select.calledWith('7', { global, pushRoute })).toEqual(true);
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
});
