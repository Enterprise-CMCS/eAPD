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
  dispatch(receiveUser({ id, name: 'Bren' }));
};

export const updateUser = data => dispatch => {
  dispatch(requestUserUpdate());
  dispatch(receiveUserUpdate(data));
};

const shouldFetchUser = state => state.user.loaded;

export const fetchUserDataIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchUser(getState())) {
    return dispatch(fetchUser(57));
  }
};
