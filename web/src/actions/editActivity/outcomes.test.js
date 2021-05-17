import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';

import {
  addOutcome,
  addOutcomeMetric,
  removeOutcome,
  setOutcome,
  setOutcomeMetric
} from './outcomes';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for outcomes and metrics section', () => {
  const store = mockStore('test state');

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding an outcome', () => {
    store.dispatch(addOutcome(17));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/17/outcomes/-',
        state: 'test state'
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

  it('dispatches an action for setting an outcome description', () => {
    expect(setOutcome(17, 9, 'new description')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/outcomes/9/outcome',
      value: 'new description'
    });
  });

  it('dispatches an action for adding a metric to an outcome', () => {
    store.dispatch(addOutcomeMetric(17, 9));
    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/17/outcomes/9/metrics/-',
        state: 'test state'
      }
    ]);
  });

  it('dispatches an action for setting a metric', () => {
    expect(setOutcomeMetric(32, 83, 2, 'metric')).toEqual({
      type: EDIT_APD,
      path: '/activities/32/outcomes/83/metrics/2/metric',
      value: 'metric'
    });
  });
});
