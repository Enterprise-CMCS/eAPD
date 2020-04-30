import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { UPDATE_BUDGET } from '../budget';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from './symbols';
import {
  addKeyPerson,
  removeKeyPerson,
  setKeyPersonCost,
  setKeyPersonEmail,
  setKeyPersonHasCosts,
  setKeyPersonName,
  setKeyPersonPercentTime,
  setKeyPersonRole
} from './keyPersonnel';

const mockStore = configureStore([thunk]);

describe('APD edit actions for APD key personnel', () => {
  it('dispatchs an action for adding a key person', () => {
    const store = mockStore('add state');
    store.dispatch(addKeyPerson());

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/keyPersonnel/-',
        state: 'add state'
      }
    ]);
  });

  it('dispatches an action to remove a key person if confirmed', () => {
    const store = mockStore('remove state');
    const global = { confirm: jest.fn().mockReturnValue(true) };

    store.dispatch(removeKeyPerson(17, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/keyPersonnel/17'
      },
      {
        type: UPDATE_BUDGET,
        state: 'remove state'
      }
    ]);
  });

  it('does not dispatch an action to remove a key person if denied', () => {
    const store = mockStore('remove state');
    const global = { confirm: jest.fn().mockReturnValue(false) };

    store.dispatch(removeKeyPerson(19, { global }));

    expect(store.getActions()).toEqual([]);
  });

  it('dispatches an action for setting a key person name', () => {
    expect(setKeyPersonName(1, 'person name')).toEqual({
      type: EDIT_APD,
      path: '/keyPersonnel/1/name',
      value: 'person name'
    });
  });

  it('dispatches an action for setting a key person email', () => {
    expect(setKeyPersonEmail(3, 'person email')).toEqual({
      type: EDIT_APD,
      path: '/keyPersonnel/3/email',
      value: 'person email'
    });
  });

  it('dispatches an action for setting a key person role', () => {
    expect(setKeyPersonRole(5, 'person role')).toEqual({
      type: EDIT_APD,
      path: '/keyPersonnel/5/position',
      value: 'person role'
    });
  });

  it('dispatches an action for setting a key person percent time', () => {
    /*
    expect(setKeyPersonPercentTime(7, 1967, 3.25)).toEqual({
      type: EDIT_APD,
      path: '/keyPersonnel/7/percentTime/1967',
      value: 3.25
    });
*/

    const store = mockStore('key person state');
    store.dispatch(setKeyPersonPercentTime(7, 1967, 3.25));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/keyPersonnel/7/percentTime/1967',
        value: 3.25
      },
      {
        type: UPDATE_BUDGET,
        state: 'key person state'
      }
    ]);
  });

  it('dispatches an action for setting whether a key person has costs', () => {
    const store = mockStore('state');
    store.dispatch(setKeyPersonHasCosts(11, true));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/keyPersonnel/11/hasCosts',
        value: true
      },
      {
        type: UPDATE_BUDGET,
        state: 'state'
      }
    ]);
  });

  it('dispatches an action for setting a key person cost for a year', () => {
    const store = mockStore('another state');
    store.dispatch(setKeyPersonCost(13, 1973, 3572));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/keyPersonnel/13/costs/1973',
        value: 3572
      },
      {
        type: UPDATE_BUDGET,
        state: 'another state'
      }
    ]);
  });
});
