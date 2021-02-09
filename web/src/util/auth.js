import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import oktaAuth from './oktaAuth';
import { MFA_FACTORS } from '../constants';

export const INACTIVITY_LIMIT = 300000;
export const EXPIRE_EARLY_SECONDS = 300;

export const getAccessToken = () => oktaAuth.getAccessToken();

// Cookie Methods

const COOKIE_NAME = 'gov.cms.eapd.api-token';

const setCookie = () => {
  const jwt = getAccessToken();
  console.log('API_URL', process.env.API_URL);
  let config = {};
  if (
    !process.env.API_URL ||
    process.env.API_URL.match(new RegExp(/localhost/i))
  ) {
    config = {
      sameSite: 'strict',
      path: '/apds/'
    };
  } else if (process.env.API_URL.match(/\/api/i)) {
    console.log('preview build');
    config = {
      sameSite: 'strict'
    };
  } else {
    console.log('prod');
    config = {
      domain: '.cms.gov',
      secure: true,
      sameSite: 'lax',
      path: '/apds/'
    };
  }
  Cookies.set(COOKIE_NAME, JSON.stringify({ accessToken: jwt }), config);
};

const removeCookie = () => {
  Cookies.remove(COOKIE_NAME);
};

// Log in methods
export const authenticateUser = (username, password) => {
  return oktaAuth.signInWithCredentials({ username, password });
};

export const retrieveExistingTransaction = () => {
  const exists = oktaAuth.tx.exists();
  return exists ? oktaAuth.tx.resume() : null;
};

export const verifyMFA = async ({ transaction, otp }) => {
  return transaction.verify({
    passCode: otp,
    autoPush: true
  });
};

export const getSessionExpiration = async () => {
  const { expiresAt = null } =
    (await oktaAuth.tokenManager.get('accessToken')) || {};
  return expiresAt;
};

export const setTokens = sessionToken => {
  const stateToken = uuidv4();
  return oktaAuth.token
    .getWithoutPrompt({
      // responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile'],
      sessionToken,
      state: stateToken
      // prompt: 'none'
    })
    .then(async res => {
      const { tokens } = res;
      // if (stateToken === responseToken) { // state not currently being returned
      await oktaAuth.tokenManager.setTokens(tokens);
      const expiresAt = await getSessionExpiration();
      if (expiresAt) setCookie();
      return expiresAt;
      // }
      // throw new Error('Authentication failed');
    });
};

export const getAvailableFactors = factors =>
  factors.map(item => {
    const { factorType, provider } = item;
    const { displayName, active } = MFA_FACTORS[`${factorType}-${provider}`];
    return {
      ...item,
      displayName,
      active
    };
  });

export const getFactor = async mfaSelectedType => {
  const transaction = await retrieveExistingTransaction();
  if (transaction) {
    const check = MFA_FACTORS[mfaSelectedType].findType || (() => false);
    return transaction.factors.find(f => check(f));
  }
  return null;
};

// Token Manager methods

export const setTokenListeners = ({
  expiredCallback = null,
  errorCallback = null,
  renewedCallback = null,
  removedCallback = null
}) => {
  if (expiredCallback) oktaAuth.tokenManager.on('expired', expiredCallback);
  if (errorCallback) oktaAuth.tokenManager.on('error', errorCallback);
  if (renewedCallback) oktaAuth.tokenManager.on('renewed', renewedCallback);
  if (removedCallback) oktaAuth.tokenManager.on('removed', removedCallback);
};

const renewToken = async key => {
  const token = await oktaAuth.tokenManager.get(key);
  if (token) {
    if (oktaAuth.tokenManager.hasExpired(token)) {
      oktaAuth.tokenManager.remove(key);
    } else {
      await oktaAuth.tokenManager.renew(key);
    }
  }
};

export const renewTokens = async () => {
  await renewToken('accessToken');
  await renewToken('idToken');
  const expiresAt = await getSessionExpiration();
  if (expiresAt) setCookie();
  return expiresAt;
};

export const removeTokenListeners = () => {
  oktaAuth.tokenManager.off('expired');
  oktaAuth.tokenManager.off('renewed');
  oktaAuth.tokenManager.off('error');
  oktaAuth.tokenManager.off('removed');
};

// Log out methods
export const logoutAndClearTokens = async () => {
  await oktaAuth.closeSession();
  removeCookie();
};

export const isUserActive = latestActivity => {
  const now = new Date().getTime();
  return now - latestActivity < INACTIVITY_LIMIT;
};
