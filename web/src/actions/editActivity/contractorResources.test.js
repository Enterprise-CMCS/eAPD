import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { UPDATE_BUDGET } from '../budget';

import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd/symbols';

import {
  addContractor,
  removeContractor,
  setContractorCostForYear,
  setContractorDescription,
  setContractorEndDate,
  setContractorHourlyRateForYear,
  setContractorNumberOfHoursForYear,
  setContractorIsHourly,
  setContractorName,
  setContractorStartDate,
  setContractorTotalCost
} from './contractorResources';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for contractor resources section', () => {
  const state = {
    apd: {
      data: {
        activities: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          {
            contractorResources: [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              {
                hourly: {
                  data: {
                    '1997': {
                      hours: 1234,
                      rate: 4321
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }
  };

  const store = mockStore(state);

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for adding a contractor resource', () => {
    store.dispatch(addContractor(17));

    expect(store.getActions()).toEqual([
      {
        type: ADD_APD_ITEM,
        path: '/activities/17/contractorResources/-',
        state
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });

  it('dispatches an action for removing a contractor resource if approved', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(true);

    store.dispatch(removeContractor(17, 9, { global }));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_APD_ITEM,
        path: '/activities/17/contractorResources/9'
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });

  it('does not dispatch an action for removing a contractor resource if denied', () => {
    const global = {
      confirm: jest.fn()
    };
    global.confirm.mockReturnValue(false);

    store.dispatch(removeContractor(17, 9, { global }));

    expect(store.getActions()).toEqual([]);
  });

  it('dispatches an action for setting a contractor name', () => {
    expect(setContractorName(17, 9, 'new name')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/contractorResources/9/name',
      value: 'new name'
    });
  });

  it('dispatches an action for setting a contractor description', () => {
    expect(setContractorDescription(17, 9, 'new desc')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/contractorResources/9/description',
      value: 'new desc'
    });
  });

  it('dispatches an action for setting a contractor start date', () => {
    expect(setContractorStartDate(17, 9, 'new date')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/contractorResources/9/start',
      value: 'new date'
    });
  });

  it('dispatches an action for setting a contractor end date', () => {
    expect(setContractorEndDate(17, 9, 'new date')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/contractorResources/9/end',
      value: 'new date'
    });
  });

  it('dispatches an action for setting a contractor total cost', () => {
    expect(setContractorTotalCost(17, 9, 43838)).toEqual({
      type: EDIT_APD,
      path: '/activities/17/contractorResources/9/totalCost',
      value: 43838
    });
  });

  it('dispatches an action for setting a contractor cost for a year', () => {
    store.dispatch(setContractorCostForYear(17, 9, 1997, 2358));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/17/contractorResources/9/years/1997',
        value: 2358
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });

  it('dispatches an action for setting whether a contractor is hourly', () => {
    store.dispatch(setContractorIsHourly(17, 9, 'new flag'));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/17/contractorResources/9/hourly/useHourly',
        value: 'new flag'
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });

  it('dispatches an action for setting a contractor hourly rate for a year', () => {
    store.dispatch(setContractorHourlyRateForYear(17, 9, 1997, 6442));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/17/contractorResources/9/hourly/data/1997/rate',
        value: 6442
      },
      {
        type: EDIT_APD,
        path: '/activities/17/contractorResources/9/years/1997',
        // 1234 hours * 6442 rate = 7949428
        value: 7949428
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });

  it('dispatches an action for setting a contractor hour count for a year', () => {
    store.dispatch(setContractorNumberOfHoursForYear(17, 9, 1997, 3));

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/17/contractorResources/9/hourly/data/1997/hours',
        value: 3
      },
      {
        type: EDIT_APD,
        path: '/activities/17/contractorResources/9/years/1997',
        // 3 hours * 4321 rate = 12963
        value: 12963
      },
      { type: UPDATE_BUDGET, state }
    ]);
  });
});
