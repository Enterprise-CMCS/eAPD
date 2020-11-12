import { v4 as uuidv4 } from 'uuid';
import oktaAuth from './oktaAuth';
import { MFA_FACTORS } from '../constants';

export const authenticateUser = (username, password) => {
  return oktaAuth.signIn({ username, password });
};

export const retrieveExistingTransaction = async () => {
  const exists = oktaAuth.tx.exists();
  if (exists) {
    const transaction = await oktaAuth.tx.resume();
    return transaction || null;
  }
  return null;
};

export const verifyMFA = ({ transaction, otp }) => {
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

export const logoutAndClearTokens = async () => {
  await oktaAuth.signOut();
  await oktaAuth.tokenManager.remove('idToken');
  await oktaAuth.tokenManager.remove('accessToken');
};
