import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { updateBudget, loadBudget, UPDATE_BUDGET } from './budget';

const mockStore = configureStore([thunk]);

describe('apd actions', () => {
  const store = mockStore('old state');

  beforeEach(() => {
    store.clearActions();
  });

  it('updateBudget should create UPDATE_BUDGET action', () => {
    const expectedActions = [{ type: UPDATE_BUDGET, state: 'old state' }];

    store.dispatch(updateBudget());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
