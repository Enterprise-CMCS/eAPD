import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

import { savePersonnel, removePersonnel } from './statePersonnel';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for state personnel section', () => {
  const state = {
    apd: {
      data: {
        activities: [
          {
            statePersonnel: []
          }
        ]
      }
    }
  };

  const store = mockStore(state);

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding a new state personnel', () => {
    store.dispatch(savePersonnel(0, null, {}));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/0/statePersonnel/-',
        state
      },
      {
        type: EDIT_APD,
        path: '/activities/0/statePersonnel/0',
        value: {}
      }
    ]);
  });

  it('dispatches an action for removing a state personnel if approved', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(true);

    store.dispatch(removePersonnel(0, 0, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/activities/0/statePersonnel/0'
      }
    ]);
  });

  it('dispatches an action for updating an existing state personnel', () => {
    const stateWithResource = state;
    stateWithResource.apd.data.activities[0].statePersonnel.push({
      key: '123',
      name: 'test state personnel'
    });

    const storeWithResource = mockStore(stateWithResource);

    const statePersonnel = {
      key: '123',
      statePersonnel: 'test state personnel updated'
    };

    storeWithResource.dispatch(savePersonnel(0, 0, statePersonnel));

    expect(storeWithResource.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/0/statePersonnel/0',
        value: statePersonnel
      }
    ]);
  });
});
