import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import axios  from "axios";
import oktaAuth from './oktaAuth';
import { MFA_FACTORS } from '../constants';

export const INACTIVITY_LIMIT = 300000;
export const EXPIRE_EARLY_SECONDS = 300;

export const getAccessToken = async () => {
  const apiURL = process.env.API_URL
  const oktaToken = oktaAuth.getAccessToken();
  if (!oktaToken) return null
  const tokenResponse = await axios.get(`${apiURL}/me/jwToken?oktaToken=${oktaToken}`)
  return tokenResponse.data.jwt || null
}

// Cookie Methods

const COOKIE_NAME = 'gov.cms.eapd.api-token';

const getConfig = () =>{
  let config
  if (
    !process.env.API_URL ||
    process.env.API_URL.match(new RegExp(/localhost/i))
  ) {
    config = {
      sameSite: 'strict',
      path: '/apds/'
    };
  } else if (process.env.API_URL.match('/api')) {
    config = {
      sameSite: 'strict',
      path: '/api/apds/'
    };
  } else {
    config = {
      domain: '.cms.gov',
      secure: true,
      sameSite: 'lax',
      path: '/apds/'
    };
  }
  return config
}
const setCookie = async () => {
  console.log('setting cookie')
  if (navigator.cookieEnabled) {
    const jwt = await getAccessToken();

    console.log('setting cookie to: ', COOKIE_NAME,  jwt)
    const config = getConfig()
    console.log(config)
    Cookies.set(COOKIE_NAME, JSON.stringify({ accessToken: jwt }));
    console.log(Cookies.get())
    console.log('got cookie of: ', Cookies.get(COOKIE_NAME))
  }
};

const removeCookie = () => {
  if (navigator.cookieEnabled) {
    Cookies.remove(COOKIE_NAME);
  }
};

export const getLocalAccessToken = () =>{
  console.log('getting local access token')
  console.log(Cookies.get(COOKIE_NAME))
  const rawCookie = JSON.parse(Cookies.get(COOKIE_NAME))
  return rawCookie.accessToken
}

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
      if (expiresAt) await setCookie();
      console.log('cookie set while setting tokens')
      return expiresAt;
      // }
      // throw new Error('Authentication failed');
    });
};

export const getAvailableFactors = factors =>
  factors
    .filter(item => item.provider === 'OKTA')
    .map(item => {
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
  if (expiresAt) await setCookie();
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
  await oktaAuth.revokeAccessToken();
  await oktaAuth.closeSession();
  removeCookie();
};

export const isUserActive = latestActivity => {
  const now = new Date().getTime();
  return now - latestActivity < INACTIVITY_LIMIT;
};

// Cookie

const cookieName = 'gov.cms.eapd.hasConsented';

export const cookie = name => {
  const cookieMap = (document.cookie || '').split(';').reduce((c, s) => {
    const bits = s.trim().split('=');
    if (bits.length === 2) {
      return { ...c, [bits[0].trim()]: bits[1].trim() };
    }
    return c;
  }, {});

  return cookieMap[name];
};

export const hasConsented = () => cookie(cookieName) || false;

export const setConsented = () => {
  const config = getConfig()
  config.expires = 3
  config.path = '/'
  Cookies.set(cookieName, true, config);
  // document.cookie = `${cookieName}=true;max-age=259200;path=/`; // 3 days
};
