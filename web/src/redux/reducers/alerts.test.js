import alerts from './alerts';

import { CREATE_APD_SUCCESS } from '../actions/app';

describe('alerts reducer', () => {
  const initialState = {
    tempMessages: []
  };

  it('should handle initial state', () => {
    expect(alerts(undefined, initialState)).toEqual(initialState);
  });

  describe('create APD success message', () => {
    it('an APD is created', () => {
      expect(alerts(undefined, { type: CREATE_APD_SUCCESS })).toEqual({
        tempMessages: [
          {
            message:
              'You have successfully created an APD. Select continue to fill out the rest of the APD.',
            variation: 'success'
          }
        ]
      });
    });
  });
});
