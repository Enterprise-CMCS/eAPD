import { v4 as uuidv4 } from 'uuid';
import oktaAuth from './oktaAuth';
import { MFA_FACTORS } from '../constants';

// OKTA Auth Wrappers
export const authenticateUser = (username, password) => {
  return oktaAuth.signIn({ username, password });
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

export const setTokens = sessionToken => {
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

export const logoutAndClearTokens = async () => {
  await oktaAuth.signOut();
  await oktaAuth.tokenManager.remove('idToken');
  await oktaAuth.tokenManager.remove('accessToken');
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
  document.cookie = `${cookieName}=true;max-age=259200;path=/`; // 3 days
};
