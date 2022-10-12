import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { EDIT_APD } from '../editApd';
import {
  setCostAllocationMethodology,
  setCostAllocationOtherFunding,
  setCostAllocationFFPFundingSplit,
  setCostAllocationFFPOtherFunding,
  setFFPForContractorCostsForFiscalQuarter,
  setFFPForInHouseCostsForFiscalQuarter
} from './costAllocate';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for cost allocation section', () => {
  const store = mockStore('test state');

  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches an action for setting the cost allocation methodology', () => {
    store.dispatch(
      setCostAllocationMethodology(1, 'ask nicely for some money')
    );

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/1/costAllocationNarrative/methodology',
        value: 'ask nicely for some money'
      }
    ]);
  });

  it('dispatches an action for setting the cost allocation other funding', () => {
    store.dispatch(
      setCostAllocationOtherFunding(1, 2020, 'rich Uncle Pennybags')
    );

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/1/costAllocationNarrative/years/2020/otherSources',
        value: 'rich Uncle Pennybags'
      }
    ]);
  });

  it('dispatches an action for setting the cost allocation FFP other funding', () => {
    store.dispatch(setCostAllocationFFPOtherFunding(1, 2020, 300));
    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/1/costAllocation/2020/other',
        value: 300
      }
    ]);
  });

  it('dispatches an action for setting the cost allocation FFP other funding', () => {
    store.dispatch(setCostAllocationFFPFundingSplit(1, 2020, 300, 400));
    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/1/costAllocation/2020/ffp/federal',
        value: 300
      },
      {
        type: EDIT_APD,
        path: '/activities/1/costAllocation/2020/ffp/state',
        value: 400
      }
    ]);
  });

  it('dispatches an action for setting the FFP payment for contractor costs for a fiscal quarter', () => {
    store.dispatch(setFFPForContractorCostsForFiscalQuarter(1, 2020, 4, 340));
    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/1/quarterlyFFP/2020/4/contractors',
        value: 340
      }
    ]);
  });

  it('dispatches an action for setting the FFP payment for in-house costs for a fiscal quarter', () => {
    store.dispatch(setFFPForInHouseCostsForFiscalQuarter(1, 2020, 2, 400));
    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/1/quarterlyFFP/2020/2/inHouse',
        value: 400
      }
    ]);
  });
});
