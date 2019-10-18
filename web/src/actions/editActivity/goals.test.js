import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';

import {
  addGoal,
  removeGoal,
  setGoalObjective,
  setGoalDescription
} from './goals';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for goals section', () => {
  const store = mockStore('test state');

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding a goal', () => {
    store.dispatch(addGoal(17));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/17/goals/-',
        state: 'test state'
      }
    ]);
  });

  it('dispatches an action for removing a goal if approved', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(true);

    store.dispatch(removeGoal(17, 9, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/activities/17/goals/9'
      }
    ]);
  });

  it('does not dispatch an action for removing a goal if denied', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(false);

    store.dispatch(removeGoal(17, 9, { global }));

    expect(store.getActions()).toEqual([]);
  });

  it('dispatches an action for setting a goal description', () => {
    expect(setGoalDescription(17, 9, 'new description')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/goals/9/description',
      value: 'new description'
    });
  });

  it('dispatches an action for setting a goal objective', () => {
    expect(setGoalObjective(17, 9, 'new objective')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/goals/9/objective',
      value: 'new objective'
    });
  });
});
