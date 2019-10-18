import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { UPDATE_BUDGET } from '../budget';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';

import {
  addPersonnel,
  removePersonnel,
  setPersonnelCostForYear,
  setPersonnelDescription,
  setPersonnelFTEForYear,
  setPersonnelTitle
} from './statePersonnel';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for state personnel section', () => {
  const store = mockStore('test state');

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding a state personnel', () => {
    store.dispatch(addPersonnel(17));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/17/statePersonnel/-',
        state: 'test state'
      },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });

  it('dispatches an action for removing a state personnel if approved', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(true);

    store.dispatch(removePersonnel(17, 9, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/activities/17/statePersonnel/9'
      },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });

  it('does not dispatch an action for removing a state personnel if denied', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(false);

    store.dispatch(removePersonnel(17, 9, { global }));

    expect(store.getActions()).toEqual([]);
  });

  it('dispatches an action for setting a state personnel title', () => {
    expect(setPersonnelTitle(17, 9, 'new title')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/statePersonnel/9/title',
      value: 'new title'
    });
  });

  it('dispatches an action for setting a state personnel description', () => {
    expect(setPersonnelDescription(17, 9, 'new desc')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/statePersonnel/9/description',
      value: 'new desc'
    });
  });

  it('dispatches an action for setting a state personnel cost for a year', () => {
    store.dispatch(setPersonnelCostForYear(17, 9, 1997, 2358));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/17/statePersonnel/9/years/1997/amt',
        value: 2358
      },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });

  it('dispatches an action for setting a state personnel FTE for a year', () => {
    store.dispatch(setPersonnelFTEForYear(17, 9, 1997, 3));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/17/statePersonnel/9/years/1997/perc',
        value: 3
      },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });
});
