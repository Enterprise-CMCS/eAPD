import { v4 as uuidv4 } from 'uuid';
import axios from '../util/api';

import { fetchAllApds } from './app';
import { getRoles, getUsers } from './admin';
import oktaAuth from '../util/oktaAuth';

export const AUTH_CHECK_FAILURE = 'AUTH_CHECK_FAILURE';
export const AUTH_CHECK_REQUEST = 'AUTH_CHECK_REQUEST';
export const AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS';

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_MFA_FAILURE = 'LOGIN_MFA_FAILURE';
export const LOGIN_OTP_STAGE = 'LOGIN_OTP_STAGE';
export const LOGIN_MFA_REQUEST = 'LOGIN_MFA_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOCKED_OUT = 'LOCKED_OUT';
export const RESET_LOCKED_OUT = 'RESET_LOCKED_OUT';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const requestAuthCheck = () => ({ type: AUTH_CHECK_REQUEST });
export const completeAuthCheck = user => ({
  type: AUTH_CHECK_SUCCESS,
  data: user
});
export const failAuthCheck = () => ({ type: AUTH_CHECK_FAILURE });

export const requestLogin = () => ({ type: LOGIN_REQUEST });
export const completeFirstStage = () => ({ type: LOGIN_OTP_STAGE });
export const startSecondStage = () => ({ type: LOGIN_MFA_REQUEST });
export const completeLogin = user => ({ type: LOGIN_SUCCESS, data: user });
export const failLogin = error => ({ type: LOGIN_FAILURE, error });
export const failLoginMFA = error => ({ type: LOGIN_MFA_FAILURE, error });
export const failLoginLocked = () => ({ type: LOCKED_OUT })
export const resetLocked = () => ({ type: RESET_LOCKED_OUT })

export const completeLogout = () => ({ type: LOGOUT_SUCCESS });

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

const authenticateUser = (username, password) => {
  return oktaAuth.signIn({ username, password });
};

const retrieveMFA = transaction => {
  const mfaFactor = transaction.factors.find(
    factor => factor.provider === 'OKTA'
  );

  if (!mfaFactor) throw new Error('Could not find a valid multi-factor');

  return mfaFactor.verify();
};

const retrieveExistingTransaction = async () => {
  const exists = oktaAuth.tx.exists();
  if (exists) {
    const transaction = await oktaAuth.tx.resume();
    return transaction || null;
  }
  return null;
};

const verifyMFA = ({ transaction, otp }) => {
  return transaction.verify({
    passCode: otp,
    autoPush: true
  });
};

const setTokens = sessionToken => {
  const stateToken = uuidv4();
  return oktaAuth.token
    .getWithoutPrompt({
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'profile'],
      sessionToken,
      state: stateToken
      // prompt: 'none'
    })
    .then(async res => {
      const { state: responseToken, tokens } = res;
      if (stateToken === responseToken) {
        await oktaAuth.tokenManager.add('idToken', tokens.idToken);
        await oktaAuth.tokenManager.add('accessToken', tokens.accessToken);
      } else {
        throw new Error('Authentication failed');
      }
    });
};

export const login = (username, password) => dispatch => {
  dispatch(requestLogin());
  authenticateUser(username, password)
    .then(async res => {
      if (res.status === 'LOCKED_OUT') {
        return dispatch(failLoginLocked());
      }
      
      if (res.status === 'MFA_REQUIRED') {
        return retrieveMFA(res).then(() => {
          dispatch(completeFirstStage());
        });          
      } 
      
      if (res.status === 'SUCCESS')  {
        await setTokens(res.sessionToken);
        return axios
          .get('/me')
          .then(userRes => {          
            dispatch(resetLocked());
            dispatch(completeLogin(userRes.data));
            dispatch(loadData(userRes.data.activities));
          })
          .catch(error => {
            const reason = error ? error.message : 'N/A';
            dispatch(failLogin(reason));
        });                
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
    verifyMFA({ transaction, otp })
      .then(async res => {
        const { sessionToken } = res;
        await setTokens(sessionToken);
        return axios.get('/me').then(userRes => {
          dispatch(completeLogin(userRes.data));
          dispatch(loadData(userRes.data.activities));
        });
      })
      .catch(error => {
        const reason = error ? error.message : 'N/A';
        if (reason === 'User Locked') {
          dispatch(failLoginLocked(reason));
        } else {
          dispatch(failLoginMFA(reason));          
        } 
      });
  } else {
    dispatch(failLoginMFA('Authentication failed'));
  }
};

export const logout = () => dispatch =>
  oktaAuth.signOut().then(async () => {
    await oktaAuth.tokenManager.remove('idToken');
    await oktaAuth.tokenManager.remove('accessToken');
    dispatch(completeLogout());
  });

export const checkAuth = () => dispatch => {
  dispatch(requestAuthCheck());

  return axios
    .get('/me')
    .then(req => {
      dispatch(completeAuthCheck(req.data));
      dispatch(loadData(req.data.activities));
    })
    .catch(() => dispatch(failAuthCheck()));
};
