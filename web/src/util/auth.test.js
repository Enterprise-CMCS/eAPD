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
    const verify = jest.fn(() =>
      Promise.resolve({ sessionToken: 'testSessionToken' })
    );
    const txResumeSpy = jest
      .spyOn(mockOktaAuth.tx, 'resume')
      .mockImplementation(() =>
        Promise.resolve({
          verify
        })
      );

    await retrieveExistingTransaction();
    await expect(txExistsSpy).toHaveBeenCalledTimes(1);
    await expect(txResumeSpy).toHaveBeenCalledTimes(1);
  });

  it('verifyMFA', async () => {
    console.log('mocked OKTA', mockOktaAuth);
  });
});
