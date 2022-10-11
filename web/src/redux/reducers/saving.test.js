import {
  SAVE_APD_FAILURE,
  SAVE_APD_REQUEST,
  SAVE_APD_SUCCESS,
  SELECT_APD_SUCCESS
} from '../actions/app';

import reducer, {
  selectHasError,
  selectError,
  selectIsSaving,
  selectLastSaved
} from './saving';

describe('saving state reducer and selectors', () => {
  describe('the reducer', () => {
    it('handles the default case', () => {
      expect(reducer(undefined, {})).toEqual({
        error: false,
        lastSaved: '',
        saving: false
      });
    });

    it('updates when an APD fails to save', () => {
      expect(
        reducer({ error: 'nope', saving: true }, { type: SAVE_APD_FAILURE })
      ).toEqual({ error: true, saving: false });
    });

    it('updates when an APD begins to save', () => {
      expect(
        reducer({ error: 'maybe', saving: false }, { type: SAVE_APD_REQUEST })
      ).toEqual({
        error: 'maybe',
        saving: true
      });
    });

    it('updates when an APD saves successfully', () => {
      expect(
        reducer(
          { error: 'who can say', lastSaved: 'bob', saving: true },
          {
            type: SAVE_APD_SUCCESS,
            // March 11, 2020, 10:53 AM CDT: When this test was written. Truly
            // a red-letter day in science.
            apd: { updated: '2020-03-11T10:53:00-0500' }
          }
        )
      ).toEqual({
        error: false,
        // The tests are run in the US locale, but in UTC timezone, so expect
        // the time above (CDT) to be adjusted accordingly.
        lastSaved: '3/11/2020, 3:53:00 PM',
        saving: false
      });
    });

    it('updates when an APD is selected', () => {
      expect(
        reducer(
          { error: 'moop moop', lastSaved: 'builder', saving: true },
          // Marie Curie is selected for the Nobel Prize for Chemistry,
          // becoming the first person in history to receive two.
          { type: SELECT_APD_SUCCESS, apd: { updated: '1911-11-07T00:00:00Z' } }
        )
      ).toEqual({
        error: false,
        lastSaved: '11/7/1911, 12:00:00 AM',
        saving: false
      });
    });
  });

  describe('the selectors', () => {
    it('selects where there is an error', () => {
      expect(
        selectHasError({ saving: { error: 'this is the error' } })
      ).toEqual(true);
    });

    it('selects the error if there is one', () => {
      expect(selectError({ saving: { error: 'this is the error' } })).toEqual(
        'this is the error'
      );
    });

    it('selects whether the APD is currently saving', () => {
      expect(selectIsSaving({ saving: { saving: 'yep' } })).toEqual('yep');
    });

    it('selects the last save date/tiem for the APD', () => {
      expect(
        selectLastSaved({ saving: { lastSaved: 'once upon a time' } })
      ).toEqual('once upon a time');
    });
  });
});
