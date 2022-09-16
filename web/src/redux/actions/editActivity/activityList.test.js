import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  ADD_APD_ITEM,
  APD_ACTIVITIES_CHANGE,
  EDIT_APD,
  REMOVE_APD_ITEM
} from '../editApd';

import {
  addActivity,
  removeActivity,
  setActivityName,
  setActivityFundingSource
} from './activityList';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for overview section', () => {
  const state = {
    apd: {
      data: {
        activities: []
      }
    }
  };
  const store = mockStore(state);

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding an activity', () => {
    store.dispatch(addActivity());

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/-',
        state
      },
      { type: APD_ACTIVITIES_CHANGE, activities: [] }
    ]);
  });

  it('dispatches an action for removing an activity if confirmed', () => {
    store.dispatch(removeActivity(3));

    expect(store.getActions()).toEqual([
      { type: REMOVE_APD_ITEM, path: '/activities/3' },
      { type: APD_ACTIVITIES_CHANGE, activities: [] }
    ]);
  });

  it('dispatches correct actions when setting an activity name', () => {
    store.dispatch(setActivityName(53, 'new name', 'apd/activity/53/overview'));
    expect(store.getActions()).toEqual([
      { type: EDIT_APD, path: '/activities/53/name', value: 'new name' },
      {
        type: APD_ACTIVITIES_CHANGE,
        activities: [],
        url: '/apd/activity/53/overview'
      }
    ]);
  });

  it('dispatches an action for setting an activity funding source', () => {
    store.dispatch(setActivityFundingSource(13, 'funding source'));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/13/fundingSource',
        value: 'funding source'
      }
    ]);
  });
});
