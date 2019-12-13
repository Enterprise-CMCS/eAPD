import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { saveApd, selectApd } from './apd';
import {
  SAVE_APD_FAILURE,
  SAVE_APD_REQUEST,
  SAVE_APD_SUCCESS,
  SELECT_APD
} from './symbols';
import { ARIA_ANNOUNCE_CHANGE } from '../aria';
import { UPDATE_BUDGET } from '../budget';
import axios from '../../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

describe('application-level actions', () => {
  describe('save APD to API', () => {
    const state = {
      notification: { open: false, queue: [] },
      apd: {
        data: {
          id: 'id-to-update'
        }
      },
      activities: {},
      patch: []
    };

    beforeEach(() => {
      state.patch = ['these', 'get', 'sent', 'off'];

      fetchMock.reset();
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
        { type: SAVE_APD_FAILURE, data: 'save-apd.not-logged-in' }
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
      const updatedApd = {};
      const store = mockStore(state);

      fetchMock.onPatch('/apds/id-to-update').reply(200, updatedApd);

      const expectedActions = [
        { type: SAVE_APD_REQUEST },
        { type: SAVE_APD_SUCCESS, data: updatedApd }
      ];

      return store.dispatch(saveApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  it('selecting an APD loads from the API, redirect to provided route, and saves the APD ID to local storage', async () => {
    const apd = {
      id: 'apd-id',
      selected: 'apd goes here',
      federalCitations: { already: 'exists' }
    };
    fetchMock.onGet('/apds/apd-id').reply(200, apd);

    const deserialize = jest.fn();
    deserialize.mockReturnValue('deserialized apd');

    const state = { apd: { byId: { apdID: 'hello there' } } };
    const store = mockStore(state);
    const testRoute = '/test';

    const global = { localStorage: { setItem: jest.fn() } };
    const pushRoute = route => ({ type: 'FAKE_PUSH', pushRoute: route });

    const expectedActions = [
      { type: ARIA_ANNOUNCE_CHANGE, message: 'Your APD is loading' },
      { type: SELECT_APD, apd: 'deserialized apd' },
      { type: UPDATE_BUDGET, state },
      { type: 'FAKE_PUSH', pushRoute: testRoute },
      {
        type: ARIA_ANNOUNCE_CHANGE,
        message: 'Your APD is loaded and ready to edit'
      }
    ];

    await store.dispatch(
      selectApd('apd-id', '/test', {
        deserialize,
        global,
        pushRoute
      })
    );

    expect(store.getActions()).toEqual(expectedActions);
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'last-apd-id',
      'apd-id'
    );
    expect(deserialize).toHaveBeenCalledWith(apd);
  });
});
