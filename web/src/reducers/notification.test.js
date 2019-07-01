import notification from './notification';
import {
  ADD_NOTIFICATION,
  CLOSE_NOTIFICATION,
  PROCESS_QUEUE
} from '../actions/notification';

describe('notification reducer', () => {
  const initialState = {
    open: false,
    messageInfo: {},
    queue: []
  };

  it('should handle initial state', () => {
    expect(notification(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_NOTIFICATION', () => {
    const newState = notification(initialState, {
      type: ADD_NOTIFICATION,
      message: 'foo'
    });

    expect(newState.queue.map(q => q.message)).toEqual(['foo']);
  });

  it('should handle CLOSE_NOTIFICATION', () => {
    const state = { ...initialState, open: true };
    expect(notification(state, { type: CLOSE_NOTIFICATION })).toEqual({
      ...state,
      open: false
    });
  });

  it('should handle PROCESS_QUEUE', () => {
    const state = { open: false, messageInfo: 'a', queue: ['b', 'c', 'd'] };
    expect(notification(state, { type: PROCESS_QUEUE })).toEqual({
      open: true,
      messageInfo: 'b',
      queue: ['c', 'd']
    });
  });
});
