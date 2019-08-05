import errors, {
  getAddAccountError,
  getEditAccountError,
  getEditOwnAccountError,
  getError,
  getSaveApdError
} from './errors';

import {
  ADMIN_CREATE_USER_ERROR,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_EDIT_ACCOUNT_ERROR,
  ADMIN_EDIT_ACCOUNT_REQUEST,
  ADMIN_EDIT_ACCOUNT_SUCCESS,
  ADMIN_EDIT_ME_ERROR,
  ADMIN_EDIT_ME_REQUEST,
  ADMIN_EDIT_ME_SUCCESS
} from '../actions/admin';
import {
  SAVE_APD_FAILURE,
  SAVE_APD_REQUEST,
  SAVE_APD_SUCCESS
} from '../actions/apd';

describe('errors reducer', () => {
  const initialState = {
    addAccount: false,
    editAccount: false,
    editOwnAccount: false,
    saveApd: false
  };

  it('should handle initial state', () => {
    expect(errors(undefined, {})).toEqual(initialState);
  });

  describe('request/start actions reset error props to false', () => {
    const state = {
      addAccount: 'error message',
      editAccount: 'error message',
      editOwnAccount: 'error message',
      saveApd: 'error message'
    };
    [
      ['a user account is created', ADMIN_CREATE_USER_REQUEST, 'addAccount'],
      ['a user account is edited', ADMIN_EDIT_ACCOUNT_REQUEST, 'editAccount'],
      ['a user saves their account', ADMIN_EDIT_ME_REQUEST, 'editOwnAccount'],
      ['an APD is saved', SAVE_APD_REQUEST, 'saveApd']
    ].forEach(([test, type, prop]) => {
      it(test, () => {
        expect(errors(state, { type })).toEqual({
          ...state,
          [prop]: false
        });
      });
    });
  });

  describe('successful actions reset error props to false', () => {
    const state = {
      addAccount: 'error message',
      editAccount: 'error message',
      editOwnAccount: 'error message',
      saveApd: 'error message'
    };
    [
      ['a user account is created', ADMIN_CREATE_USER_SUCCESS, 'addAccount'],
      ['a user account is edited', ADMIN_EDIT_ACCOUNT_SUCCESS, 'editAccount'],
      ['a user saves their account', ADMIN_EDIT_ME_SUCCESS, 'editOwnAccount'],
      ['an APD is saved', SAVE_APD_SUCCESS, 'saveApd']
    ].forEach(([test, type, prop]) => {
      it(test, () => {
        expect(errors(state, { type })).toEqual({
          ...state,
          [prop]: false
        });
      });
    });
  });

  describe('error actions set error props to messages', () => {
    const state = {
      addAccount: false,
      editAccount: false,
      editOwnAccount: false,
      saveApd: false
    };
    [
      ['a user account is created', ADMIN_CREATE_USER_ERROR, 'addAccount'],
      ['a user account is edited', ADMIN_EDIT_ACCOUNT_ERROR, 'editAccount'],
      ['a user saves their account', ADMIN_EDIT_ME_ERROR, 'editOwnAccount'],
      ['an APD is saved', SAVE_APD_FAILURE, 'saveApd']
    ].forEach(([test, type, prop]) => {
      it(test, () => {
        expect(errors(state, { type })).toMatchObject({
          ...state,
          [prop]: expect.stringMatching(/^.+$/)
        });
      });
    });
  });

  describe('selectors', () => {
    const state = {
      errors: {
        addAccount: 'add account',
        editAccount: 'edit account',
        editOwnAccount: 'edit self',
        saveApd: 'save apd'
      }
    };

    it('can fetch "add account" error state', () => {
      expect(getAddAccountError(state)).toEqual('add account');
    });

    it('can fetch "edit account" error state', () => {
      expect(getEditAccountError(state)).toEqual('edit account');
    });

    it('can fetch "edit self" error state', () => {
      expect(getEditOwnAccountError(state)).toEqual('edit self');
    });

    it('can fetch "save apd" error state', () => {
      expect(getSaveApdError(state)).toEqual('save apd');
    });
  });

  describe('error test helper function', () => {
    it('gives the fallback message if there is no raw message/error key', () => {
      expect(getError(null, 'fallback')).toEqual('fallback');
    });

    it('gets the most-specific message for a raw message/error key', () => {
      expect(getError('add-account.invalid', 'fallback')).toEqual(
        'Email and password are required'
      );
    });

    it('gets a high-level message if no specific one exists for a raw message/error key', () => {
      expect(getError('add-account.no-password', 'falback')).toEqual(
        'Password is required'
      );
    });

    it('gives the fallback message if the raw message/error key does not match any messages', () => {
      expect(getError('this one is fake', 'fallback')).toEqual('fallback');
    });
  });
});
