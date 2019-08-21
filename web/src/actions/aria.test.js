import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ARIA_ANNOUNCE_CHANGE, ariaAnnounceFFPQuarterly } from './aria';

const mockStore = configureStore([thunk]);

describe('aria actions', () => {
  it('ariaAnnounceFFPQuarterly creates ARIA_ANNOUNCE_CHANGE action', () => {
    const state = {
      budget: {
        activities: {
          '0123': {
            quarterlyFFP: {
              '2019': {
                '1': {
                  combined: {
                    dollars: '700',
                    percent: '100'
                  }
                }
              }
            }
          }
        }
      }
    }

    const store = mockStore(state);
    store.dispatch(ariaAnnounceFFPQuarterly('0123', '2019', '1', 'combined'));
    expect(store.getActions()).toEqual([{
      type: ARIA_ANNOUNCE_CHANGE,
      message: '700'
    }])
  });
});