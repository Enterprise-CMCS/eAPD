import {
  AUTH_CHECK_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from '../actions/auth';

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
    case AUTH_CHECK_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        loaded: true,
        data: { ...action.data }
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default user;
