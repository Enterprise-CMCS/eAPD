import axios from '../util/api';

const API_URL = process.env.API_URL || 'http://localhost:8000';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const requestUser = () => ({ type: GET_USER_REQUEST });
export const receiveUser = data => ({ type: GET_USER_SUCCESS, data });
export const failUser = error => ({ type: GET_USER_FAILURE, error });

export const requestUserUpdate = () => ({ type: UPDATE_USER_REQUEST });
export const receiveUserUpdate = data => ({ type: UPDATE_USER_SUCCESS, data });
export const failUserUpdate = error => ({ type: UPDATE_USER_FAILURE, error });

export const fetchUser = id => dispatch => {
  dispatch(requestUser());

  return axios
    .get(`${API_URL}/users/${id}`)
    .then(req => dispatch(receiveUser(req.data)))
    .catch(error => {
      const reason = error.response.data || 'N/A';
      dispatch(failUser(reason));
    });
};

export const updateUser = (id, data) => dispatch => {
  dispatch(requestUserUpdate());

  // TODO: clean up callbacks
  return axios
    .put(`${API_URL}/users/${id}`, data)
    .then(req => {
      console.log('update user success!', req);
      dispatch(receiveUserUpdate(req.data));
    })
    .catch(error => {
      console.log('update user error!', error);
      const reason = error.response.data || 'N/A';
      dispatch(failUserUpdate(reason));
    });
};

const shouldFetchUser = state => !state.user.loaded;

export const fetchUserDataIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchUser(getState())) {
    return dispatch(fetchUser(id));
  }

  return null;
};
