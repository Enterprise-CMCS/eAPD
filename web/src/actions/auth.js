import jwt_decode from "jwt-decode";

import axios from '../util/api';

import { fetchAllApds } from './app';
import {
  authenticateUser,
  retrieveExistingTransaction,
  verifyMFA,
  setTokens,
  setCookie,
  getAvailableFactors,
  getFactor,
  setTokenListeners,
  renewTokens,
  logoutAndClearTokens,
  isUserActive,
} from '../util/auth';
import { MFA_FACTOR_TYPES } from '../constants';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_OTP_STAGE = 'LOGIN_OTP_STAGE';
export const LOGIN_MFA_REQUEST = 'LOGIN_MFA_REQUEST';
export const LOGIN_MFA_ENROLL_START = 'LOGIN_MFA_ENROLL_START';
export const LOGIN_MFA_ENROLL_ADD_PHONE = 'LOGIN_MFA_ENROLL_ADD_PHONE';
export const LOGIN_MFA_ENROLL_ACTIVATE = 'LOGIN_MFA_ENROLL_ACTIVATE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const STATE_ACCESS_REQUIRED = 'STATE_ACCESS_REQUIRED';
export const STATE_ACCESS_REQUEST = 'STATE_ACCESS_REQUEST';
export const AFFILIATION_SELECTION_REQUIRED = 'AFFILIATION_SELECTION_REQUIRED';
export const AFFILIATION_SELECTION_COMPLETE = 'AFFILIATION_SELECTION_COMPLETE';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';


export const LATEST_ACTIVITY = 'LATEST_ACTIVITY';
export const SESSION_ENDING_ALERT = 'SESSION_ENDING_ALERT';
export const REQUEST_SESSION_RENEWAL = 'REQUEST_SESSION_RENEWAL';
export const SESSION_RENEWED = 'SESSION_RENEWED';
export const UPDATE_EXPIRATION = 'UPDATE_EXPIRATION';

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
export const completeLogin = () => ({ type: LOGIN_SUCCESS });
export const failLogin = error => ({ type: LOGIN_FAILURE, error });
export const requestLogout = () => ({ type: LOGOUT_REQUEST });
export const completeLogout = () => ({ type: LOGOUT_SUCCESS });
export const requireAccessToState = () => ({ type: STATE_ACCESS_REQUIRED });
export const requestAccessToState = () => ({ type: STATE_ACCESS_REQUEST });
export const requireAffiliationSelection = () => ({ type: AFFILIATION_SELECTION_REQUIRED });
export const completeAffiliationSelection = () => ({ type: AFFILIATION_SELECTION_COMPLETE });
export const updateUserInfo = user => ({ type: UPDATE_USER_INFO, data: user });
export const setLatestActivity = () => ({ type: LATEST_ACTIVITY });
export const setSessionEnding = () => ({ type: SESSION_ENDING_ALERT });
export const requestSessionRenewal = () => ({ type: REQUEST_SESSION_RENEWAL });
export const completeSessionRenewed = () => ({ type: SESSION_RENEWED });
export const updateSessionExpiration = expiresAt => ({
  type: UPDATE_EXPIRATION,
  data: expiresAt
});

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

// Note: This function, the updateCurrentUser function and any functions
// that call them should be targets for refactoring. When adding a new
// condition to this method there was some unexpected behavior. Reloading
// a page when logged in would navigate a user back to the login page.
const getCurrentUser = () => dispatch =>
  axios
    .get('/me')
    .then(userRes => {
      if (userRes.data.states.length === 0) {
        dispatch(requireAccessToState());
        return '/login/affiliations/request';
      }
      if (userRes.data.states.length > 1) {
        dispatch(updateUserInfo(userRes.data));
        return '/login/affiliations/select'
      }
      dispatch(completeLogin());
      dispatch(updateUserInfo(userRes.data));
      return null;
    })
    .catch(error => {
      const reason = error ? error.message : 'N/A';
      dispatch(failLogin(reason));
      return null;
    });

const updateCurrentUser = () => dispatch =>
  axios
    .get('/me')
    .then(userRes => {
      dispatch(completeLogin());
      dispatch(updateUserInfo(userRes.data));
      return null;
    })
    .catch(error => {
      const reason = error ? error.message : 'N/A';
      dispatch(failLogin(reason));
      return null;
    });

export const logout = () => dispatch => {
  dispatch(requestLogout());
  logoutAndClearTokens().then( () => {
    dispatch(completeLogout()); 
  }).catch(() => {});
};

export const extendSession = () => async dispatch => {
  dispatch(requestSessionRenewal());
  const expiresAt = await renewTokens();
  dispatch(updateSessionExpiration(expiresAt));
  dispatch(setLatestActivity());
  dispatch(completeSessionRenewed());
  return expiresAt;
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
      dispatch(
        mfaEnrollActivate(mfaSelected, enrollTransaction.factor.activation)
      );
      if (
        mfaSelected === MFA_FACTOR_TYPES.GOOGLE ||
        mfaSelected === MFA_FACTOR_TYPES.OKTA
      ) {
        return '/login/mfa/configure-app';
      }
      return '/login/mfa/activate';
    }
  }
  return null;
};

export const mfaAddPhone = mfaSelected => async dispatch => {
  dispatch(mfaEnrollAddPhone(mfaSelected));
};

const authenticationSuccess = sessionToken => async dispatch => {
  dispatch(setupTokenManager());
  const expiresAt = await setTokens(sessionToken);
  dispatch(updateSessionExpiration(expiresAt));

  return dispatch(getCurrentUser());
};

export const authCheck = () => async dispatch => {
  dispatch(setupTokenManager());
  const expiresAt = await renewTokens();
  if (expiresAt) {
    dispatch(updateSessionExpiration(expiresAt));
    dispatch(setLatestActivity());
    return dispatch(updateCurrentUser());
  }
  dispatch(logout());
  return null;
};

export const mfaActivate = code => async dispatch => {
  const transaction = await retrieveExistingTransaction();

  const activateTransaction = await transaction.activate({
    passCode: code
  });

  if (activateTransaction.status === 'SUCCESS') {
    return dispatch(authenticationSuccess(activateTransaction.sessionToken));
  }
  return null;
};

export const login = (username, password) => dispatch => {
  dispatch(requestLogin());
  return authenticateUser(username, password)
    .then(async res => {
      if (res.status === 'PASSWORD_EXPIRED') {
        // show error message on current page
        return dispatch(failLogin('PASSWORD_EXPIRED'));
      }

      if (res.status === 'LOCKED_OUT') {
        dispatch(failLogin('LOCKED_OUT'));
        // redirect to locked-out page
        return '/login/locked-out';
      }
      // MFA enrollment starts here. If MFA is required as part
      // of a users policy, get the list of available options
      if (res.status === 'MFA_ENROLL') {
        const factors = getAvailableFactors(res.factors);
        dispatch(mfaEnrollStart(factors));
        // redirect to MFA enroll page
        return '/login/mfa/enroll';
      }

      if (res.status === 'MFA_REQUIRED') {
        const mfaFactor = res.factors.find(
          factor => factor.provider === 'OKTA' || factor.provider === 'GOOGLE'
        );

        if (!mfaFactor) throw new Error('Could not find a valid multi-factor');

        return mfaFactor.verify(res).then(() => {
          dispatch(completeFirstStage());
          // redirect to MFA verification page
          return '/login/mfa/verify';
        });
      }

      if (res.status === 'SUCCESS') {
        return dispatch(authenticationSuccess(res.sessionToken));
      }
      return null;
    })
    .catch(() => {
      dispatch(failLogin('AUTH_FAILED'));
      return null;
    });
};

export const loginOtp = otp => async dispatch => {
  dispatch(startSecondStage());
  const transaction = await retrieveExistingTransaction();
  if (transaction) {
    return verifyMFA({ transaction, otp })
      .then(({ sessionToken, status }) => {
        if (status === 'PASSWORD_EXPIRED') {
          return dispatch(failLogin('PASSWORD_EXPIRED'));
        }
        if (status === 'SUCCESS') {
          return dispatch(authenticationSuccess(sessionToken));
        }
        dispatch(failLogin('MFA_AUTH_FAILED'));
        return null;
      })
      .catch(error => {
        const reason = error ? error.message : 'N/A';
        if (reason === 'User is not assigned to the client application.') {
          dispatch(failLogin('NOT_IN_GROUP'));
          // redirect to not in group page
          return '/login/not-in-group';
        }
        if (reason === 'User Locked') {
          dispatch(failLogin('LOCKED_OUT'));
          // redirect to locked-out page
          return '/login/locked-out';
        }
        dispatch(failLogin('MFA_AUTH_FAILED'));
        return null;
      });
  }
  dispatch(failLogin('MFA_AUTH_FAILED'));
  return null;
};

export const createAccessRequest = states => async dispatch => {
  let failureReason = null;
  dispatch(requestAccessToState());
  await Promise.all(
    states.map(async state => {
      await axios
        .post(`/states/${state.id}/affiliations`)
        .then(() => {})
        .catch(error => {
          failureReason = error ? error.message : 'N/A';
        });
    })
  );

  if (failureReason) {
    dispatch(failLogin(failureReason));
    return null;
  }
  return '/login/affiliations/thank-you';
};

export const updateAccessRequest = states => async dispatch => {
  let failureReason = null;
  await Promise.all(
    states.map(async state => {
      await axios
        .post(`/states/${state.id}/affiliations`)
        .then(() => {})
        .catch(error => {
          failureReason = error ? error.message : 'N/A';
        });
    })
  );

  if (failureReason) {
    dispatch(failLogin(failureReason));
    return null;
  }
  return dispatch(getCurrentUser());
};

export const completeAccessRequest = () => dispatch => {
  return dispatch(getCurrentUser());
};

export const selectAffiliation = (stateToSwitchTo, currentState) => async dispatch => {
  if (stateToSwitchTo !== currentState) {
    await axios
      .get(`/auth/state/${stateToSwitchTo}`)
      .then((res) => {
        // Todo: Refactor this to be more FP style
        setCookie(res.data.jwt);
        const decoded = jwt_decode(res.data.jwt);
        dispatch(completeLogin());
        dispatch(updateUserInfo(decoded));
        dispatch(fetchAllApds());
      })
      .catch(() => {});
  }
  return '/';
}