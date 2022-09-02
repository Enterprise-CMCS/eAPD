import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { UPDATE_BUDGET } from '../budget';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

import { saveContractor, removeContractor } from './contractorResources';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for contractor resources section', () => {
  const state = {
    apd: {
      data: {
        activities: [
          {
            contractorResources: []
          }
        ]
      }
    }
  };

  const store = mockStore(state);

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for saving a new contractor resource', () => {
    store.dispatch(saveContractor(0, null, {}));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/0/contractorResources/-',
        state
      },
      {
        type: EDIT_APD,
        path: '/activities/0/contractorResources/0',
        value: {}
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });

  it('dispatches an action for removing a contractor resource if approved', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(true);

    store.dispatch(removeContractor(0, 0, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/activities/0/contractorResources/0'
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });

  it('dispatches an action for updating an existing contractor', () => {
    const stateWithResource = state;
    stateWithResource.apd.data.activities[0].contractorResources.push({
      key: '123',
      name: 'test contractor'
    });

    const storeWithResource = mockStore(stateWithResource);

    const contractor = { key: '123', contractor: 'test contractor updated' };

    storeWithResource.dispatch(saveContractor(0, 0, contractor));

    expect(storeWithResource.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/0/contractorResources/0',
        value: contractor
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });
});
