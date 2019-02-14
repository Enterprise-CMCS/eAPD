import { notify } from './notification';
import axios from '../util/api';

export const ADMIN_CREATE_USER_REQUEST = Symbol(
  'admin : create user : request'
);
export const ADMIN_CREATE_USER_SUCCESS = Symbol(
  'admin : create user : success'
);
export const ADMIN_CREATE_USER_ERROR = Symbol('admin : create user : error');

export const createUser = ({ email, name, password, state }) => dispatch => {
  dispatch({ type: ADMIN_CREATE_USER_REQUEST });

  return axios
    .post('/users', { email, name, password, state })
    .then(() => {
      dispatch({ type: ADMIN_CREATE_USER_SUCCESS });
      dispatch(notify('User created!'));
    })
    .catch(e => {
      dispatch({ type: ADMIN_CREATE_USER_ERROR });

      switch (e.response.data.error) {
        case 'add-user-invalid':
          dispatch(notify('Error: Email and password are required'));
          break;
        case 'add-user-email-exists':
          dispatch(notify('Error: A user with this email already exists'));
          break;
        case 'add-user-weak-password':
          dispatch(notify('Error: The provided password is too weak'));
          break;
        case 'add-user-invalid-phone':
          dispatch(notify('Error: The provided phone number is invalid'));
          break;
        default:
          dispatch(notify('Unknown error creating user'));
          break;
      }

      return Promise.reject();
    });
};
