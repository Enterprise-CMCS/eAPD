import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { UPDATE_BUDGET } from '../budget';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

import {
  saveNonPersonnelCost,
  removeNonPersonnelCost
} from './nonPersonnelCosts';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for non-personnel section', () => {
  it('dispatches an action for adding a non-personnel expense', () => {
    const state = {
      apd: {
        data: {
          activities: [
            {
              expenses: []
            }
          ]
        }
      }
    };

    const store = mockStore(state);

    store.dispatch(saveNonPersonnelCost(0, 0, {}));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/0/expenses/-',
        state
      },
      {
        type: EDIT_APD,
        path: '/activities/0/expenses/0',
        value: {}
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });

  it('dispatches an action for removing a non-personnel expense if approved', () => {
    const store = mockStore('test state');

    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(true);

    store.dispatch(removeNonPersonnelCost(17, 9, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/activities/17/expenses/9'
      },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });

  it('dispatches an action for updating an existing non-personnel expense', () => {
    const state = {
      apd: {
        data: {
          activities: [
            {
              expenses: [{ category: 'training' }]
            }
          ]
        }
      }
    };

    const store = mockStore(state);
    const expense = { key: '123', category: 'test category updated' };
    store.dispatch(saveNonPersonnelCost(0, 0, expense));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/0/expenses/0',
        value: expense
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });
});
