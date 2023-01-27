import mockOktaAuth from './oktaAuth';
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
  removeTokenListeners,
  isUserActive,
  exchangeAccessToken
} from './auth';

import { MFA_FACTOR_TYPES } from '../constants';
import MockAdapter from 'axios-mock-adapter';

describe('Auth Util', () => {
  it('authenticateUser', async () => {
    const signInSpy = jest
      .spyOn(mockOktaAuth, 'signInWithCredentials')
      .mockImplementation(() =>
        Promise.resolve({
          sessionToken: 'testSessionToken',
          status: 'SUCCESS'
        })
      );
    const res = await authenticateUser('username', 'password');
    expect(signInSpy).toHaveBeenCalled();
    expect(res.status).toEqual('SUCCESS');
    signInSpy.mockReset();
  });

  it('setTokens', async () => {
    const getTokenSpy = jest
      .spyOn(mockOktaAuth.token, 'getWithoutPrompt')
      .mockImplementation(({ state }) =>
        Promise.resolve({
          tokens: {
            accessToken: { accessToken: 'aaa.bbb.ccc' },
            idToken: { idToken: 'xxx.yyy.zzz' }
          },
          state
        })
      );

    const addTokenSpy = jest
      .spyOn(mockOktaAuth.tokenManager, 'setTokens')
      .mockImplementation(() => Promise.resolve({ status: 'success' }));

    await setTokens('123456789');
    await expect(getTokenSpy).toHaveBeenCalledTimes(1);
    await expect(addTokenSpy).toHaveBeenCalledWith({
      accessToken: { accessToken: 'aaa.bbb.ccc' },
      idToken: { idToken: 'xxx.yyy.zzz' }
    });

    getTokenSpy.mockReset();
    addTokenSpy.mockReset();
  });

  it('retrieveExistingTransaction', async () => {
    const txExistsSpy = jest
      .spyOn(mockOktaAuth.tx, 'exists')
      .mockImplementation(() => true);
    const txResumeSpy = jest
      .spyOn(mockOktaAuth.tx, 'resume')
      .mockImplementation(() =>
        Promise.resolve({ sessionToken: 'testSessionToken' })
      );

    await retrieveExistingTransaction();
    await expect(txExistsSpy).toHaveBeenCalledTimes(1);
    await expect(txResumeSpy).toHaveBeenCalledTimes(1);

    txExistsSpy.mockReset();
    txResumeSpy.mockReset();
  });

  it('verifyMFA', async () => {
    const transaction = {
      verify: jest.fn()
    };
    const otp = '21234';

    const transactionSpy = jest
      .spyOn(transaction, 'verify')
      .mockImplementation(() => true);

    await verifyMFA({ transaction, otp });
    await expect(transactionSpy).toHaveBeenCalledTimes(1);
    await expect(transactionSpy).toHaveBeenCalledWith({
      autoPush: true,
      passCode: '21234'
    });
    transactionSpy.mockReset();
  });

  it('getAvailableFactors', async () => {
    const factor = [{ factorType: 'call', provider: 'OKTA' }];
    expect(getAvailableFactors(factor)).toStrictEqual([
      {
        active: true,
        displayName: 'Call',
        factorType: 'call',
        provider: 'OKTA'
      }
    ]);
  });

  it('getFactor', async () => {
    const factors = [
      {
        active: true,
        displayName: 'Email',
        factorType: 'email',
        provider: 'OKTA'
      },
      {
        active: true,
        displayName: 'Call',
        factorType: 'call',
        provider: 'OKTA'
      }
    ];
    const existsSpy = jest
      .spyOn(mockOktaAuth.tx, 'exists')
      .mockImplementation(() => true);
    const resumeSpy = jest
      .spyOn(mockOktaAuth.tx, 'resume')
      .mockImplementation(() => Promise.resolve({ factors }));
    const factor = await getFactor(MFA_FACTOR_TYPES.CALL);
    expect(factors[1]).toEqual(factor);

    existsSpy.mockReset();
    resumeSpy.mockReset();
  });

  it('setTokenListener', async () => {
    const eventListener = jest
      .spyOn(mockOktaAuth.tokenManager, 'on')
      .mockImplementation(() => Promise.resolve());
    const mockExpiredCallback = jest.fn();
    await setTokenListeners({ expiredCallback: mockExpiredCallback });
    expect(eventListener).toHaveBeenCalledWith('expired', mockExpiredCallback);

    eventListener.mockReset();
  });

  it('isUserActive, true', () => {
    const latestActivity = new Date().getTime() - 400;
    expect(isUserActive(latestActivity)).toBe(true);
  });

  it('isUserActive, no', () => {
    const latestActivity = new Date().getTime() - 400000;
    expect(isUserActive(latestActivity)).toBe(false);
  });

  it('renewToken renewed', async () => {
    const getToken = jest
      .spyOn(mockOktaAuth.tokenManager, 'get')
      .mockImplementation(() =>
        Promise.resolve({
          accessToken: 'aaa.bbb.ccc',
          expiresAt: new Date().getTime() + 5000
        })
      );
    const hasExpired = jest
      .spyOn(mockOktaAuth.tokenManager, 'hasExpired')
      .mockImplementation(() => false);
    const renew = jest.spyOn(mockOktaAuth.tokenManager, 'renew');
    await renewTokens();
    expect(getToken).toHaveBeenCalledTimes(2);
    expect(hasExpired).toHaveBeenCalledTimes(1);
    expect(renew).toHaveBeenCalledTimes(1);

    getToken.mockReset();
    hasExpired.mockReset();
    renew.mockReset();
  });

  it('renewToken removed', async () => {
    const getToken = jest
      .spyOn(mockOktaAuth.tokenManager, 'get')
      .mockImplementation(() =>
        Promise.resolve({
          accessToken: 'aaa.bbb.ccc',
          expiresAt: new Date().getTime() + 5000
        })
      );
    const hasExpired = jest
      .spyOn(mockOktaAuth.tokenManager, 'hasExpired')
      .mockImplementation(() => true);
    const remove = jest.spyOn(mockOktaAuth.tokenManager, 'remove');
    await renewTokens();
    expect(getToken).toHaveBeenCalledTimes(2);
    expect(hasExpired).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);

    getToken.mockReset();
    hasExpired.mockReset();
    remove.mockReset();
  });

  it('removeTokenListeners', () => {
    const listenerOff = jest.spyOn(mockOktaAuth.tokenManager, 'off');
    removeTokenListeners();
    expect(listenerOff).toHaveBeenCalledTimes(4);

    listenerOff.mockReset();
  });

  it('logoutAndClearTokens', async () => {
    const revokeAccessTokenSpy = jest
      .spyOn(mockOktaAuth, 'revokeAccessToken')
      .mockImplementation(() =>
        Promise.resolve({
          status: 'SUCCESS'
        })
      );
    const closeSessionSpy = jest
      .spyOn(mockOktaAuth, 'closeSession')
      .mockImplementation(() =>
        Promise.resolve({
          status: 'SUCCESS'
        })
      );

    await logoutAndClearTokens();
    await expect(closeSessionSpy).toHaveBeenCalledTimes(1);
    await expect(revokeAccessTokenSpy).toHaveBeenCalledTimes(1);

    revokeAccessTokenSpy.mockReset();
    closeSessionSpy.mockReset();
  });

  it('exchanges an okta token for an eAPD one', async () => {
    const accessToken = 'AAA.BBBBB.CCC';
    const axios = await import('axios'); // eslint-disable-line global-require
    const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

    fetchMock.onGet('/me/jwToken').reply(200, { jwt: accessToken });

    const eAPDToken = await exchangeAccessToken({
      accessToken: 'XXX.YYYY.ZZZ'
    });
    expect(eAPDToken).toEqual(accessToken);
    expect(fetchMock.history.get[0].headers.Authorization).toEqual(
      `Bearer XXX.YYYY.ZZZ`
    );
  });

  it('does not try to contact the api if no access token is provided', async () => {
    const eAPDToken = await exchangeAccessToken({});
    expect(eAPDToken).toEqual(null);
  });
});
