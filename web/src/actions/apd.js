import { push } from 'connected-react-router';

import { notify } from './notification';
import { getIsAdmin } from '../reducers/user';
import axios from '../util/api';
import { fromAPI, toAPI } from '../util/serialization/apd';

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
export const removeKeyPerson = index => ({
  type: REMOVE_APD_KEY_PERSON,
  index
});

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

export const selectApd = (
  id,
  { deserialize = fromAPI, global = window, pushRoute = push } = {}
) => dispatch =>
  axios.get(`/apds/${id}`).then(req => {
    dispatch({ type: SELECT_APD, apd: deserialize(req.data) });
    dispatch(updateBudget());
    dispatch(pushRoute('/apd'));

    if (global.localStorage) {
      global.localStorage.setItem(LAST_APD_ID_STORAGE_KEY, id);
    }
  });

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
export const saveFailure = () => ({ type: SAVE_APD_FAILURE });

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

export const notifyNetError = (action, error) => {
  const { response: res } = error;
  const reason = (res && (res.data || {}).error) || 'not-sure-why';

  return notify(`${action} failed (${reason})`);
};

export const saveApd = ({ serialize = toAPI } = {}) => (dispatch, state) => {
  const {
    apd: { data: updatedApd },
    activities,
    dirty
  } = state();

  if (!dirty.dirty) {
    return Promise.resolve();
  }

  dispatch(requestSave());

  const apd = serialize(updatedApd, activities);

  // These are the fields we want to remove if they aren't dirty.
  const filterAPDFields = [
    'federalCitations',
    'incentivePayments',
    'narrativeHIE',
    'narrativeHIT',
    'narrativeMMIS',
    'programOverview',
    'previousActivityExpenses',
    'previousActivitySummary',
    'stateProfile'
  ];
  const filterActivityFields = [
    'contractorResources',
    'costAllocation',
    'costAllocationNarrative',
    'expenses',
    'goals',
    'schedule',
    'standardsAndConditions',
    'statePersonnel',
    'quarterlyFFP'
  ];

  filterAPDFields.forEach(field => {
    if (!dirty.data.apd[field]) {
      delete apd[field];
    }
  });

  for (let i = apd.activities.length - 1; i >= 0; i -= 1) {
    const activity = apd.activities[i];
    if (!dirty.data.activities.byKey[activity.key]) {
      // If this activity isn't dirty, strip it from the list to save,
      // but then add just its ID back - this prevents it from being
      // deleted by the API synchronization.
      apd.activities.splice(i, 1);
      apd.activities.push({ id: activity.id });
    } else {
      const dirtyActivity = dirty.data.activities.byKey[activity.key];
      // Get rid of any activity fields that aren't dirty.
      filterActivityFields.forEach(field => {
        if (!dirtyActivity[field]) {
          delete activity[field];
        }
      });
    }
  }

  return axios
    .put(`/apds/${updatedApd.id}`, apd)
    .then(res => {
      dispatch(saveSuccess(res.data));
      return res.data;
    })
    .catch(error => {
      dispatch(saveFailure());
      throw error;
    });
};

export const submitAPD = (save = saveApd) => (dispatch, getState) =>
  dispatch(save())
    .then(() => {
      dispatch({ type: SUBMIT_APD_REQUEST });

      const {
        activities: { byKey: activities },
        apd: {
          data: { id: apdID }
        },
        budget
      } = getState();

      const tables = {
        activityQuarterlyFederalShare: Object.entries(budget.activities).reduce(
          (acc, [key, activity]) => ({
            ...acc,
            [activities[key].name]: activity.quarterlyFFP
          }),
          {}
        ),
        summaryBudgetTable: {
          hie: budget.hie,
          hit: budget.hit,
          mmis: budget.mmis,
          total: budget.combined
        },
        federalShareByFFYQuarter: budget.federalShareByFFYQuarter,
        programBudgetTable: {
          hitAndHie: {
            hit: budget.hit.combined,
            hie: budget.hie.combined,
            hitAndHie: budget.hitAndHie.combined
          },
          mmis: budget.mmisByFFP
        }
      };

      return axios
        .post(`/apds/${apdID}/versions`, { tables })
        .then(() => {
          dispatch(notify('Submission successful!'));
          dispatch({ type: SUBMIT_APD_SUCCESS });
        })
        .catch(error => {
          dispatch(notifyNetError('Submit', error));
          dispatch({ type: SUBMIT_APD_FAILURE });
        });
    })
    .catch(error => {
      dispatch(notifyNetError('Submit', error));
    });

export const withdrawApd = () => (dispatch, getState) => {
  dispatch({ type: WITHDRAW_APD_REQUEST });

  const {
    apd: {
      data: { id: apdID }
    }
  } = getState();

  return axios
    .delete(`/apds/${apdID}/versions`)
    .then(() => {
      dispatch({ type: WITHDRAW_APD_SUCCESS });
    })
    .catch(error => {
      dispatch(notifyNetError('Withdraw', error));
      dispatch({ type: WITHDRAW_APD_FAILURE });
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
