import {
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_CREATE_USER_ERROR,
  ADMIN_EDIT_ACCOUNT_SUCCESS,
  ADMIN_EDIT_ACCOUNT_ERROR,
  ADMIN_EDIT_ME_SUCCESS,
  ADMIN_EDIT_ME_ERROR
} from '../actions/admin';

import { t } from '../i18n';

const getError = (rawMessage, fallback) => {
  const [errorFamily, message] = rawMessage.split('.');
  let error = t(`errors.${errorFamily}.${message}`, { defaultValue: false });
  if (error === false) {
    error = t(`errors.${message}`, { defaultValue: false });
  }
  return error === false ? fallback : error;
};

const initialState = {
  addAccount: false,
  editAccount: false,
  editOwnAccount: false
};

const successActions = new Map([
  [ADMIN_CREATE_USER_SUCCESS, 'addAccount'],
  [ADMIN_EDIT_ACCOUNT_SUCCESS, 'editAccount'],
  [ADMIN_EDIT_ME_SUCCESS, 'editOwnAccount']
]);

const errorActions = new Map([
  [ADMIN_CREATE_USER_ERROR, ['addAccount', 'Unknown error creating account']],
  [ADMIN_EDIT_ACCOUNT_ERROR, ['editAccount', 'Unknown error editing account']],
  [ADMIN_EDIT_ME_ERROR, ['editOwnAccount', 'Unknown error editing account']]
]);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_CREATE_USER_SUCCESS:
    case ADMIN_EDIT_ACCOUNT_SUCCESS:
    case ADMIN_EDIT_ME_SUCCESS:
      return { ...state, [successActions.get(action.type)]: false };

    case ADMIN_CREATE_USER_ERROR:
    case ADMIN_EDIT_ACCOUNT_ERROR:
    case ADMIN_EDIT_ME_ERROR: {
      const [prop, fallback] = errorActions.get(action.type);
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

export default reducer;

export { getAddAccountError, getEditAccountError, getEditOwnAccountError };
