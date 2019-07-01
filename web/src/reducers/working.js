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
import {
  SAVE_APD_FAILURE,
  SAVE_APD_REQUEST,
  SAVE_APD_SUCCESS
} from '../actions/apd';

const initialState = {
  addAccount: false,
  editAccount: false,
  editOwnAccount: false,
  saveApd: false
};

// Maps action symbols to state properties.  When these actions happen, the
// state properties will be set to true.  If you add anything to this Map,
// you'll also need to add that symbol to the switch below.
const yesActions = new Map([
  [ADMIN_CREATE_USER_REQUEST, 'addAccount'],
  [ADMIN_EDIT_ACCOUNT_REQUEST, 'editAccount'],
  [ADMIN_EDIT_ME_REQUEST, 'editOwnAccount'],
  [SAVE_APD_REQUEST, 'saveApd']
]);

// When these actions happen, the state properties will be set to false.  If
// you add anything to this Map, you'll also need to add that symbol to the
// switch below.
const noActions = new Map([
  [ADMIN_CREATE_USER_ERROR, 'addAccount'],
  [ADMIN_CREATE_USER_SUCCESS, 'addAccount'],
  [ADMIN_EDIT_ACCOUNT_ERROR, 'editAccount'],
  [ADMIN_EDIT_ACCOUNT_SUCCESS, 'editAccount'],
  [ADMIN_EDIT_ME_ERROR, 'editOwnAccount'],
  [ADMIN_EDIT_ME_SUCCESS, 'editOwnAccount'],
  [SAVE_APD_FAILURE, 'saveApd'],
  [SAVE_APD_SUCCESS, 'saveApd']
]);

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case ADMIN_CREATE_USER_REQUEST:
    case ADMIN_EDIT_ACCOUNT_REQUEST:
    case ADMIN_EDIT_ME_REQUEST:
    case SAVE_APD_REQUEST:
      return { ...state, [yesActions.get(type)]: true };

    case ADMIN_CREATE_USER_ERROR:
    case ADMIN_CREATE_USER_SUCCESS:
    case ADMIN_EDIT_ACCOUNT_ERROR:
    case ADMIN_EDIT_ACCOUNT_SUCCESS:
    case ADMIN_EDIT_ME_ERROR:
    case ADMIN_EDIT_ME_SUCCESS:
    case SAVE_APD_FAILURE:
    case SAVE_APD_SUCCESS:
      return { ...state, [noActions.get(type)]: false };

    default:
      return state;
  }
};

const getAddAccountWorking = state => state.working.addAccount;
const getEditAccountWorking = state => state.working.editAccount;
const getEditOwnAccountWorking = state => state.working.editOwnAccount;
const getSaveApdWorking = state => state.working.saveApd;

export default reducer;

export {
  getAddAccountWorking,
  getEditAccountWorking,
  getEditOwnAccountWorking,
  getSaveApdWorking
};
