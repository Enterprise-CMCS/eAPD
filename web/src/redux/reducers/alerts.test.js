import alerts from './alerts';
import { ALERT_SUCCESS } from '../actions/alert';

describe('alerts reducer', () => {
  const initialState = {
    messages: []
  };

  const msg = 'this is a message';

  it('should handle initial state', () => {
    expect(alerts(undefined, initialState)).toEqual(initialState);
  });

  describe('success alert', () => {
    it('returns message with variation success', () => {
      expect(
        alerts(initialState, { type: ALERT_SUCCESS, message: msg })
      ).toEqual({
        messages: [
          {
            message: msg,
            variation: 'success'
          }
        ]
      });
    });
  });
});
