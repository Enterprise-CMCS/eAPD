import axios from '../util/api';

export const GET_STATE_REQUEST = 'GET_STATE_REQUEST';
export const GET_STATE_SUCCESS = 'GET_STATE_SUCCESS';
export const GET_STATE_FAILURE = 'GET_STATE_FAILURE';

export const UPDATE_STATE_REQUEST = 'UPDATE_STATE_REQUEST';
export const UPDATE_STATE_SUCCESS = 'UPDATE_STATE_SUCCESS';
export const UPDATE_STATE_FAILURE = 'UPDATE_STATE_FAILURE';

export const requestState = () => ({ type: GET_STATE_REQUEST });
export const receiveState = data => ({ type: GET_STATE_SUCCESS, data });
export const failState = error => ({ type: GET_STATE_FAILURE, error });

export const requestStateUpdate = () => ({ type: UPDATE_STATE_REQUEST });
export const receiveStateUpdate = data => ({
  type: UPDATE_STATE_SUCCESS,
  data
});
export const failStateUpdate = error => ({ type: UPDATE_STATE_FAILURE, error });

export const fetchState = id => dispatch => {
  dispatch(requestState());

  const url = `/states${id ? `/${id}` : ''}`;

  return axios
    .get(url)
    .then(req => dispatch(receiveState(req.data)))
    .catch(error => {
      const reason = error.response.data || 'N/A';
      dispatch(failState(reason));
    });
};

export const updateState = (id, data) => dispatch => {
  dispatch(requestStateUpdate());

  const url = `/states/${id}`;

  if (data.medicaid_office) {
    const { medicaid_office: { director } } = data;
    if (director && !director.name && !director.email && !director.phone) {
      // The director field is not required, but if it is present, all
      // of its properties are required.  If none of its properties are
      // set, we can just delete it here.  This will also have the
      // effect of deleting it from the API.
      delete data.medicaid_office.director; // eslint-disable-line no-param-reassign
    }
  }

  return axios
    .put(url, data)
    .then(req => {
      dispatch(receiveStateUpdate(req.data));
    })
    .catch(error => {
      const reason = error.response ? error.response.data : 'N/A';
      dispatch(failStateUpdate(reason));
    });
};

const shouldFetchState = state => !state.state.loaded;

export const fetchStateDataIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchState(getState())) {
    return dispatch(fetchState(id));
  }

  return null;
};
