import {
  ADMIN_EDIT_ME_REQUEST,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_EDIT_ACCOUNT_REQUEST,
  ADMIN_CREATE_USER_ERROR,
  ADMIN_CREATE_USER_SUCCESS,
  ADMIN_EDIT_ACCOUNT_ERROR,
  ADMIN_EDIT_ACCOUNT_SUCCESS,
  ADMIN_EDIT_ME_ERROR,
  ADMIN_EDIT_ME_SUCCESS
} from '../actions/admin';

const initialState = {
  addAccount: false,
  editAccount: false,
  editOwnAccount: false
};

const yesActions = new Map([
  [ADMIN_CREATE_USER_REQUEST, 'addAccount'],
  [ADMIN_EDIT_ACCOUNT_REQUEST, 'editAccount'],
  [ADMIN_EDIT_ME_REQUEST, 'editOwnAccount']
]);

const noActions = new Map([
  [ADMIN_CREATE_USER_ERROR, 'addAccount'],
  [ADMIN_CREATE_USER_SUCCESS, 'addAccount'],
  [ADMIN_EDIT_ACCOUNT_ERROR, 'editAccount'],
  [ADMIN_EDIT_ACCOUNT_SUCCESS, 'editAccount'],
  [ADMIN_EDIT_ME_ERROR, 'editOwnAccount'],
  [ADMIN_EDIT_ME_SUCCESS, 'editOwnAccount']
]);

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case ADMIN_CREATE_USER_REQUEST:
    case ADMIN_EDIT_ACCOUNT_REQUEST:
    case ADMIN_EDIT_ME_REQUEST:
      return { ...state, [yesActions.get(type)]: true };

    case ADMIN_CREATE_USER_ERROR:
    case ADMIN_CREATE_USER_SUCCESS:
    case ADMIN_EDIT_ACCOUNT_ERROR:
    case ADMIN_EDIT_ACCOUNT_SUCCESS:
    case ADMIN_EDIT_ME_ERROR:
    case ADMIN_EDIT_ME_SUCCESS:
      return { ...state, [noActions.get(type)]: false };

    default:
      return state;
  }
};

const getAddAccountWorking = state => state.working.addAccount;
const getEditAccountWorking = state => state.working.editAccount;
const getEditOwnAccountWorking = state => state.working.editOwnAccount;

export default reducer;

export {
  getAddAccountWorking,
  getEditAccountWorking,
  getEditOwnAccountWorking
};
