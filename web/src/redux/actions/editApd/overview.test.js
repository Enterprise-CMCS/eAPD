import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_APD_YEAR, EDIT_APD, REMOVE_APD_YEAR } from './symbols';
import {
  addYear,
  removeYear,
  setBusinessAreaField,
  setNarrativeForHIT,
  setNarrativeForHIE,
  setNarrativeForMMIS,
  setProgramOverview,
  setUpdateStatusField
} from './overview';

const mockStore = configureStore([thunk]);

describe('APD edit actions for APD update status', () => {
  it('dispatches an action for changing a field', () => {
    expect(setUpdateStatusField('isUpdateAPD', false)).toEqual({
      type: EDIT_APD,
      path: '/apdOverview/updateStatus/isUpdateAPD',
      value: false
    });
  });
});

describe('APD edit actions for adding or removing APD years', () => {
  it('dispatchs an action for adding an APD year', () => {
    const store = mockStore('add year state');

    store.dispatch(addYear('1234'));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_YEAR,
        value: '1234',
        state: 'add year state'
      }
    ]);
  });

  it('dispatchs an action for removing an APD year', () => {
    const store = mockStore('remove year state');

    store.dispatch(removeYear('1234'));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_YEAR,
        value: '1234',
        state: 'remove year state'
      }
    ]);
  });
});

describe('APD edit actions for APD overview and HIE/HIT/MMIS narratives', () => {
  it('dispatches an action for setting the program overview', () => {
    expect(setProgramOverview('overview')).toEqual({
      type: EDIT_APD,
      path: '/apdOverview/programOverview',
      value: 'overview'
    });
  });

  it('dispatches an action for setting the HIT narrative', () => {
    expect(setNarrativeForHIT('narrative')).toEqual({
      type: EDIT_APD,
      path: '/apdOverview/narrativeHIT',
      value: 'narrative'
    });
  });

  it('dispatches an action for setting the HIE narrative', () => {
    expect(setNarrativeForHIE('narrative')).toEqual({
      type: EDIT_APD,
      path: '/apdOverview/narrativeHIE',
      value: 'narrative'
    });
  });

  it('dispatches an action for setting the MMIS narrative', () => {
    expect(setNarrativeForMMIS('narrative')).toEqual({
      type: EDIT_APD,
      path: '/apdOverview/narrativeMMIS',
      value: 'narrative'
    });
  });
});

describe('APD edit actions for Medicaid Business Areas', () => {
  it('dispatches an action for changing a field', () => {
    expect(setBusinessAreaField('waiverSupportSystems', false)).toEqual({
      type: EDIT_APD,
      path: '/apdOverview/medicaidBusinessAreas/waiverSupportSystems',
      value: false
    });
  });
});
