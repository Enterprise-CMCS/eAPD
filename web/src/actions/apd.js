import axios from '../util/api';

export const GET_APD_REQUEST = 'GET_APD_REQUEST';
export const GET_APD_SUCCESS = 'GET_APD_SUCCESS';
export const GET_APD_FAILURE = 'GET_APD_FAILURE';

export const UPDATE_APD_ACTIVITY_REQUEST = 'UPDATE_APD_ACTIVITY_REQUEST';
export const UPDATE_APD_ACTIVITY_SUCCESS = 'UPDATE_APD_ACTIVITY_SUCCESS';
export const UPDATE_APD_ACTIVITY_FAILURE = 'UPDATE_APD_ACTIVITY_FAILURE';

export const requestApd = () => ({ type: GET_APD_REQUEST });
export const receiveApd = data => ({ type: GET_APD_SUCCESS, data });
export const failApd = error => ({ type: GET_APD_FAILURE, error });

export const requestApdActivityUpdate = () => ({
  type: UPDATE_APD_ACTIVITY_REQUEST
});
export const receiveApdActivityUpdate = data => ({
  type: UPDATE_APD_ACTIVITY_SUCCESS,
  data
});
export const failApdActivityUpdate = error => ({
  type: UPDATE_APD_ACTIVITY_FAILURE,
  error
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

export const updateApdActivity = (activityID, data) => dispatch => {
  dispatch(requestApdActivityUpdate());

  return axios
    .put(`/activities/${activityID}`, data)
    .then(req => dispatch(receiveApdActivityUpdate(req.data)))
    .catch(error => {
      const reason = error.response ? error.response.data : 'N/A';
      dispatch(failApdActivityUpdate(reason));
    });
};

export const updateApdActivityGoals = (activityID, goals) => dispatch => {
  dispatch(requestApdActivityUpdate());

  return axios
    .put(`/activities/${activityID}/goals`, goals)
    .then(req => dispatch(receiveApdActivityUpdate(req.data)))
    .catch(error => {
      const reason = error.response ? error.response.data : 'N/A';
      dispatch(failApdActivityUpdate(reason));
    });
};

const shouldFetchApd = state => !state.apd.loaded;

export const fetchApdDataIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchApd(getState())) {
    return dispatch(fetchApd());
  }

  return null;
};
