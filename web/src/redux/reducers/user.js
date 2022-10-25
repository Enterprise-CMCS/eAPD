import { LOGOUT_SUCCESS, UPDATE_USER_INFO } from '../actions/auth';

import {
  ADMIN_EDIT_ME_ERROR,
  ADMIN_EDIT_ME_REQUEST,
  ADMIN_EDIT_ME_SUCCESS
} from '../actions/admin';

const fields = ['id', 'email', 'name', 'position', 'state'];
const fieldsObj = Object.assign({}, ...fields.map(f => ({ [f]: '' })));

const initialState = {
  data: { ...fieldsObj },
  fetching: false,
  loaded: false,
  error: false
};

// eslint-disable-next-line default-param-last
const user = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_EDIT_ME_REQUEST:
      return { ...state, error: false, fetching: true };
    case UPDATE_USER_INFO:
    case ADMIN_EDIT_ME_SUCCESS:
      return {
        ...state,
        error: false,
        fetching: false,
        loaded: true,
        data: { ...action.data }
      };
    case ADMIN_EDIT_ME_ERROR:
      return { ...state, error: true, fetching: false };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export const selectState = state => state.user.data.state;

export default user;
