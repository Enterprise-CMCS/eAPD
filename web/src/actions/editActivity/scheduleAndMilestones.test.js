import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';

import {
  addMilestone,
  removeMilestone,
  setActivityEndDate,
  setActivityStartDate,
  setMilestoneEndDate,
  setMilestoneName
} from './scheduleAndMilestones';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for activity schedule and milestones section', () => {
  const store = mockStore('test state');

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding a milestone', () => {
    store.dispatch(addMilestone(17));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/17/schedule/-',
        state: 'test state'
      }
    ]);
  });

  it('dispatches an action for removing a milestone if approved', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(true);

    store.dispatch(removeMilestone(17, 9, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/activities/17/schedule/9'
      }
    ]);
  });

  it('does not dispatch an action for removing a milestone if denied', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(false);

    store.dispatch(removeMilestone(17, 9, { global }));

    expect(store.getActions()).toEqual([]);
  });

  it('dispatches an action for setting an activity end date', () => {
    expect(setActivityEndDate(17, 'new date')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/plannedEndDate',
      value: 'new date'
    });
  });

  it('dispatches an action for setting an activity start date', () => {
    expect(setActivityStartDate(17, 'new date')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/plannedStartDate',
      value: 'new date'
    });
  });

  it('dispatches an action for setting a milestone end date', () => {
    expect(setMilestoneEndDate(17, 9, 'new date')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/schedule/9/endDate',
      value: 'new date'
    });
  });

  it('dispatches an action for setting a milestone name', () => {
    expect(setMilestoneName(17, 9, 'new name')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/schedule/9/milestone',
      value: 'new name'
    });
  });
});
