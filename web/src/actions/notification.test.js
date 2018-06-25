import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './notification';

const mockStore = configureStore([thunk]);

describe('notification actions', () => {
  it('addNotification should create ADD_NOTIFICATION action', () => {
    expect(actions.addNotification('foo')).toEqual({
      type: actions.ADD_NOTIFICATION,
      message: 'foo'
    });
  });

  it('closeNotification should create CLOSE_NOTIFICATION action', () => {
    expect(actions.closeNotification()).toEqual({
      type: actions.CLOSE_NOTIFICATION
    });
  });

  describe('processQueue', () => {
    it('should create PROCESS_QUEUE action if queue is not empty', () => {
      const state = { notification: { queue: [1, 2, 3] } };
      const store = mockStore(state);
      const expectedActions = [{ type: actions.PROCESS_QUEUE }];

      store.dispatch(actions.processQueue());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create no actions if queue is empty', () => {
      const state = { notification: { queue: [] } };
      const store = mockStore(state);

      store.dispatch(actions.processQueue());
      expect(store.getActions().length).toEqual(0);
    });
  });

  describe('notify', () => {
    it('should create ADD_NOTIFICATION and CLOSE_NOTIFICATION if currently open', () => {
      const state = { notification: { open: true } };
      const store = mockStore(state);
      const expectedActions = [
        { type: actions.ADD_NOTIFICATION, message: 'boom!' },
        { type: actions.CLOSE_NOTIFICATION }
      ];

      store.dispatch(actions.notify('boom!'));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create ADD_NOTIFICATION and PROCESS_QUEUE if none open', () => {
      const state = { notification: { open: false, queue: [1] } };
      const store = mockStore(state);
      const expectedActions = [
        { type: actions.ADD_NOTIFICATION, message: 'boom!' },
        { type: actions.PROCESS_QUEUE }
      ];

      store.dispatch(actions.notify('boom!'));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
