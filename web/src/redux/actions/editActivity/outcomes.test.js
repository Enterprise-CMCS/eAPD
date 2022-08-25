import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

import { saveOutcome, removeOutcome } from './outcomes';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for outcomes and metrics section', () => {
  const mockState = {
    apd: {
      data: {
        activities: [
          {
            outcomes: []
          }
        ]
      }
    }
  };

  const store = mockStore(mockState);

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding a new outcome', () => {
    store.dispatch(saveOutcome(0, null, {}));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/0/outcomes/-',
        state: mockState
      },
      {
        type: EDIT_APD,
        path: '/activities/0/outcomes/0',
        value: {}
      }
    ]);
  });

  it('dispatches an action for editing an existing outcome', () => {
    const stateWithOutcome = mockState;
    stateWithOutcome.apd.data.activities[0].outcomes.push({
      key: '123',
      outcome: 'test outcome'
    });

    const storeWithOutcome = mockStore(stateWithOutcome);

    const outcome = { key: '123', outcome: 'test outcome updated' };

    storeWithOutcome.dispatch(saveOutcome(0, 0, outcome));

    expect(storeWithOutcome.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/0/outcomes/0',
        value: outcome
      }
    ]);
  });

  it('dispatches an action for removing an outcome if approved', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(true);

    store.dispatch(removeOutcome(17, 9, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/activities/17/outcomes/9'
      }
    ]);
  });
});
