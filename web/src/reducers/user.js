import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../actions/user';

const userFields = ['id', 'email', 'name', 'position', 'phone', 'state'];

const initialState = {
  ...userFields.map(field => ({ [field]: '' })),
  fetching: false,
  error: ''
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, fetching: true, error: '' };
    case GET_USER_SUCCESS:
      return { ...state, fetching: false };
    case GET_USER_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case UPDATE_USER_REQUEST:
      return { ...state, fetching: true, error: '' };
    case UPDATE_USER_SUCCESS:
      return { ...state, fetching: false };
    case UPDATE_USER_FAILURE:
      return { ...state, fetching: false, error: action.error };
    default:
      return state;
  }
};

export default user;
