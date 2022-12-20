import errors from './errors';

import { CREATE_APD_SUCCESS } from '../actions/app';

describe('errors reducer', () => {
  const initialState = {
    tempMessages: []
  };

  it('should handle initial state', () => {
    expect(errors(undefined, initialState)).toEqual(initialState);
  });

  describe('create APD success message', () => {
    it('an APD is created', () => {
      expect(errors(undefined, { type: CREATE_APD_SUCCESS })).toEqual({
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
