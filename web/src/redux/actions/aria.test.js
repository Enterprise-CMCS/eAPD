import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  ARIA_ANNOUNCE_CHANGE,
  ariaAnnounceApdLoaded,
  ariaAnnounceApdLoading,
  ariaAnnounceFFPQuarterly
} from './aria';

const mockStore = configureStore([thunk]);

describe('aria actions', () => {
  it('adds an ARIA announce when an APD has finished loading', () => {
    const store = mockStore();
    store.dispatch(ariaAnnounceApdLoaded());
    expect(store.getActions()).toEqual([
      {
        type: ARIA_ANNOUNCE_CHANGE,
        message:
          'Your APD is loaded and ready to edit. Changes to this APD will be saved automatically.'
      }
    ]);
  });

  it('adds an ARIA announce when an APD begins loading', () => {
    const store = mockStore();
    store.dispatch(ariaAnnounceApdLoading());
    expect(store.getActions()).toEqual([
      {
        type: ARIA_ANNOUNCE_CHANGE,
        message: 'Your APD is loading.'
      }
    ]);
  });

  it('ariaAnnounceFFPQuarterly creates ARIA_ANNOUNCE_CHANGE action', () => {
    const state = {
      budget: {
        activities: {
          '0123': {
            quarterlyFFP: {
              2019: {
                1: {
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
    };

    const store = mockStore(state);
    store.dispatch(ariaAnnounceFFPQuarterly('0123', '2019', '1', 'combined'));
    expect(store.getActions()).toEqual([
      {
        type: ARIA_ANNOUNCE_CHANGE,
        message: '700 dollars'
      }
    ]);
  });
});
