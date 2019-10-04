import { push } from 'connected-react-router';

import { selectApdData } from '../reducers/apd.selectors';
import { selectHasChanges, selectPatches } from '../reducers/patch.selectors';
import { getIsAdmin } from '../reducers/user.selector';
import axios from '../util/api';
import { fromAPI } from '../util/serialization/apd';
import { selectApd } from './app';

const LAST_APD_ID_STORAGE_KEY = 'last-apd-id';

export const ADD_APD_KEY_PERSON = 'ADD_APD_KEY_PERSON';
export const CREATE_APD = 'CREATE_APD';
export const CREATE_APD_REQUEST = 'CREATE_APD_REQUEST';
export const CREATE_APD_SUCCESS = 'CREATE_APD_SUCCESS';
export const CREATE_APD_FAILURE = 'CREATE_APD_FAILURE';
export const DELETE_APD_REQUEST = Symbol('delete apd : request');
export const DELETE_APD_SUCCESS = Symbol('delete apd : success');
export const DELETE_APD_FAILURE = Symbol('delete apd : failure');
export const GET_APD_REQUEST = 'GET_APD_REQUEST';
export const GET_APD_SUCCESS = 'GET_APD_SUCCESS';
export const GET_APD_FAILURE = 'GET_APD_FAILURE';
export const REMOVE_APD_KEY_PERSON = 'REMOVE_APD_KEY_PERSON';
export const SAVE_APD_REQUEST = 'SAVE_APD_REQUEST';
export const SAVE_APD_SUCCESS = 'SAVE_APD_SUCCESS';
export const SAVE_APD_FAILURE = 'SAVE_APD_FAILURE';
export const SELECT_APD = 'SELECT_APD';
export const SUBMIT_APD_REQUEST = 'SUBMIT_APD_REQUEST';
export const SUBMIT_APD_SUCCESS = 'SUBMIT_APD_SUCCESS';
export const SUBMIT_APD_FAILURE = 'SUBMIT_APD_FAILURE';
export const UPDATE_APD = 'UPDATE_APD';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const WITHDRAW_APD_REQUEST = Symbol('withdraw apd request');
export const WITHDRAW_APD_SUCCESS = Symbol('withdraw apd success');
export const WITHDRAW_APD_FAILURE = Symbol('withdraw apd failure');

export const SET_SELECT_APD_ON_LOAD = 'SET_SELECT_APD_ON_LOAD';
export const selectApdOnLoad = () => (dispatch, getState) => {
  const isAdmin = getIsAdmin(getState());
  if (!isAdmin) {
    dispatch({ type: SET_SELECT_APD_ON_LOAD });
  }
};

export const addKeyPerson = () => ({ type: ADD_APD_KEY_PERSON });
export const removeKeyPerson = (key, { global = window } = {}) => dispatch => {
  if (global.confirm('Do you really want to delete this key person?')) {
    dispatch({
      type: REMOVE_APD_KEY_PERSON,
      key
    });
  }
};

export const updateBudget = () => (dispatch, getState) =>
  dispatch({ type: UPDATE_BUDGET, state: getState() });

export const requestApd = () => ({ type: GET_APD_REQUEST });
export const receiveApd = data => ({ type: GET_APD_SUCCESS, data });
export const failApd = error => ({ type: GET_APD_FAILURE, error });

export const updateApd = updates => dispatch => {
  dispatch({ type: UPDATE_APD, updates });
  if (updates.years) {
    dispatch(updateBudget());
  }
};

export const createRequest = () => ({ type: CREATE_APD_REQUEST });
export const createSuccess = data => ({ type: CREATE_APD_SUCCESS, data });
export const createFailure = () => ({ type: CREATE_APD_FAILURE });
export const createApd = ({
  deserialize = fromAPI,
  pushRoute = push
} = {}) => dispatch => {
  dispatch(createRequest());
  return axios
    .post('/apds')
    .then(async req => {
      const apd = deserialize(req.data);
      dispatch(createSuccess(apd));
      await dispatch(selectApd(apd.id, { deserialize, pushRoute }));
    })
    .catch(error => {
      const reason = error.response ? error.response.data : 'N/A';
      dispatch(createFailure(reason));
    });
};

export const requestSave = () => ({ type: SAVE_APD_REQUEST });
export const saveSuccess = data => ({ type: SAVE_APD_SUCCESS, data });
export const saveFailure = data => ({ type: SAVE_APD_FAILURE, data });

export const fetchApd = ({
  global = window,
  pushRoute = push,
  select = selectApd
} = {}) => (dispatch, getState) => {
  dispatch(requestApd());

  const url = `/apds`;

  return axios
    .get(url)
    .then(async req => {
      const apd = Array.isArray(req.data) ? req.data : null;
      dispatch(receiveApd(apd.filter(({ status }) => status !== 'archived')));

      const {
        apd: { selectAPDOnLoad }
      } = getState();
      if (
        selectAPDOnLoad &&
        global.localStorage &&
        global.localStorage.getItem(LAST_APD_ID_STORAGE_KEY)
      ) {
        await dispatch(
          select(global.localStorage.getItem('last-apd-id'), {
            global,
            pushRoute
          })
        );
      }
    })
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

export const saveApd = () => (dispatch, getState) => {
  const state = getState();
  const hasChanges = selectHasChanges(state);

  if (!hasChanges) {
    return Promise.resolve();
  }

  dispatch(requestSave());

  const { id: apdID } = selectApdData(state);
  const patches = selectPatches(state);

  return axios
    .patch(`/apds/${apdID}`, patches)
    .then(res => {
      dispatch(saveSuccess(res.data));
      return res.data;
    })
    .catch(error => {
      if (error.response.status === 403) {
        dispatch(saveFailure('save-apd.not-logged-in'));
      } else {
        dispatch(saveFailure());
      }
      throw error;
    });
};

export const deleteApd = (id, { fetch = fetchApd } = {}) => dispatch => {
  dispatch({ type: DELETE_APD_REQUEST });

  return axios
    .delete(`/apds/${id}`)
    .then(() => {
      dispatch({ type: DELETE_APD_SUCCESS });
      dispatch(fetch());
    })
    .catch(() => {
      dispatch({ type: DELETE_APD_FAILURE });
    });
};
