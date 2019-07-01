import {
  AUTH_CHECK_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from '../actions/auth';
import {
  ADMIN_EDIT_ME_ERROR,
  ADMIN_EDIT_ME_REQUEST,
  ADMIN_EDIT_ME_SUCCESS
} from '../actions/admin';

import user, { getIsAdmin } from './user';

describe('user reducer and selectors', () => {
  describe('user reducer', () => {
    const initialState = {
      error: false,
      fetching: false,
      loaded: false,
      data: { email: '', id: '', name: '', phone: '', position: '', state: '' }
    };

    it('should handle initial state', () => {
      expect(user(undefined, {})).toEqual(initialState);
    });

    it('should handle user edit requests', () => {
      [ADMIN_EDIT_ME_REQUEST].forEach(action => {
        expect(user(initialState, { type: action })).toEqual({
          ...initialState,
          fetching: true
        });
      });
    });

    it('should handle a successful user fetch, user check, own-account change, or login', () => {
      [AUTH_CHECK_SUCCESS, LOGIN_SUCCESS, ADMIN_EDIT_ME_SUCCESS].forEach(
        action => {
          expect(
            user(initialState, {
              type: action,
              data: { this: 'is', my: 'user' }
            })
          ).toEqual({
            ...initialState,
            fetching: false,
            error: false,
            loaded: true,
            data: { this: 'is', my: 'user' }
          });
        }
      );
    });

    it('should handle user edit completions and failures', () => {
      [ADMIN_EDIT_ME_ERROR].forEach(action => {
        expect(user(initialState, { type: action })).toEqual({
          ...initialState,
          error: true,
          fetching: false
        });
      });
    });

    it('should handle a logout', () => {
      expect(user({ not: 'initial state' }, { type: LOGOUT_SUCCESS })).toEqual(
        initialState
      );
    });
  });

  describe('getIsAdmin selector', () => {
    it('returns true if the user is an admin', () => {
      expect(
        getIsAdmin({
          user: { data: { role: 'admin' } }
        })
      ).toEqual(true);
    });

    it('returns false if the user is not an admin', () => {
      expect(
        getIsAdmin({
          user: { data: { role: 'not an admin' } }
        })
      ).toEqual(false);
    });
  });
});
