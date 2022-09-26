import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { loadBudget, LOAD_BUDGET } from './budget';

const mockStore = configureStore([thunk]);
const apdID = '12345';
const state = {
  apd: {
    data: { id: apdID }
  }
};

const store = mockStore(state);

describe('budget actions', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it('load budget should create LOAD_BUDGET action', async () => {
    const budget = { id: 'updated budget' };
    await store.dispatch(loadBudget(budget));

    expect(store.getActions()).toEqual([{ type: LOAD_BUDGET, budget }]);
  });
});
