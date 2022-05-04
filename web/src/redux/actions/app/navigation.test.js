import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { goToDashboard } from './navigation';
import { RESET } from './symbols';

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
});
