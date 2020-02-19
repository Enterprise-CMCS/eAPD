import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';

import {
  addObjective,
  addObjectiveKeyResult,
  removeObjective,
  setObjective,
  setObjectiveKeyResult,
  setObjectiveKeyResultBaseline,
  setObjectiveKeyResultTarget
} from './objectives';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for objectives and key result section', () => {
  const store = mockStore('test state');

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding an objective', () => {
    store.dispatch(addObjective(17));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/17/objectives/-',
        state: 'test state'
      }
    ]);
  });

  it('dispatches an action for removing an objective if approved', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(true);

    store.dispatch(removeObjective(17, 9, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/activities/17/objectives/9'
      }
    ]);
  });

  it('does not dispatch an action for removing an objective if denied', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(false);

    store.dispatch(removeObjective(17, 9, { global }));

    expect(store.getActions()).toEqual([]);
  });

  it('dispatches an action for setting an objective description', () => {
    expect(setObjective(17, 9, 'new description')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/objectives/9/objective',
      value: 'new description'
    });
  });

  it('dispatches an action for adding a key result to an objective', () => {
    store.dispatch(addObjectiveKeyResult(17, 9));
    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/17/objectives/9/keyResults/-',
        state: 'test state'
      }
    ]);
  });

  it('dispatches an action for setting a key result', () => {
    expect(setObjectiveKeyResult(32, 83, 2, 'key result')).toEqual({
      type: EDIT_APD,
      path: '/activities/32/objectives/83/keyResults/2/keyResult',
      value: 'key result'
    });
  });

  it('dispatches an action for setting a key result baseline', () => {
    expect(setObjectiveKeyResultBaseline(32, 83, 2, 'new baseline')).toEqual({
      type: EDIT_APD,
      path: '/activities/32/objectives/83/keyResults/2/baseline',
      value: 'new baseline'
    });
  });

  it('dispatches an action for setting a key result target', () => {
    expect(setObjectiveKeyResultTarget(32, 83, 2, 'new target')).toEqual({
      type: EDIT_APD,
      path: '/activities/32/objectives/83/keyResults/2/target',
      value: 'new target'
    });
  });
});
