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

const fields = ['id', 'email', 'name', 'position', 'phone', 'state'];
const fieldsObj = Object.assign({}, ...fields.map(f => ({ [f]: '' })));

const initialState = {
  data: { ...fieldsObj },
  fetching: false,
  loaded: false,
  error: ''
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_EDIT_ME_REQUEST:
      return { ...state, fetching: true };
    case AUTH_CHECK_SUCCESS:
    case LOGIN_SUCCESS:
    case ADMIN_EDIT_ME_SUCCESS:
      return {
        ...state,
        fetching: false,
        loaded: true,
        data: { ...action.data }
      };
    case ADMIN_EDIT_ME_ERROR:
      return { ...state, fetching: false };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default user;
