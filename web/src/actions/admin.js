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

export const ADMIN_GET_ACTIVITIES_REQUEST = Symbol(
  'admin : get activities : request'
);
export const ADMIN_GET_ACTIVITIES_SUCCESS = Symbol(
  'admin : get activities : success'
);
export const ADMIN_GET_ACTIVITIES_ERROR = Symbol(
  'admin : get activities : error'
);

export const ADMIN_GET_ROLES_REQUEST = Symbol('admin : get roles : request');
export const ADMIN_GET_ROLES_SUCCESS = Symbol('admin : get roles : success');
export const ADMIN_GET_ROLES_ERROR = Symbol('admin : get roles : error');

export const getRoles = () => dispatch => {
  dispatch({ type: ADMIN_GET_ROLES_REQUEST });
  dispatch({ type: ADMIN_GET_ACTIVITIES_REQUEST });

  const rolesPromise = axios
    .get('/auth/roles')
    .then(res => {
      dispatch({ type: ADMIN_GET_ROLES_SUCCESS, data: res.data });
    })
    .catch(() => {
      dispatch({ type: ADMIN_GET_ROLES_ERROR });
    });

  const activitiesPromise = axios
    .get('/auth/activities')
    .then(res => {
      dispatch({ type: ADMIN_GET_ACTIVITIES_SUCCESS, data: res.data });
    })
    .catch(() => {
      dispatch({ type: ADMIN_GET_ACTIVITIES_ERROR });
    });

  return Promise.all([rolesPromise, activitiesPromise]);
};

export const ADMIN_GET_USERS_REQUEST = Symbol('admin : get users : request');
export const ADMIN_GET_USERS_SUCCESS = Symbol('admin : get users : success');
export const ADMIN_GET_USERS_ERROR = Symbol('admin : get users : error');

export const getUsers = () => dispatch => {
  dispatch({ type: ADMIN_GET_USERS_REQUEST });

  return axios
    .get('/users')
    .then(res => {
      dispatch({ type: ADMIN_GET_USERS_SUCCESS, data: res.data });
    })
    .catch(() => {
      dispatch({ type: ADMIN_GET_USERS_ERROR });
    });
};

export const ADMIN_EDIT_ACCOUNT_REQUEST = Symbol(
  'admin : edit account : request'
);
export const ADMIN_EDIT_ACCOUNT_SUCCESS = Symbol(
  'admin : edit account : success'
);
export const ADMIN_EDIT_ACCOUNT_ERROR = Symbol('admin : edit account : error');

export const editAccount = user => dispatch => {
  dispatch({ type: ADMIN_EDIT_ACCOUNT_REQUEST });

  const putData = Object.entries(user).reduce(
    (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
    {}
  );
  if (!user.state) {
    putData.state = '';
  }
  if (!user.role) {
    putData.role = '';
  }

  return axios
    .put(`/users/${user.id}`, putData)
    .then(() => {
      dispatch({ type: ADMIN_EDIT_ACCOUNT_SUCCESS });
      dispatch(getUsers());
      dispatch(notify('Account edited'));
    })
    .catch(e => {
      dispatch({ type: ADMIN_EDIT_ACCOUNT_ERROR });

      switch (e.response.data.error) {
        case 'update-user-invalid-state':
          dispatch(
            notify('Error: the state selected for the account is invalid')
          );
          break;
        case 'update-user-invalid-role':
          dispatch(
            notify(
              'Error: the authorization role selected for the account is invalid'
            )
          );
          break;
        case 'update-user-email-exists':
          dispatch(
            notify(
              'Error: another account already exists with that email address'
            )
          );
          break;
        case 'update-user-invalid-phone':
          dispatch(
            notify('Error: phone number may not be more than 10 digits')
          );
          break;
        default:
          dispatch(notify('Unknown error editing account'));
          break;
      }
      return Promise.reject();
    });
};

export const ADMIN_EDIT_ME_REQUEST = Symbol('admin : edit self : request');
export const ADMIN_EDIT_ME_SUCCESS = Symbol('admin : edit self : success');
export const ADMIN_EDIT_ME_ERROR = Symbol('admin : edit self : error');

export const editSelf = user => dispatch => {
  dispatch({ type: ADMIN_EDIT_ME_REQUEST });

  const putData = Object.entries(user).reduce(
    (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
    {}
  );

  return axios
    .put(`/me`, putData)
    .then(res => {
      dispatch({ type: ADMIN_EDIT_ME_SUCCESS, data: res.data });
    })
    .catch(e => {
      dispatch({ type: ADMIN_EDIT_ME_ERROR });

      switch (e.response.data.error) {
        case 'update-self-email-exists':
          dispatch(
            notify(
              'Error: another account already exists with that email address'
            )
          );
          break;
        case 'update-self-invalid-phone':
          dispatch(
            notify('Error: phone number may not be more than 10 digits')
          );
          break;
        case 'update-self-weak-password':
          dispatch(notify('Error: The provided password is too weak'));
          break;
        default:
          dispatch(notify('Unknown error editing account'));
          break;
      }
      return Promise.reject();
    });
};
