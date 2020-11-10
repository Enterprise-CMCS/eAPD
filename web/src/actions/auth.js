import { v4 as uuidv4 } from 'uuid';
import axios from '../util/api';

import { fetchAllApds } from './app';
import { getRoles, getUsers } from './admin';
import oktaAuth from '../util/oktaAuth';

export const AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS';
export const AUTH_CHECK_FAILURE = 'AUTH_CHECK_FAILURE';
// Ty Note: This doesn't appear to be used in the reducers. Should we remove it? Is it redundant with LOGIN_REQUEST now?
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
export const mfaEnrollStart = (factors, phoneNumber) => ({ type: LOGIN_MFA_ENROLL_START, data: { factors, phoneNumber } });
export const mfaEnrollAddPhone = mfaEnrollType => ({ type: LOGIN_MFA_ENROLL_ADD_PHONE, data: mfaEnrollType });
export const mfaEnrollActivate = (mfaEnrollType, activationData) => ({ 
  type: LOGIN_MFA_ENROLL_ACTIVATE, 
  data: { mfaEnrollType, activationData: activationData }
});
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

// Ty notes: mfaSelected is what the user picked for their MFA option.
// here we need to take that option and send it back to OKTA. Okta will
// then return with the activation code.
// ToDo:
//  1. General error handling (phone?)
//  2. Is there a way to do this without having to do 2 transactions?

export const mfaConfig = (mfaSelected, phoneNumber) => async dispatch => {
  const transaction = await retrieveExistingTransaction();

  const factor = transaction.factors.find(function(factor) {
    switch(mfaSelected) {
      case 'SMS Text':
        return factor.provider === 'OKTA' && factor.factorType === 'sms';
      case 'Call':
        return factor.provider === 'OKTA' && factor.factorType === 'call';
      case 'Email':
        return factor.provider === 'OKTA' && factor.factorType === 'email';
      case 'Okta Authenticator':
        return factor.provider === 'OKTA' && factor.factorType === 'token:software:totp';
      case 'Google Authenticator':
        return factor.provider === 'GOOGLE' && factor.factorType === 'token:software:totp';
      default:
        console.log("No valid mfa selection provided");
        break;
    }
  });

  if(mfaSelected === 'SMS Text' || mfaSelected === 'Call') {
    const enrollTransaction = await factor.enroll({
      profile: { phoneNumber, updatePhone: true }
    });
  
    if(enrollTransaction.status === 'MFA_ENROLL_ACTIVATE') {
      return dispatch(mfaEnrollActivate( 
        mfaSelected, 
        enrollTransaction.factor.activation
        )
      );
    };
  }

  const enrollTransaction = await factor.enroll();
  
  if(enrollTransaction.status === 'MFA_ENROLL_ACTIVATE') {
    return dispatch(mfaEnrollActivate( 
      mfaSelected, 
      enrollTransaction.factor.activation
      )
    );
  }
}

export const mfaAddPhone = (mfaSelected) => async dispatch => {
  dispatch(mfaEnrollAddPhone(mfaSelected));
}

// Ty note: this is very similar to the loginOtp method, with one
// exception: it uses transaction.activate instead of transaction.verify
export const mfaActivate = code => async dispatch => {
  const transaction = await retrieveExistingTransaction(); 
  
  const activateTransaciton = await transaction.activate({
    passCode: code
  });

  // Ty note: This is redundant code that should be abstracted into a method
  if (activateTransaciton.status === 'SUCCESS')  {
    await setTokens(activateTransaciton.sessionToken);
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
}

export const login = (username, password) => dispatch => {
  dispatch(requestLogin());
  authenticateUser(username, password)
    .then(async res => {
      if (res.status === 'LOCKED_OUT') {
        return dispatch(failLoginLocked());
      }
      // MFA enrollment starts here. If MFA is required as part
      // of a users policy, get the list of available options
      if (res.status === 'MFA_ENROLL') {
        const factors = res.factors.map(item => {
          const modifiedFactor = {
            factorType: item.factorType,
            provider: item.provider,
            vendorName: item.vendorName,
            status: item.status,
            enrollment: item.enrollment
          };
          
          switch(item.factorType) {
            case 'call':
              return { ...modifiedFactor, displayName: "Call", active: true }
            case 'email':
              return { ...modifiedFactor, displayName: "Email", active: true }
            case 'sms':
              return { ...modifiedFactor, displayName: 'SMS Text', active: true }
            case 'push':
              return { ...modifiedFactor, displayName: 'Okta Push', active: false }
            case 'token:software:totp': 
              return (item.vendorName === 'GOOGLE') ? { ...modifiedFactor, displayName: 'Google Authenticator', active: true } : { ...modifiedFactor, displayName: 'Okta Authenticator', active: true }
            default:
              console.log('unrecognized factor type provided by OKTA');
              break;
          }          
          return modifiedFactor;
        });
        return dispatch(mfaEnrollStart(factors));
      }
      
      if (res.status === 'MFA_REQUIRED') {     
        const mfaFactor = res.factors.find(
          factor => factor.provider === 'OKTA' || 'GOOGLE'
        );        
        
        if (!mfaFactor) throw new Error('Could not find a valid multi-factor');
        
        return mfaFactor.verify(res).then(() => {
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
