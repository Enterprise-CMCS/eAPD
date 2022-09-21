import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  createApd,
  deleteApd,
  fetchAllApds,
  saveApd,
  selectApd,
  setApdToSelectOnLoad
} from './apd';
import {
  CREATE_APD_FAILURE,
  CREATE_APD_REQUEST,
  CREATE_APD_SUCCESS,
  DELETE_APD_FAILURE,
  DELETE_APD_REQUEST,
  DELETE_APD_SUCCESS,
  FETCH_ALL_APDS_FAILURE,
  FETCH_ALL_APDS_REQUEST,
  FETCH_ALL_APDS_SUCCESS,
  SAVE_APD_FAILURE,
  SAVE_APD_REQUEST,
  SAVE_APD_SUCCESS,
  SELECT_APD_SUCCESS,
  SELECT_APD_REQUEST,
  SET_APD_TO_SELECT_ON_LOAD
} from './symbols';
import { ARIA_ANNOUNCE_CHANGE } from '../aria';
import { LOAD_BUDGET } from '../budget';
import axios from '../../../util/api';
import regulations from '../../../util/regulations';
import { APD_ACTIVITIES_CHANGE, EDIT_APD } from '../editApd/symbols';
import { t } from '../../../i18n';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('application-level actions', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  describe('create a new APD', () => {
    it('on success, adds the new APD to the store and switches to it', async () => {
      const newapd = { id: 'bloop' };
      fetchMock.onPost('/apds').reply(200, newapd);

      const apd = {
        id: 'apd-id',
        activities: [],
        assurancesAndCompliances: { already: 'exist' },
        keyStatePersonnel: {}
      };

      fetchMock.onGet('/apds/bloop').reply(200, apd);

      const pushRoute = route => ({ type: 'FAKE_PUSH', pushRoute: route });
      const state = {
        apd: {
          byId: {
            bloop: { hello: 'world' }
          }
        },
        user: {
          data: { activities: ['edit-document'] }
        }
      };
      const store = mockStore(state);

      const expectedActions = [
        { type: CREATE_APD_REQUEST },
        { type: CREATE_APD_SUCCESS, data: newapd },
        { type: SELECT_APD_REQUEST },
        { type: ARIA_ANNOUNCE_CHANGE, message: 'Your APD is loading.' },
        { type: SELECT_APD_SUCCESS, apd },
        { type: APD_ACTIVITIES_CHANGE, activities: [] },
        { type: LOAD_BUDGET, budget: {} },
        { type: 'FAKE_PUSH', pushRoute: '/apd/bloop' },
        {
          type: ARIA_ANNOUNCE_CHANGE,
          message:
            'Your APD is loaded and ready to edit. Changes to this APD will be saved automatically.'
        }
      ];

      await store.dispatch(createApd({ pushRoute }));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('on error, it just signals an error', async () => {
      fetchMock.onPost('/apds').reply(403);
      const store = mockStore();

      const expectedActions = [
        { type: CREATE_APD_REQUEST },
        { type: CREATE_APD_FAILURE }
      ];

      await store.dispatch(createApd());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('delete an APD', () => {
    it('on error, sends an error action', () => {
      const store = mockStore();
      fetchMock.onDelete('/apds/apd-id').reply(400);

      return store.dispatch(deleteApd('apd-id')).then(() => {
        expect(store.getActions()).toEqual([
          { type: DELETE_APD_REQUEST },
          { type: DELETE_APD_FAILURE }
        ]);
      });
    });

    it('on success, fetches the new list of APDs', () => {
      const store = mockStore();
      const fetch = jest.fn().mockReturnValue({ type: 'apd fetch' });
      fetchMock.onDelete('/apds/apd-id').reply(200);

      return store.dispatch(deleteApd('apd-id', { fetch })).then(() => {
        expect(store.getActions()).toEqual([
          { type: DELETE_APD_REQUEST },
          { type: DELETE_APD_SUCCESS },
          { type: 'apd fetch' }
        ]);
      });
    });
  });

  describe('fetch all APDs', () => {
    describe('creates GET_APD_SUCCESS after successful APD fetch', () => {
      it('does not select an APD by default', async () => {
        const store = mockStore({ apd: { selectAPDOnLoad: false } });
        fetchMock.onGet('/apds').reply(200, [
          { foo: 'bar', status: 'draft' },
          { foo: 'bar', status: 'archived' }
        ]);

        const expectedActions = [
          { type: FETCH_ALL_APDS_REQUEST },
          {
            type: FETCH_ALL_APDS_SUCCESS,
            // expected the archived APD to have been removed
            data: [{ foo: 'bar', status: 'draft' }]
          }
        ];

        await store.dispatch(fetchAllApds());
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('does not select an APD if there is no local storage', async () => {
        const store = mockStore({ apd: { selectAPDOnLoad: true } });
        fetchMock.onGet('/apds').reply(200, [{ foo: 'bar' }]);

        const expectedActions = [
          { type: FETCH_ALL_APDS_REQUEST },
          { type: FETCH_ALL_APDS_SUCCESS, data: [{ foo: 'bar' }] }
        ];

        const global = {};

        await store.dispatch(fetchAllApds({ global }));
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('does not select an APD if local storage does not contain a last APD ID', async () => {
        const store = mockStore({ apd: { selectAPDOnLoad: true } });
        fetchMock.onGet('/apds').reply(200, [{ foo: 'bar' }]);

        const expectedActions = [
          { type: FETCH_ALL_APDS_REQUEST },
          { type: FETCH_ALL_APDS_SUCCESS, data: [{ foo: 'bar' }] }
        ];

        const global = {
          localStorage: { getItem: jest.fn().mockReturnValue(null) }
        };

        await store.dispatch(fetchAllApds({ global }));
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('selects an APD if local storage contains a last APD ID', async () => {
        const state = {
          apd: { selectAPDOnLoad: true }
        };
        const store = mockStore(state);
        fetchMock.onGet('/apds').reply(200, [{ foo: 'bar' }]);

        const pushRoute = route => ({ type: 'FAKE_PUSH', pushRoute: route });

        const select = jest.fn().mockReturnValue({ type: 'SELECT_MOCK' });

        const expectedActions = [
          { type: FETCH_ALL_APDS_REQUEST },
          { type: FETCH_ALL_APDS_SUCCESS, data: [{ foo: 'bar' }] },
          { type: 'SELECT_MOCK' }
        ];

        const global = {
          localStorage: {
            getItem: jest.fn().mockReturnValue('7'),
            setItem: jest.fn()
          }
        };

        await store.dispatch(fetchAllApds({ global, pushRoute, select }));

        expect(store.getActions()).toEqual(expectedActions);
        expect(select).toHaveBeenCalledWith('7', { global, pushRoute });
      });
    });

    it('creates GET_APD_FAILURE after unsuccessful APD fetch', async () => {
      const store = mockStore({});
      fetchMock.onGet('/apds').reply(403, 'foo');

      const expectedActions = [
        { type: FETCH_ALL_APDS_REQUEST },
        { type: FETCH_ALL_APDS_FAILURE, error: 'foo' }
      ];

      await store.dispatch(fetchAllApds());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('save APD to API', () => {
    const state = {
      notification: { open: false, queue: [] },
      apd: {
        data: {
          id: 'id-to-update'
        }
      },
      user: {
        data: { activities: ['edit-document'] }
      },
      activities: {},
      patch: []
    };

    beforeEach(() => {
      state.patch = ['these', 'get', 'sent', 'off'];
    });

    it('creates save request but does not actually send save if not dirty', () => {
      state.patch.length = 0;
      const store = mockStore(state);
      fetchMock.onPatch('/apds/id-to-update').reply(403, [{ foo: 'bar' }]);

      const expectedActions = [{ type: SAVE_APD_REQUEST }];

      return store.dispatch(saveApd()).catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates save request and logged-out actions if the user is not logged in', () => {
      const store = mockStore(state);
      fetchMock.onPatch('/apds/id-to-update').reply(403, [{ foo: 'bar' }]);

      const expectedActions = [
        { type: SAVE_APD_REQUEST },
        { type: SAVE_APD_FAILURE, data: t('errors.save-apd.not-logged-in') }
      ];

      return store.dispatch(saveApd()).catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates save request and save failure actions if the save fails', () => {
      const store = mockStore(state);
      fetchMock.onPatch('/apds/id-to-update').reply(400, [{ foo: 'bar' }]);

      const expectedActions = [
        { type: SAVE_APD_REQUEST },
        { type: SAVE_APD_FAILURE }
      ];

      return store.dispatch(saveApd()).catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('saves and does all the good things', () => {
      state.patch = [{ path: 'test path' }];
      const updatedApd = {};
      const store = mockStore(state);

      fetchMock.onPatch('/apds/id-to-update').reply(200, { apd: updatedApd });

      const expectedActions = [
        { type: SAVE_APD_REQUEST },
        { type: SAVE_APD_SUCCESS, apd: updatedApd }
      ];

      return store.dispatch(saveApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('select an existing API', () => {
    it('redirects to provided route and saves the APD ID to local storage', async () => {
      const activities = [
        { name: 'Outcomes and metrics' },
        { name: 'FFP and budget' }
      ];
      const apd = {
        activities,
        id: 'apd-id',
        selected: 'apd goes here',
        assurancesAndCompliances: { already: 'exists' }
      };
      fetchMock.onGet('/apds/apd-id').reply(200, apd);

      const state = {
        apd: {
          byId: { apdID: 'hello there' }
        }
      };
      const store = mockStore(state);
      const testRoute = '/test';

      const global = { localStorage: { setItem: jest.fn() } };
      const pushRoute = route => ({ type: 'FAKE_PUSH', pushRoute: route });

      const expectedActions = [
        { type: SELECT_APD_REQUEST },
        { type: ARIA_ANNOUNCE_CHANGE, message: 'Your APD is loading.' },
        { type: SELECT_APD_SUCCESS, apd },
        { type: APD_ACTIVITIES_CHANGE, activities },
        { type: LOAD_BUDGET, budget: {} },
        { type: 'FAKE_PUSH', pushRoute: testRoute },
        {
          type: ARIA_ANNOUNCE_CHANGE,
          message:
            'Your APD is loaded and ready to edit. Changes to this APD will be saved automatically.'
        }
      ];

      await store.dispatch(
        selectApd('apd-id', '/test', {
          global,
          pushRoute
        })
      );

      expect(store.getActions()).toEqual(expectedActions);
      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        'last-apd-id',
        'apd-id'
      );
    });

    it('does the same, but queues a save if the federal citations is initially blank', async () => {
      const activities = [
        { name: 'Outcomes and metrics' },
        { name: 'FFP and budget' }
      ];
      const apd = {
        activities,
        id: 'apd-id',
        selected: 'apd goes here',
        assurancesAndCompliances: {}
      };
      fetchMock.onGet('/apds/apd-id').reply(200, apd);

      const state = {
        apd: {
          byId: { apdID: 'hello there' }
        }
      };
      const store = mockStore(state);
      const testRoute = '/test';

      const global = { localStorage: { setItem: jest.fn() } };
      const pushRoute = route => ({ type: 'FAKE_PUSH', pushRoute: route });

      const expectedActions = [
        { type: SELECT_APD_REQUEST },
        { type: ARIA_ANNOUNCE_CHANGE, message: 'Your APD is loading.' },
        { type: SELECT_APD_SUCCESS, apd },
        { type: APD_ACTIVITIES_CHANGE, activities },
        {
          type: EDIT_APD,
          path: '/assurancesAndCompliances',
          value: regulations
        },
        { type: LOAD_BUDGET, budget: {} },
        { type: 'FAKE_PUSH', pushRoute: testRoute },
        {
          type: ARIA_ANNOUNCE_CHANGE,
          message:
            'Your APD is loaded and ready to edit. Changes to this APD will be saved automatically.'
        }
      ];

      await store.dispatch(
        selectApd('apd-id', '/test', {
          global,
          pushRoute
        })
      );

      expect(store.getActions()).toEqual(expectedActions);
      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        'last-apd-id',
        'apd-id'
      );
    });
  });

  describe('enables selecting an APD on page load', () => {
    it('sends an action if the user is not an admin', async () => {
      const store = mockStore({ user: { data: { role: 'not an admin' } } });

      await store.dispatch(setApdToSelectOnLoad());

      expect(store.getActions()).toEqual([
        {
          type: SET_APD_TO_SELECT_ON_LOAD
        }
      ]);
    });

    it('does nothing if user is an admin', async () => {
      const store = mockStore({
        user: { data: { role: 'eAPD Federal Admin' } }
      });

      await store.dispatch(setApdToSelectOnLoad());

      expect(store.getActions()).toEqual([]);
    });
  });
});
