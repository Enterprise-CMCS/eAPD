import { push } from 'connected-react-router';

import {
  CREATE_APD_FAILURE,
  CREATE_APD_REQUEST,
  CREATE_APD_SUCCESS,
  DELETE_APD_FAILURE,
  DELETE_APD_REQUEST,
  DELETE_APD_SUCCESS,
  FETCH_ALL_APDS_FAILURE,
  FETCH_ALL_APDS_REQUEST,
  FETCH_ALL_APDS_SUCCESS,
  SAVE_APD_FAILURE,
  SAVE_APD_REQUEST,
  SAVE_APD_SUCCESS,
  SELECT_APD_SUCCESS,
  SELECT_APD_REQUEST,
  SELECT_APD_FAILURE,
  SET_APD_TO_SELECT_ON_LOAD,
  ADMIN_CHECK_TOGGLE
} from './symbols';
import { updateBudget } from '../budget';
import { APD_ACTIVITIES_CHANGE, EDIT_APD } from '../editApd/symbols';
import {
  ariaAnnounceApdLoaded,
  ariaAnnounceApdLoading,
  ariaAnnounceApdLoadingFailure
} from '../aria';
import { t } from '../../../i18n';

import { selectApdData } from '../../selectors/apd.selectors';
import {
  selectHasChanges,
  selectPatches
} from '../../selectors/patch.selectors';
import {
  getIsFedAdmin,
  getCanUserEditAPD
} from '../../selectors/user.selector';

import axios from '../../../util/api';
import initialAssurances from '../../../util/regulations';

const LAST_APD_ID_STORAGE_KEY = 'last-apd-id';

// eslint-disable-next-line react/display-name
export const saveApd = () => (dispatch, getState) => {
  const state = getState();
  const canEdit = getCanUserEditAPD(state);
  if (canEdit) {
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
        dispatch({ type: SAVE_APD_SUCCESS, data: res.data.apd });
        return res.data.apd;
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          dispatch({
            type: SAVE_APD_FAILURE,
            data: t('errors.save-apd.not-logged-in')
          });
        } else {
          dispatch({ type: SAVE_APD_FAILURE });
        }
        throw error;
      });
  }
  dispatch({
    type: SAVE_APD_FAILURE,
    data: t('errors.save-apd.no-save-permissions')
  });
  return null;
};

export const selectApd =
  (id, route, { global = window, pushRoute = push } = {}) =>
  dispatch => {
    dispatch({ type: SELECT_APD_REQUEST });
    dispatch(ariaAnnounceApdLoading());

    return axios
      .get(`/apds/${id}`)
      .then(req => {
        dispatch({ type: SELECT_APD_SUCCESS, apd: req.data });
        dispatch({
          type: APD_ACTIVITIES_CHANGE,
          activities: req.data.activities
        });

        // By default, APDs get an empty object for federal citations. The canonical list of citations is in frontend
        // code, not backend. So if we get an APD with no federal citations, set its federal citations to the initial
        // values using an EDIT_APD action. That way the initial values get saved back to the API.
        if (Object.keys(req.data.assurancesAndCompliances).length === 0) {
          dispatch({
            type: EDIT_APD,
            path: '/assurancesAndCompliances',
            value: initialAssurances
          });
        }

        dispatch(updateBudget());
        dispatch(pushRoute(route));
        dispatch(ariaAnnounceApdLoaded());

        if (global.localStorage) {
          global.localStorage.setItem(LAST_APD_ID_STORAGE_KEY, id);
        }
      })
      .catch(() => {
        const error =
          'This APD does not exist at this link. Check your link to make sure it is correct.';

        ariaAnnounceApdLoadingFailure(error);
        dispatch({ type: SELECT_APD_FAILURE, data: error });
        dispatch(pushRoute('/'));
      });
  };

export const setApdToSelectOnLoad = () => (dispatch, getState) => {
  const isAdmin = getIsFedAdmin(getState());
  if (!isAdmin) {
    dispatch({ type: SET_APD_TO_SELECT_ON_LOAD });
  }
};

export const createApd =
  (values, { pushRoute = push } = {}) =>
  dispatch => {
    dispatch({ type: CREATE_APD_REQUEST });
    return axios
      .post('/apds')
      .then(async req => {
        let data = req.data,
          merged = { ...data, ...values };
        dispatch({ type: CREATE_APD_SUCCESS, data: merged });
        await dispatch(
          selectApd(merged.id, `/apd/${merged.id}`, { pushRoute })
        );
      })
      .catch(error => {
        const reason = error.response ? error.response.data : 'N/A';
        dispatch({ type: CREATE_APD_FAILURE, data: reason });
      });
  };

export const fetchAllApds =
  ({ global = window, pushRoute = push, select = selectApd } = {}) =>
  (dispatch, getState) => {
    dispatch({ type: FETCH_ALL_APDS_REQUEST });

    const url = `/apds`;

    return axios
      .get(url)
      .then(async req => {
        const apd = Array.isArray(req.data) ? req.data : null;
        dispatch({
          type: FETCH_ALL_APDS_SUCCESS,
          data: apd.filter(({ status }) => status !== 'archived')
        });

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
        dispatch({ type: FETCH_ALL_APDS_FAILURE, error: reason });
      });
  };

export const deleteApd =
  (id, { fetch = fetchAllApds } = {}) =>
  dispatch => {
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

// eslint-disable-next-line react/display-name
export const toggleAdminCheck = value => dispatch => {
  dispatch({ type: ADMIN_CHECK_TOGGLE, data: value });
  return null;
};
