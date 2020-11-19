import mockOktaAuth from './oktaAuth';
import {
  authenticateUser,
  retrieveExistingTransaction,
  verifyMFA,
  setTokens,
  getAvailableFactors,
  getFactor,
  logoutAndClearTokens
} from './auth';
import { MFA_FACTOR_TYPES } from '../constants';

describe('Auth Util', () => {
  it('authenticateUser', async () => {
    const signInSpy = jest
      .spyOn(mockOktaAuth, 'signIn')
      .mockImplementation(() =>
        Promise.resolve({
          sessionToken: 'testSessionToken',
          status: 'SUCCESS'
        })
      );
    const res = await authenticateUser('username', 'password');
    expect(signInSpy).toHaveBeenCalled();
    expect(res.status).toEqual('SUCCESS');
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
      .spyOn(mockOktaAuth.tokenManager, 'add')
      .mockImplementation(() => Promise.resolve({ status: 'success' }));

    await setTokens('123456789');
    await expect(getTokenSpy).toHaveBeenCalledTimes(1);
    await expect(addTokenSpy).toHaveBeenCalledWith('idToken', {
      idToken: 'xxx.yyy.zzz'
    });
    await expect(addTokenSpy).toHaveBeenCalledWith('accessToken', {
      accessToken: 'aaa.bbb.ccc'
    });
    expect(addTokenSpy).toHaveBeenCalledTimes(2);
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
    jest.spyOn(mockOktaAuth.tx, 'exists').mockImplementation(() => true);
    jest
      .spyOn(mockOktaAuth.tx, 'resume')
      .mockImplementation(() => Promise.resolve({ factors }));
    const factor = await getFactor(MFA_FACTOR_TYPES.CALL);
    expect(factors[1]).toEqual(factor);
  });

  it('logoutAndClearTokens', async () => {
    const signOutSpy = jest
      .spyOn(mockOktaAuth, 'signOut')
      .mockImplementation(() =>
        Promise.resolve({
          status: 'SUCCESS'
        })
      );
    const removeToken = jest
      .spyOn(mockOktaAuth.tokenManager, 'remove')
      .mockImplementation(() =>
        Promise.resolve({
          status: 'success'
        })
      );
    await logoutAndClearTokens();
    await expect(signOutSpy).toHaveBeenCalledTimes(1);
    await expect(removeToken).toHaveBeenCalledTimes(2);
  });
});
