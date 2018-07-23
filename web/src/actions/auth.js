import axios from '../util/api';

import { fetchApd } from './apd';

const API_URL = process.env.API_URL || 'http://localhost:8000';

export const AUTH_CHECK_REQUEST = 'AUTH_CHECK_REQUEST';
export const AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS';
export const AUTH_CHECK_FAILURE = 'AUTH_CHECK_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const requestAuthCheck = () => ({ type: AUTH_CHECK_REQUEST });
export const completeAuthCheck = user => ({
  type: AUTH_CHECK_SUCCESS,
  data: user
});
export const failAuthCheck = () => ({ type: AUTH_CHECK_FAILURE });

export const requestLogin = () => ({ type: LOGIN_REQUEST });
export const completeLogin = () => ({ type: LOGIN_SUCCESS });
export const failLogin = error => ({ type: LOGIN_FAILURE, error });

export const completeLogout = () => ({ type: LOGOUT_SUCCESS });

export const login = (username, password) => dispatch => {
  dispatch(requestLogin());

  return axios
    .post(`${API_URL}/auth/login`, { username, password })
    .then(() => {
      dispatch(completeLogin());
      dispatch(fetchApd());
    })
    .catch(error => {
      const reason = error.response ? error.response.data : 'N/A';
      dispatch(failLogin(reason));
    });
};

export const logout = () => dispatch =>
  axios.get(`${API_URL}/auth/logout`).then(() => dispatch(completeLogout()));

export const checkAuth = () => dispatch => {
  dispatch(requestAuthCheck());

  return axios
    .get(`${API_URL}/me`)
    .then(req => {
      dispatch(completeAuthCheck(req.data));
      dispatch(fetchApd());
    })
    .catch(() => dispatch(failAuthCheck()));
};
