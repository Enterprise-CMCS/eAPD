import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../../util/api';
import { getStates, STATES_SUCCESS } from './states';

let spy;

const state = {
  app: {
    states: []
  }
};

const mockStore = configureStore([thunk]);
const store = mockStore(state);

describe('States actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getStates', () => {
    it('on success, it stores the states in redux', async () => {
      spy = jest.spyOn(axios, 'get').mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: [
            {
              id: 'mo',
              name: 'Missouri'
            },
            {
              id: 'al',
              name: 'Alabama'
            }
          ]
        })
      );

      await store.dispatch(getStates());
      expect(spy).toHaveBeenCalledWith('/states');
      expect(store.getActions()).toEqual([
        {
          type: STATES_SUCCESS,
          data: [
            {
              id: 'mo',
              name: 'Missouri'
            },
            {
              id: 'al',
              name: 'Alabama'
            }
          ]
        }
      ]);
    });
  });
});
