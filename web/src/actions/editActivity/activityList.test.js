import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { UPDATE_BUDGET } from '../budget';

import {
  ADD_APD_ITEM,
  APD_ACTIVITIES_CHANGE,
  EDIT_APD,
  REMOVE_APD_ITEM
} from '../editApd/symbols';

import {
  addActivity,
  removeActivity,
  setActivityName,
  setActivityFundingSource
} from './activityList';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for overview section', () => {
  const store = mockStore('test state');

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding an activity', () => {
    store.dispatch(addActivity());

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/-',
        state: 'test state'
      },
      {
        type: APD_ACTIVITIES_CHANGE,
        activities: []
      },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });

  it('dispatches an action for removing an activity if confirmed', () => {
    const global = { confirm: jest.fn().mockReturnValue(true) };

    store.dispatch(removeActivity(3, { global }));

    expect(store.getActions()).toEqual([
      { type: REMOVE_APD_ITEM, path: '/activities/3' },
      { type: APD_ACTIVITIES_CHANGE, activities: [] },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });

  it('does not dispatch an action for removing an activity if denied', () => {
    const global = { confirm: jest.fn().mockReturnValue(false) };

    store.dispatch(removeActivity(3, { global }));

    expect(store.getActions()).toEqual([]);
  });

  it('dispatches an action for setting an activity name', () => {
    expect(setActivityName(53, 'new name')).toEqual({
      type: EDIT_APD,
      path: '/activities/53/name',
      value: 'new name'
    });
  });

  it('dispatches an action for setting an activity funding source', () => {
    store.dispatch(setActivityFundingSource(13, 'funding source'));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/13/fundingSource',
        value: 'funding source'
      },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });
});
