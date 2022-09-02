import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { UPDATE_BUDGET } from '../budget';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from './symbols';
import { saveKeyPersonnel, removeKeyPersonnel } from './keyPersonnel';

const mockStore = configureStore([thunk]);

describe('APD edit actions for APD key personnel', () => {
  it('dispatchs an action for adding a key person', () => {
    const state = {
      apd: {
        data: {
          keyStatePersonnel: {
            keyPersonnel: []
          }
        }
      }
    };

    const store = mockStore(state);
    store.dispatch(saveKeyPersonnel(null, {}));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/keyStatePersonnel/keyPersonnel/-',
        state
      },
      {
        type: EDIT_APD,
        path: '/keyStatePersonnel/keyPersonnel/0',
        value: {}
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });

  it('dispatches an action to remove a key person if confirmed', () => {
    const store = mockStore('remove state');
    const global = { confirm: jest.fn().mockReturnValue(true) };

    store.dispatch(removeKeyPersonnel(17, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/keyStatePersonnel/keyPersonnel/17'
      },
      {
        type: UPDATE_BUDGET,
        state: 'remove state'
      }
    ]);
  });

  it('dispatches an action for updating an existing contractor', () => {
    const state = {
      apd: {
        data: {
          keyStatePersonnel: {
            keyPersonnel: [{ name: 'Test Personnel' }]
          }
        }
      }
    };

    const store = mockStore(state);

    const personnel = { key: '123', name: 'test personnel updated' };

    store.dispatch(saveKeyPersonnel(0, personnel));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/keyStatePersonnel/keyPersonnel/0',
        value: personnel
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });
});
