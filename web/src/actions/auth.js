import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const requestLogin = () => ({ type: LOGIN_REQUEST });
export const completeLogin = () => ({ type: LOGIN_SUCCESS });
export const failLogin = error => ({ type: LOGIN_FAILURE, error });
export const logout = () => ({ type: LOGOUT_SUCCESS });

export const attemptLogin = (username, password) => dispatch => {
  dispatch(requestLogin());

  return axios
    .post(`${API_URL}/auth/login`, { username, password })
    .then(() => dispatch(completeLogin()))
    .catch(error => {
      const reason = error.response.statusText;
      dispatch(failLogin(reason));
    });
};
