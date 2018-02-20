import axios from '../util/api';

const API_URL = process.env.API_URL || 'http://localhost:8000';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const requestLogin = () => ({ type: LOGIN_REQUEST });
export const completeLogin = () => ({ type: LOGIN_SUCCESS });
export const failLogin = error => ({ type: LOGIN_FAILURE, error });
export const completeLogout = () => ({ type: LOGOUT_SUCCESS });

export const logout = () => dispatch =>
  axios.get(`${API_URL}/auth/logout`).then(() => dispatch(completeLogout()));

export const login = (username, password) => dispatch => {
  dispatch(requestLogin());

  return axios
    .post(`${API_URL}/auth/login`, { username, password })
    .then(() => dispatch(completeLogin()))
    .catch(error => {
      const reason = error.response.data || 'N/A';
      dispatch(failLogin(reason));
    });
};
