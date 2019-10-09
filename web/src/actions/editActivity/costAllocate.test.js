import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {EDIT_APD} from '../editApd';
import {
    setCostAllocationMethodology,
    setCostAllocationOtherFunding
  } from './costAllocate';

const mockStore = configureStore([thunk]);

describe('APD activity edit actions for cost allocation section', () => {
    const store = mockStore('test state');
  
    beforeEach(() => {
      store.clearActions();
    });
  
    it('dispatches an action for setting the cost allocation methodology', () => {
      store.dispatch(setCostAllocationMethodology(1, 'ask nicely for some money'));
  
      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: '/activities/1/costAllocationDesc',
          value: 'ask nicely for some money'
        }
      ]);
    });
  
    it('dispatches an action for setting the cost allocation other funding', () => {
      store.dispatch(setCostAllocationOtherFunding(1, 'rich Uncle Pennybags'));
  
      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: '/activities/1/otherFundingDesc',
          value: 'rich Uncle Pennybags'
        }
      ]);
    });
});