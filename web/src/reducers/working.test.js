import working, {
  getAddAccountWorking,
  getEditAccountWorking,
  getEditOwnAccountWorking,
  getSaveApdWorking
} from './working';

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

describe('working state reducer', () => {
  const initialState = {
    addAccount: false,
    editAccount: false,
    editOwnAccount: false,
    saveApd: false
  };

  it('should handle initial state', () => {
    expect(working(undefined, {})).toEqual(initialState);
  });

  describe('request/start actions set working props to true', () => {
    const state = {
      addAccount: false,
      editAccount: false,
      editOwnAccount: false,
      saveApd: false
    };
    [
      ['a user account is created', ADMIN_CREATE_USER_REQUEST, 'addAccount'],
      ['a user account is edited', ADMIN_EDIT_ACCOUNT_REQUEST, 'editAccount'],
      ['a user saves their account', ADMIN_EDIT_ME_REQUEST, 'editOwnAccount'],
      ['an APD is saved', SAVE_APD_REQUEST, 'saveApd']
    ].forEach(([test, type, prop]) => {
      it(test, () => {
        expect(working(state, { type })).toEqual({
          ...state,
          [prop]: true
        });
      });
    });
  });

  describe('successful actions reset working props to false', () => {
    const state = {
      addAccount: true,
      editAccount: true,
      editOwnAccount: true,
      saveApd: true
    };
    [
      ['a user account is created', ADMIN_CREATE_USER_SUCCESS, 'addAccount'],
      ['a user account is edited', ADMIN_EDIT_ACCOUNT_SUCCESS, 'editAccount'],
      ['a user saves their account', ADMIN_EDIT_ME_SUCCESS, 'editOwnAccount'],
      ['an APD is saved', SAVE_APD_SUCCESS, 'saveApd']
    ].forEach(([test, type, prop]) => {
      it(test, () => {
        expect(working(state, { type })).toEqual({
          ...state,
          [prop]: false
        });
      });
    });
  });

  describe('error actions reset working props to false', () => {
    const state = {
      addAccount: true,
      editAccount: true,
      editOwnAccount: true,
      saveApd: true
    };
    [
      ['a user account is created', ADMIN_CREATE_USER_ERROR, 'addAccount'],
      ['a user account is edited', ADMIN_EDIT_ACCOUNT_ERROR, 'editAccount'],
      ['a user saves their account', ADMIN_EDIT_ME_ERROR, 'editOwnAccount'],
      ['an APD is saved', SAVE_APD_FAILURE, 'saveApd']
    ].forEach(([test, type, prop]) => {
      it(test, () => {
        expect(working(state, { type })).toMatchObject({
          ...state,
          [prop]: false
        });
      });
    });
  });

  describe('selectors', () => {
    const state = {
      working: {
        addAccount: 'add account',
        editAccount: 'edit account',
        editOwnAccount: 'edit self',
        saveApd: 'save apd'
      }
    };

    it('can fetch "add account" error state', () => {
      expect(getAddAccountWorking(state)).toEqual('add account');
    });

    it('can fetch "edit account" error state', () => {
      expect(getEditAccountWorking(state)).toEqual('edit account');
    });

    it('can fetch "edit self" error state', () => {
      expect(getEditOwnAccountWorking(state)).toEqual('edit self');
    });

    it('can fetch "save apd" error state', () => {
      expect(getSaveApdWorking(state)).toEqual('save apd');
    });
  });
});
