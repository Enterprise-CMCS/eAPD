import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { UPDATE_BUDGET } from '../budget';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';

import {
  addNonPersonnelCost,
  removeNonPersonnelCost,
  setNonPersonnelCostCategory,
  setNonPersonnelCostDescription,
  setNonPersonnelCostForYear
} from './nonPersonnelCosts';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for non-personnel section', () => {
  const store = mockStore('test state');

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding a non-personnel expense', () => {
    store.dispatch(addNonPersonnelCost(17));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/17/expenses/-',
        state: 'test state'
      },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });

  it('dispatches an action for removing a non-personnel expense if approved', () => {
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

  it('does not dispatch an action for removing a non-personnel expense if denied', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(false);

    store.dispatch(removeNonPersonnelCost(17, 9, { global }));

    expect(store.getActions()).toEqual([]);
  });

  it('dispatches an action for setting a non-personnel expense cost category', () => {
    expect(setNonPersonnelCostCategory(17, 9, 'new category')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/expenses/9/category',
      value: 'new category'
    });
  });

  it('dispatches an action for setting a non-personnel cost description', () => {
    expect(setNonPersonnelCostDescription(17, 9, 'new desc')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/expenses/9/description',
      value: 'new desc'
    });
  });

  it('dispatches an action for setting a non-personnel expense cost for a year', () => {
    store.dispatch(setNonPersonnelCostForYear(17, 9, 1997, 2358));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/17/expenses/9/years/1997',
        value: 2358
      },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });
});
