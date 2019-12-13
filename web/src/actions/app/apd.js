import { push } from 'connected-react-router';

import {
  CREATE_APD_FAILURE,
  CREATE_APD_REQUEST,
  CREATE_APD_SUCCESS,
  SAVE_APD_FAILURE,
  SAVE_APD_REQUEST,
  SAVE_APD_SUCCESS,
  SELECT_APD
} from './symbols';
import { updateBudget } from '../budget';
import { EDIT_APD } from '../editApd/symbols';
import { ariaAnnounceApdLoaded, ariaAnnounceApdLoading } from '../aria';
import { selectApdData } from '../../reducers/apd.selectors';
import {
  selectHasChanges,
  selectPatches
} from '../../reducers/patch.selectors';
import axios from '../../util/api';
import { fromAPI, initialAssurances } from '../../util/serialization/apd';

const LAST_APD_ID_STORAGE_KEY = 'last-apd-id';

export const saveApd = () => (dispatch, getState) => {
  const state = getState();
  const hasChanges = selectHasChanges(state);

  if (!hasChanges) {
    return Promise.resolve();
  }

  dispatch({ type: SAVE_APD_REQUEST });

  const { id: apdID } = selectApdData(state);
  const patches = selectPatches(state);

  return axios
    .patch(`/apds/${apdID}`, patches)
    .then(res => {
      dispatch({ type: SAVE_APD_SUCCESS, data: res.data });
      return res.data;
    })
    .catch(error => {
      if (error.response.status === 403) {
        dispatch({ type: SAVE_APD_FAILURE, data: 'save-apd.not-logged-in' });
      } else {
        dispatch({ type: SAVE_APD_FAILURE });
      }
      throw error;
    });
};

export const selectApd = (
  id,
  route,
  { deserialize = fromAPI, global = window, pushRoute = push } = {}
) => dispatch => {
  dispatch(ariaAnnounceApdLoading());

  return axios.get(`/apds/${id}`).then(req => {
    const apd = deserialize(req.data);

    dispatch({ type: SELECT_APD, apd });

    // By default, APDs get an empty object for federal citations. The canonical list of citations is in frontend
    // code, not backend. So if we get an APD with no federal citations, set its federal citations to the initial
    // values using an EDIT_APD action. That way the initial values get saved back to the API.
    if (Object.keys(req.data.federalCitations).length === 0) {
      dispatch({
        type: EDIT_APD,
        path: '/federalCitations',
        value: initialAssurances
      });
    }

    dispatch(updateBudget());
    dispatch(pushRoute(route));
    dispatch(ariaAnnounceApdLoaded());

    if (global.localStorage) {
      global.localStorage.setItem(LAST_APD_ID_STORAGE_KEY, id);
    }
  });
};

export const createApd = ({
  deserialize = fromAPI,
  pushRoute = push
} = {}) => dispatch => {
  dispatch({ type: CREATE_APD_REQUEST });
  return axios
    .post('/apds')
    .then(async req => {
      const apd = deserialize(req.data);
      dispatch({ type: CREATE_APD_SUCCESS, data: apd });
      await dispatch(selectApd(apd.id, '/apd', { deserialize, pushRoute }));
    })
    .catch(error => {
      const reason = error.response ? error.response.data : 'N/A';
      dispatch({ type: CREATE_APD_FAILURE, data: reason });
    });
};
