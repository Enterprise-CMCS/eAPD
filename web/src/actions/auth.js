import axios from '../util/api';

import { fetchAllApds } from './app';
import { getRoles, getUsers } from './admin';

export const AUTH_CHECK_FAILURE = Symbol('auth check failure');
export const AUTH_CHECK_REQUEST = Symbol('auth check request');
export const AUTH_CHECK_SUCCESS = Symbol('auth check success');

export const LOGIN_FAILURE = Symbol('login failure');
export const LOGIN_REQUEST = Symbol('login request');
export const LOGIN_SUCCESS = Symbol('login success');

export const LOGOUT_SUCCESS = Symbol('logout success');

export const requestAuthCheck = () => ({ type: AUTH_CHECK_REQUEST });
export const completeAuthCheck = user => ({
  type: AUTH_CHECK_SUCCESS,
  data: user
});
export const failAuthCheck = () => ({ type: AUTH_CHECK_FAILURE });

export const requestLogin = () => ({ type: LOGIN_REQUEST });
export const completeLogin = user => ({ type: LOGIN_SUCCESS, data: user });
export const failLogin = error => ({ type: LOGIN_FAILURE, error });

export const completeLogout = () => ({ type: LOGOUT_SUCCESS });

const loadData = activities => dispatch => {
  if (activities.includes('view-document')) {
    dispatch(fetchAllApds());
  }
  if (activities.includes('view-users')) {
    dispatch(getUsers());
  }
  if (activities.includes('view-roles')) {
    dispatch(getRoles());
  }
};

export const login = (username, password) => dispatch => {
  dispatch(requestLogin());

  return axios
    .post('/auth/login/nonce', { username })
    .then(req =>
      axios.post('/auth/login', {
        username: req.data.nonce,
        password
      })
    )
    .then(req => {
      // localStorage.setItem('token', req.data.token);
      dispatch(completeLogin(req.data));
      dispatch(loadData(req.data.activities));
    })
    .catch(error => {
      const reason = error.response ? error.response.data : 'N/A';
      dispatch(failLogin(reason));
    });
};

export const logout = () => dispatch =>
  axios.get('/auth/logout')
    // .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(completeLogout()));

export const checkAuth = () => dispatch => {
  dispatch(requestAuthCheck());

  return axios
    .get('/me')
    .then(req => {
      dispatch(completeAuthCheck(req.data));
      dispatch(loadData(req.data.activities));
    })
    .catch(() => dispatch(failAuthCheck()));
};
