import axios from '../util/api';

export const GET_APD_REQUEST = 'GET_APD_REQUEST';
export const GET_APD_SUCCESS = 'GET_APD_SUCCESS';
export const GET_APD_FAILURE = 'GET_APD_FAILURE';
export const UPDATE_APD = 'UPDATE_APD';

export const requestApd = () => ({ type: GET_APD_REQUEST });

export const receiveApd = data => ({ type: GET_APD_SUCCESS, data });

export const failApd = error => ({ type: GET_APD_FAILURE, error });

export const updateApd = updates => ({
  type: UPDATE_APD,
  updates
});

export const fetchApd = () => dispatch => {
  dispatch(requestApd());

  const url = `/apds`;

  return axios
    .get(url)
    .then(req => dispatch(receiveApd(req.data)))
    .catch(error => {
      const reason = error.response ? error.response.data : 'N/A';
      dispatch(failApd(reason));
    });
};

const shouldFetchApd = state => !state.apd.loaded;

export const fetchApdDataIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchApd(getState())) {
    return dispatch(fetchApd());
  }

  return null;
};
