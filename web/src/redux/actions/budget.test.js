import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  updateBudget,
  loadBudget,
  UPDATE_BUDGET,
  UPDATE_BUDGET_FAILURE
} from './budget';
import axios from '../../util/api';

let spy;

const mockStore = configureStore([thunk]);
const apdID = '12345';
const state = {
  apd: {
    data: { id: apdID }
  }
};
const budget = {};

const store = mockStore(state);

describe('budget actions', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it('on success, updateBudget should create UPDATE_BUDGET action', async () => {
    spy = jest
      .spyOn(axios, 'patch')
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: { budget: {} } })
      );

    await store.dispatch(updateBudget(apdID));

    expect(spy).toHaveBeenCalledWith(`/apds/${apdID}/budget`);
    expect(store.getActions()).toEqual([{ type: UPDATE_BUDGET, budget }]);
  });

  it('on error, updateBudget should create UPDATE_BUDGET_FAILURE action', async () => {
    spy = jest
      .spyOn(axios, 'patch')
      .mockImplementation(() => Promise.reject({ status: 400, error: {} }));

    await store.dispatch(updateBudget('bad id'));

    expect(spy).toHaveBeenCalledWith(`/apds/bad id/budget`);
    expect(store.getActions()).toEqual([
      {
        type: UPDATE_BUDGET_FAILURE,
        data: 'There was an error updating the budget'
      }
    ]);
  });

  it('load budget should create UPDATE_BUDGET action', async () => {
    const budget = { id: 'updated budget' };
    await store.dispatch(loadBudget(budget));

    expect(store.getActions()).toEqual([{ type: UPDATE_BUDGET, budget }]);
  });
});
