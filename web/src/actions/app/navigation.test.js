import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { goToDashboard, jumpTo, scrollTo } from './navigation';
import { NAVIGATION_SCROLL_TO_WAYPOINT, RESET } from './symbols';

const mockStore = configureStore([thunk]);

describe('navigation actions', () => {
  it('goToDashboard sends a reset action and a route action', () => {
    const store = mockStore();
    const pushRoute = jest.fn();
    pushRoute.mockReturnValue({ type: 'push route' });

    store.dispatch(goToDashboard({ pushRoute }));

    expect(store.getActions()).toEqual([
      { type: RESET },
      { type: 'push route' }
    ]);
  });

  describe('jumpTo sends a waypoint update action', () => {
    it('...if there is a waypoint id', () => {
      const store = mockStore();

      store.dispatch(jumpTo('foo'));

      expect(store.getActions()).toEqual([
        {
          type: NAVIGATION_SCROLL_TO_WAYPOINT,
          data: 'foo'
        }
      ]);
    });

    it('...not if there is no waypoint id', () => {
      const store = mockStore();

      store.dispatch(jumpTo());

      expect(store.getActions()).toEqual([]);

      // wait until the jumping timer has passed before continuing the tests,
      // or else it might muck things up
      return new Promise(resolve => {
        setTimeout(() => resolve(), 150);
      });
    });
  });

  describe('scrollTo sends a waypoint update action', () => {
    it('...if there is a waypoint id', () => {
      const store = mockStore();

      store.dispatch(scrollTo('bar'));

      expect(store.getActions()).toEqual([
        {
          type: NAVIGATION_SCROLL_TO_WAYPOINT,
          data: 'bar'
        }
      ]);
    });

    it('...not if there is no waypoint id', () => {
      const store = mockStore();

      store.dispatch(scrollTo());

      expect(store.getActions()).toEqual([]);
    });

    it('...not if jumpTo was called recently', () => {
      const store = mockStore();

      store.dispatch(jumpTo('one'));
      store.dispatch(scrollTo('two'));

      expect(store.getActions()).toEqual([
        { type: NAVIGATION_SCROLL_TO_WAYPOINT, data: 'one' }
      ]);

      return new Promise(resolve => {
        setTimeout(() => {
          store.dispatch(scrollTo('three'));

          expect(store.getActions()).toEqual([
            { type: NAVIGATION_SCROLL_TO_WAYPOINT, data: 'one' },
            { type: NAVIGATION_SCROLL_TO_WAYPOINT, data: 'three' }
          ]);

          resolve();
        }, 150);
      });
    });
  });
});
