import {
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_CREATE_USER_ERROR,
  ADMIN_EDIT_ACCOUNT_SUCCESS,
  ADMIN_EDIT_ACCOUNT_ERROR,
  ADMIN_EDIT_ME_SUCCESS,
  ADMIN_EDIT_ME_ERROR,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_EDIT_ACCOUNT_REQUEST,
  ADMIN_EDIT_ME_REQUEST
} from '../actions/admin';
import {
  SAVE_APD_FAILURE,
  SAVE_APD_REQUEST,
  SAVE_APD_SUCCESS
} from '../actions/apd';

import { t } from '../i18n';

/**
 * Gets an error message from resource files, based on raw API message
 * @param {String} rawMessage - Raw message from the API
 * @param {String} fallback - Fallback message in case there's not a match in the resource file
 */
const getError = (rawMessage, fallback) => {
  let error = false;
  if (rawMessage) {
    const [errorFamily, message] = rawMessage.split('.');
    error = t(`errors.${errorFamily}.${message}`, { defaultValue: false });

    // If there's not a family-specific message, fall back to default errors
    if (error === false) {
      error = t(`errors.${message}`, { defaultValue: false });
    }
  }

  // And if there's not one of those, use the fallback
  return error === false ? fallback : error;
};

const initialState = {
  addAccount: false,
  editAccount: false,
  editOwnAccount: false,
  saveApd: false
};

// Maps action symbols to state properties.  When these actions happen, the
// state properties will be set to false.  If you add anything to this Map,
// you'll also need to add that symbol to the switch below.
const successActions = {
  [ADMIN_CREATE_USER_REQUEST]: 'addAccount',
  [ADMIN_CREATE_USER_SUCCESS]: 'addAccount',
  [ADMIN_EDIT_ACCOUNT_REQUEST]: 'editAccount',
  [ADMIN_EDIT_ACCOUNT_SUCCESS]: 'editAccount',
  [ADMIN_EDIT_ME_REQUEST]: 'editOwnAccount',
  [ADMIN_EDIT_ME_SUCCESS]: 'editOwnAccount',
  [SAVE_APD_REQUEST]: 'saveApd',
  [SAVE_APD_SUCCESS]: 'saveApd'
};

// When these actions happen, the state properties will be set to appropiate
// error messages or the fallback listed here.  If you add anything to this
// Map, you'll also need to add that symbol to the switch below.
const errorActions = {
  [ADMIN_CREATE_USER_ERROR]: ['addAccount', 'Unknown error creating account'],
  [ADMIN_EDIT_ACCOUNT_ERROR]: ['editAccount', 'Unknown error editing account'],
  [ADMIN_EDIT_ME_ERROR]: ['editOwnAccount', 'Unknown error editing account'],
  [SAVE_APD_FAILURE]: ['saveApd', 'Save failed. Try saving changes again.']
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_CREATE_USER_REQUEST:
    case ADMIN_CREATE_USER_SUCCESS:
    case ADMIN_EDIT_ACCOUNT_REQUEST:
    case ADMIN_EDIT_ACCOUNT_SUCCESS:
    case ADMIN_EDIT_ME_REQUEST:
    case ADMIN_EDIT_ME_SUCCESS:
    case SAVE_APD_REQUEST:
    case SAVE_APD_SUCCESS:
      return { ...state, [successActions[action.type]]: false };

    case ADMIN_CREATE_USER_ERROR:
    case ADMIN_EDIT_ACCOUNT_ERROR:
    case ADMIN_EDIT_ME_ERROR:
    case SAVE_APD_FAILURE: {
      const [prop, fallback] = errorActions[action.type];
      return {
        ...state,
        [prop]: getError(action.data, fallback)
      };
    }

    default:
      return state;
  }
};

const getAddAccountError = state => state.errors.addAccount;
const getEditAccountError = state => state.errors.editAccount;
const getEditOwnAccountError = state => state.errors.editOwnAccount;
const getSaveApdError = state => state.errors.saveApd;

export default reducer;

export {
  getAddAccountError,
  getEditAccountError,
  getEditOwnAccountError,
  getError,
  getSaveApdError
};
