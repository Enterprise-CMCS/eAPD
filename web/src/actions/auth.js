import axios from '../util/api';

import { fetchAllApds } from './app';
import { getRoles, getUsers } from './admin';
import {
  authenticateUser,
  retrieveExistingTransaction,
  verifyMFA,
  setTokens,
  getAvailableFactors,
  getFactor,
  setTokenListeners,
  renewTokens,
  logoutAndClearTokens,
  isUserActive
} from '../util/auth';
import { MFA_FACTOR_TYPES } from '../constants';

export const AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS';
export const AUTH_CHECK_FAILURE = 'AUTH_CHECK_FAILURE';

export const AUTH_CHECK_REQUEST = 'AUTH_CHECK_REQUEST';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_OTP_STAGE = 'LOGIN_OTP_STAGE';
export const LOGIN_MFA_REQUEST = 'LOGIN_MFA_REQUEST';
export const LOGIN_MFA_ENROLL_START = 'LOGIN_MFA_ENROLL_START';
export const LOGIN_MFA_ENROLL_ADD_PHONE = 'LOGIN_MFA_ENROLL_ADD_PHONE';
export const LOGIN_MFA_ENROLL_ACTIVATE = 'LOGIN_MFA_ENROLL_ACTIVATE';
export const LOGIN_MFA_FAILURE = 'LOGIN_MFA_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_FAILURE_NOT_IN_GROUP = 'LOGIN_FAILURE_NOT_IN_GROUP';
export const LOCKED_OUT = 'LOCKED_OUT';
export const RESET_LOCKED_OUT = 'RESET_LOCKED_OUT';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const STATE_ACCESS_REQUEST = 'STATE_ACCESS_REQUEST';
export const STATE_ACCESS_SUCCESS = 'STATE_ACCESS_SUCCESS';
export const STATE_ACCESS_COMPLETE = 'STATE_ACCESS_COMPLETE';

export const LATEST_ACTIVITY = 'LATEST_ACTIVITY';
export const SESSION_ENDING_ALERT = 'SESSION_ENDING_ALERT';
export const REQUEST_SESSION_RENEWAL = 'REQUEST_SESSION_RENEWAL';
export const SESSION_RENEWED = 'SESSION_RENEWED';
export const UPDATE_EXPIRATION = 'UPDATE_EXPIRATION';

export const requestAuthCheck = () => ({ type: AUTH_CHECK_REQUEST });
export const completeAuthCheck = user => ({
  type: AUTH_CHECK_SUCCESS,
  data: user
});
export const failAuthCheck = () => ({ type: AUTH_CHECK_FAILURE });

export const requestLogin = () => ({ type: LOGIN_REQUEST });
export const completeFirstStage = () => ({ type: LOGIN_OTP_STAGE });
export const mfaEnrollStart = (factors, phoneNumber) => ({
  type: LOGIN_MFA_ENROLL_START,
  data: { factors, phoneNumber }
});
export const mfaEnrollAddPhone = mfaEnrollType => ({
  type: LOGIN_MFA_ENROLL_ADD_PHONE,
  data: mfaEnrollType
});
export const mfaEnrollActivate = (mfaEnrollType, activationData) => ({
  type: LOGIN_MFA_ENROLL_ACTIVATE,
  data: { mfaEnrollType, activationData }
});
export const startSecondStage = () => ({ type: LOGIN_MFA_REQUEST });
export const completeLogin = user => ({ type: LOGIN_SUCCESS, data: user });
export const failLogin = error => ({ type: LOGIN_FAILURE, error });
export const failLoginNotInGroup = error => ({
  type: LOGIN_FAILURE_NOT_IN_GROUP,
  error
});
export const failLoginMFA = error => ({ type: LOGIN_MFA_FAILURE, error });
export const failLoginLocked = () => ({ type: LOCKED_OUT });
export const resetLocked = () => ({ type: RESET_LOCKED_OUT });

export const requestLogout = () => ({ type: LOGOUT_REQUEST });
export const completeLogout = () => ({ type: LOGOUT_SUCCESS });

export const requestAccessToState = () => ({ type: STATE_ACCESS_REQUEST });
export const successAccessToState = () => ({ type: STATE_ACCESS_SUCCESS });
export const completeAccessToState = () => ({ type: STATE_ACCESS_COMPLETE });

export const setLatestActivity = () => ({ type: LATEST_ACTIVITY });
export const setSessionEnding = () => ({ type: SESSION_ENDING_ALERT });
export const requestSessionRenewal = () => ({ type: REQUEST_SESSION_RENEWAL });
export const completeSessionRenewed = () => ({ type: SESSION_RENEWED });
export const updateSessionExpiration = expiresAt => ({
  type: UPDATE_EXPIRATION,
  data: expiresAt
});

const loadData = activities => dispatch => {
  if (activities.includes('view-document')) {
    dispatch(fetchAllApds());
  }
  if (activities.includes('view-users')) {
    dispatch(getUsers());
  }
  if (activities.includes('view-roles')) {
    dispatch(getRoles());
  }
};

const getCurrentUser = () => dispatch =>
  axios
    .get('/me')
    .then(userRes => {
      if (userRes.data.states.length === 0) {
        dispatch(requestAccessToState());
      }
      if (userRes.data.activities) {
        dispatch(loadData(userRes.data.activities));
      }
      dispatch(completeLogin(userRes.data));
      dispatch(resetLocked());
    })
    .catch(error => {
      const reason = error ? error.message : 'N/A';
      dispatch(failLogin(reason));
    });

export const logout = () => async dispatch => {
  dispatch(requestLogout());
  logoutAndClearTokens();
  dispatch(completeLogout());
};

const setupTokenManager = () => (dispatch, getState) => {
  setTokenListeners({
    expiredCallback: async () => {
      // called when the token is closer to expiring
      // than what was set in expireEarlySeconds
      const {
        auth: { latestActivity }
      } = getState();
      if (isUserActive(latestActivity) === true) {
        // the user is still actively using the system
        // renew the session for them without asking
        const expiresAt = await renewTokens();
        dispatch(updateSessionExpiration(expiresAt));
      } else {
        // The user hasn't been active for over 5 minutes
        // alert them that their session is expiring
        // and ask them if they want to continue
        dispatch(setSessionEnding());
      }
    }
  });
};

export const extendSession = () => async dispatch => {
  dispatch(requestSessionRenewal());
  const expiresAt = await renewTokens();
  dispatch(updateSessionExpiration(expiresAt));
  dispatch(setLatestActivity());
  dispatch(completeSessionRenewed());
};

export const mfaConfig = (mfaSelected, phoneNumber) => async dispatch => {
  const factor = await getFactor(mfaSelected);

  if (factor) {
    const enrollTransaction =
      mfaSelected === MFA_FACTOR_TYPES.SMS ||
      mfaSelected === MFA_FACTOR_TYPES.CALL
        ? await factor.enroll({
            profile: { phoneNumber, updatePhone: true }
          })
        : await factor.enroll();

    if (enrollTransaction.status === 'MFA_ENROLL_ACTIVATE') {
      return dispatch(
        mfaEnrollActivate(mfaSelected, enrollTransaction.factor.activation)
      );
    }
  }
  return false;
};

export const mfaAddPhone = mfaSelected => async dispatch => {
  dispatch(mfaEnrollAddPhone(mfaSelected));
};

export const mfaActivate = code => async dispatch => {
  const transaction = await retrieveExistingTransaction();

  const activateTransaction = await transaction.activate({
    passCode: code
  });

  if (activateTransaction.status === 'SUCCESS') {
    const expiresAt = await setTokens(activateTransaction.sessionToken);
    dispatch(setupTokenManager());
    dispatch(updateSessionExpiration(expiresAt));
    dispatch(getCurrentUser());
  }
};

export const login = (username, password) => dispatch => {
  dispatch(requestLogin());
  authenticateUser(username, password)
    .then(async res => {
      if (res.status === 'PASSWORD_EXPIRED') {
        return dispatch(failLogin('Password expired'));
      }

      if (res.status === 'LOCKED_OUT') {
        return dispatch(failLoginLocked());
      }
      // MFA enrollment starts here. If MFA is required as part
      // of a users policy, get the list of available options
      if (res.status === 'MFA_ENROLL') {
        const factors = getAvailableFactors(res.factors);
        return dispatch(mfaEnrollStart(factors));
      }

      if (res.status === 'MFA_REQUIRED') {
        const mfaFactor = res.factors.find(
          factor => factor.provider === 'OKTA' || factor.provider === 'GOOGLE'
        );

        if (!mfaFactor) throw new Error('Could not find a valid multi-factor');

        return mfaFactor.verify(res).then(() => {
          dispatch(completeFirstStage());
        });
      }

      if (res.status === 'SUCCESS') {
        const expiresAt = await setTokens(res.sessionToken);
        dispatch(setupTokenManager());
        dispatch(updateSessionExpiration(expiresAt));
        return dispatch(getCurrentUser());
      }
      return null;
    })
    .catch(error => {
      const reason = error ? error.message : 'N/A';
      dispatch(failLogin(reason));
    });
};

export const loginOtp = otp => async dispatch => {
  dispatch(startSecondStage());
  const transaction = await retrieveExistingTransaction();
  if (transaction) {
    return verifyMFA({ transaction, otp })
      .then(async ({ sessionToken }) => {
        const expiresAt = await setTokens(sessionToken);
        dispatch(setupTokenManager());
        dispatch(updateSessionExpiration(expiresAt));
        return dispatch(getCurrentUser());
      })
      .catch(error => {
        const reason = error ? error.message : 'N/A';
        if (reason === 'User is not assigned to the client application.') {
          dispatch(failLoginNotInGroup(reason));
        } else if (reason === 'User Locked') {
          dispatch(failLoginLocked(reason));
        } else {
          dispatch(failLoginMFA(reason));
        }
      });
  }
  return dispatch(failLoginMFA('Authentication failed'));
};

export const createAccessRequest = states => dispatch => {
  states.forEach(stateId => {
    axios
      .post(`/states/${stateId}/affiliations`)
      .then(() => {
        dispatch(successAccessToState());
        dispatch(getCurrentUser());
      })
      .catch(error => {
        const reason = error ? error.message : 'N/A';
        dispatch(failLogin(reason));
      });
  });
};

export const checkAuth = () => async dispatch => {
  dispatch(requestAuthCheck());

  dispatch(setupTokenManager());
  const expiresAt = await renewTokens();
  dispatch(updateSessionExpiration(expiresAt));

  return axios
    .get('/me')
    .then(req => {
      dispatch(completeAuthCheck(req.data));
      dispatch(loadData(req.data.activities));
    })
    .catch(() => dispatch(failAuthCheck()));
};
