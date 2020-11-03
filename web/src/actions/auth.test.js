import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './auth';
import axios from '../util/api';
import mockOktaAuth from '../util/oktaAuth';
import mockApp from './app';
import mockAdmin from './admin';

jest.mock('./app', () => {
  return {
    fetchAllApds: jest.fn()
  };
});
jest.mock('./admin', () => {
  return {
    getUsers: jest.fn(),
    getRoles: jest.fn()
  };
});

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('auth actions', () => {
  it('requestLogin should create LOGIN_REQUEST action', () => {
    expect(actions.requestLogin()).toEqual({ type: actions.LOGIN_REQUEST });
  });

  it('completeFirstStage should create LOGIN_OTP_STAGE action', () => {
    expect(actions.completeFirstStage()).toEqual({
      type: actions.LOGIN_OTP_STAGE
    });
  });

  it('startSecondStage should create LOGIN_MFA_REQUEST action', () => {
    expect(actions.startSecondStage()).toEqual({
      type: actions.LOGIN_MFA_REQUEST
    });
  });

  it('completeLogin should create LOGIN_SUCCESS action', () => {
    expect(actions.completeLogin()).toEqual({ type: actions.LOGIN_SUCCESS });
  });

  it('failLogin should create LOGIN_FAILURE action', () => {
    expect(actions.failLogin('foo')).toEqual({
      type: actions.LOGIN_FAILURE,
      error: 'foo'
    });
  });

  it('failLoginMFA should create LOGIN_MFA_FAILURE', () => {
    expect(actions.failLoginMFA('foo')).toEqual({
      type: actions.LOGIN_MFA_FAILURE,
      error: 'foo'
    });
  });

  it('completeLogout should create LOGOUT_SUCCESS action', () => {
    expect(actions.completeLogout()).toEqual({ type: actions.LOGOUT_SUCCESS });
  });

  describe('login (async)', () => {
    beforeEach(() => {
      fetchMock.reset();
      jest.clearAllMocks();
    });

    it('creates LOGIN_SUCCESS after successful single factor auth', async () => {
      const signInSpy = jest
        .spyOn(mockOktaAuth, 'signIn')
        .mockImplementation(() =>
          Promise.resolve({
            sessionToken: 'testSessionToken',
            status: 'SUCCESS'
          })
        );
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

      const store = mockStore({});
      fetchMock.onGet('/me').reply(200, { name: 'moop', activities: [] });
      const expectedActions = [
        { type: actions.LOGIN_REQUEST },
        { type: actions.RESET_LOCKED_OUT },
        { type: actions.LOGIN_SUCCESS, data: { name: 'moop', activities: [] } }
      ];

      await store.dispatch(actions.login('name', 'secret'));
      expect(signInSpy).toHaveBeenCalledTimes(1);
      await expect(getTokenSpy).toHaveBeenCalledTimes(1);
      await expect(addTokenSpy).toHaveBeenCalledWith('idToken', {
        idToken: 'xxx.yyy.zzz'
      });
      await expect(addTokenSpy).toHaveBeenCalledWith('accessToken', {
        accessToken: 'aaa.bbb.ccc'
      });
      expect(addTokenSpy).toHaveBeenCalledTimes(2);
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_OTP_STAGE after successful first stage of multi-factor auth', async () => {
      const verifySpy = jest.fn(() => Promise.resolve());
      const signInSpy = jest
        .spyOn(mockOktaAuth, 'signIn')
        .mockImplementation(() =>
          Promise.resolve({
            status: 'MFA_REQUIRED',
            factors: [
              {
                provider: 'OKTA',
                factorType: 'email',
                verify: verifySpy
              }
            ]
          })
        );
      const store = mockStore({});
      const expectedActions = [
        { type: actions.LOGIN_REQUEST },
        { type: actions.LOGIN_OTP_STAGE, data: 'email' }
      ];

      await store.dispatch(actions.login('name', 'secret'));
      expect(signInSpy).toHaveBeenCalledTimes(1);
      await expect(verifySpy).toHaveBeenCalledTimes(1);
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_FAILURE if no valid factor is found', async () => {
      const verifySpy = jest.fn(() => Promise.resolve());
      const signInSpy = jest
        .spyOn(mockOktaAuth, 'signIn')
        .mockImplementation(() =>
          Promise.resolve({
            status: 'MFA_REQUIRED',
            factors: [
              {
                provider: 'bad',
                factorType: 'email',
                verify: verifySpy
              }
            ]
          })
        );
      const store = mockStore({});
      const expectedActions = [
        { type: actions.LOGIN_REQUEST },
        {
          type: actions.LOGIN_FAILURE,
          error: 'Could not find a valid multi-factor'
        }
      ];

      await store.dispatch(actions.login('name', 'secret'));
      expect(signInSpy).toHaveBeenCalledTimes(1);
      await expect(verifySpy).not.toHaveBeenCalled();
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });
    
    it('creates LOCKED_OUT if account is locked out', async () => {
      const signInSpy = jest
        .spyOn(mockOktaAuth, 'signIn')
        .mockImplementation(() =>
          Promise.resolve({
            status: 'LOCKED_OUT',
          })
        );
        
      const store = mockStore({});
      const expectedActions = [
        { type: actions.LOGIN_REQUEST },
        { type: actions.LOCKED_OUT }
      ];

      await store.dispatch(actions.login('name', 'secret'));
      expect(signInSpy).toHaveBeenCalledTimes(1);
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_SUCCESS after successful second stage of multi-factor auth', async () => {
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

      const store = mockStore({});
      fetchMock.onGet('/me').reply(200, { name: 'moop', activities: [] });
      const expectedActions = [
        { type: actions.LOGIN_MFA_REQUEST },
        { type: actions.LOGIN_SUCCESS, data: { name: 'moop', activities: [] } }
      ];

      await store.dispatch(actions.loginOtp('otp'));
      await expect(txExistsSpy).toHaveBeenCalledTimes(1);
      await expect(txResumeSpy).toHaveBeenCalledTimes(1);
      await expect(verify).toHaveBeenCalledTimes(1);
      await expect(getTokenSpy).toHaveBeenCalledTimes(1);
      await expect(addTokenSpy).toHaveBeenCalledWith('idToken', {
        idToken: 'xxx.yyy.zzz'
      });
      await expect(addTokenSpy).toHaveBeenCalledWith('accessToken', {
        accessToken: 'aaa.bbb.ccc'
      });
      expect(addTokenSpy).toHaveBeenCalledTimes(2);
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_MFA_FAILURE when no transaction exists', async () => {
      jest.spyOn(mockOktaAuth.tx, 'exists').mockImplementation(() => false);

      const store = mockStore({});
      const expectedActions = [
        { type: actions.LOGIN_MFA_REQUEST },
        { type: actions.LOGIN_MFA_FAILURE, error: 'Authentication failed' }
      ];

      await store.dispatch(actions.loginOtp('otp'));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_MFA_FAILURE when it fails to resume transaction', async () => {
      jest.spyOn(mockOktaAuth.tx, 'exists').mockImplementation(() => false);
      jest
        .spyOn(mockOktaAuth.tx, 'resume')
        .mockImplementation(() =>
          Promise.reject(new Error('Failed to resume'))
        );

      const store = mockStore({});
      const expectedActions = [
        { type: actions.LOGIN_MFA_REQUEST },
        { type: actions.LOGIN_MFA_FAILURE, error: 'Authentication failed' }
      ];

      await store.dispatch(actions.loginOtp('otp'));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_MFA_FAILURE when verifing the otp fails', async () => {
      jest.spyOn(mockOktaAuth.tx, 'exists').mockImplementation(() => true);
      jest.spyOn(mockOktaAuth.tx, 'resume').mockImplementation(() =>
        Promise.resolve({
          verify: jest.fn(() =>
            Promise.reject(new Error('Authentication failed'))
          )
        })
      );

      const store = mockStore({});
      const expectedActions = [
        { type: actions.LOGIN_MFA_REQUEST },
        { type: actions.LOGIN_MFA_FAILURE, error: 'Authentication failed' }
      ];

      await store.dispatch(actions.loginOtp('otp'));
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_MFA_FAILURE when the token is not returned', async () => {
      jest.spyOn(mockOktaAuth.tx, 'exists').mockImplementation(() => true);
      const verify = jest.fn(() =>
        Promise.resolve({ sessionToken: 'testSessionToken' })
      );
      jest.spyOn(mockOktaAuth.tx, 'resume').mockImplementation(() =>
        Promise.resolve({
          verify
        })
      );
      jest
        .spyOn(mockOktaAuth.token, 'getWithoutPrompt')
        .mockImplementation(() =>
          Promise.reject(new Error('Authentication failed'))
        );

      const store = mockStore({});
      const expectedActions = [
        { type: actions.LOGIN_MFA_REQUEST },
        { type: actions.LOGIN_MFA_FAILURE, error: 'Authentication failed' }
      ];

      await store.dispatch(actions.loginOtp('otp'));
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_MFA_FAILURE when returned session token does not match the one sent in', async () => {
      jest.spyOn(mockOktaAuth.tx, 'exists').mockImplementation(() => true);
      jest.spyOn(mockOktaAuth.tx, 'resume').mockImplementation(() =>
        Promise.resolve({
          verify: jest.fn(() =>
            Promise.resolve({ sessionToken: 'testSessionToken' })
          )
        })
      );
      jest
        .spyOn(mockOktaAuth.token, 'getWithoutPrompt')
        .mockImplementation(() =>
          Promise.resolve({
            tokens: {
              accessToken: { accessToken: 'aaa.bbb.ccc' },
              idToken: { idToken: 'xxx.yyy.zzz' }
            },
            state: 'badstate'
          })
        );

      const store = mockStore({});
      const expectedActions = [
        { type: actions.LOGIN_MFA_REQUEST },
        { type: actions.LOGIN_MFA_FAILURE, error: 'Authentication failed' }
      ];

      await store.dispatch(actions.loginOtp('otp'));
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_MFA_FAILURE after fails to add access token', async () => {
      jest.spyOn(mockOktaAuth.tx, 'exists').mockImplementation(() => true);
      jest.spyOn(mockOktaAuth.tx, 'resume').mockImplementation(() =>
        Promise.resolve({
          verify: jest.fn(() =>
            Promise.resolve({ sessionToken: 'testSessionToken' })
          )
        })
      );
      jest
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
      jest
        .spyOn(mockOktaAuth.tokenManager, 'add')
        .mockImplementationOnce(() => Promise.resolve({ status: 'success' }))
        .mockImplementationOnce(() =>
          Promise.reject(new Error('Authentication failed'))
        );

      const store = mockStore({});
      fetchMock.onGet('/me').reply(200, { name: 'moop', activities: [] });
      const expectedActions = [
        { type: actions.LOGIN_MFA_REQUEST },
        { type: actions.LOGIN_MFA_FAILURE, error: 'Authentication failed' }
      ];

      await store.dispatch(actions.loginOtp('otp'));
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });
    
    it('creates LOCKED_OUT after too many failed MFA attempts', async () => {
      jest.spyOn(mockOktaAuth.tx, 'exists').mockImplementation(() => true);
      jest.spyOn(mockOktaAuth.tx, 'resume').mockImplementation(() =>
        Promise.resolve({
          verify: jest.fn(() =>
            Promise.reject(new Error('User Locked'))
          )
        })
      );
    
      const store = mockStore({});
      const expectedActions = [
        { type: actions.LOGIN_MFA_REQUEST },
        { type: actions.LOCKED_OUT }
      ];
    
      await store.dispatch(actions.loginOtp('otp'));
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_FAILURE after failure to get user on backend', async () => {
      const signInSpy = jest
        .spyOn(mockOktaAuth, 'signIn')
        .mockImplementation(() =>
          Promise.resolve({
            sessionToken: 'testSessionToken',
            status: 'SUCCESS'
          })
        );
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

      const store = mockStore({});
      fetchMock.onGet('/me').reply(401, { error: 'Unauthorized' });
      const expectedActions = [
        { type: actions.LOGIN_REQUEST },
        {
          type: actions.LOGIN_FAILURE,
          error: 'Request failed with status code 401'
        }
      ];

      await store.dispatch(actions.login('name', 'secret'));
      expect(signInSpy).toHaveBeenCalledTimes(1);
      await expect(getTokenSpy).toHaveBeenCalledTimes(1);
      await expect(addTokenSpy).toHaveBeenCalledWith('idToken', {
        idToken: 'xxx.yyy.zzz'
      });
      await expect(addTokenSpy).toHaveBeenCalledWith('accessToken', {
        accessToken: 'aaa.bbb.ccc'
      });
      expect(addTokenSpy).toHaveBeenCalledTimes(2);
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates LOGIN_SUCCESS after successful single factor auth', async () => {
      jest
        .spyOn(mockOktaAuth, 'signIn')
        .mockImplementation(() =>
          Promise.reject(new Error('Authentication failure'))
        );

      const store = mockStore({});
      const expectedActions = [
        { type: actions.LOGIN_REQUEST },
        {
          type: actions.LOGIN_FAILURE,
          error: 'Authentication failure'
        }
      ];

      await store.dispatch(actions.login('name', 'secret'));
      await timeout(25);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('logout (async)', () => {
    let logoutSpy;
    let managerSpy;

    beforeEach(() => {
      managerSpy = jest.spyOn(mockOktaAuth.tokenManager, 'remove');
      logoutSpy = jest
        .spyOn(mockOktaAuth, 'signOut')
        .mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
      fetchMock.reset();
      jest.clearAllMocks();
    });

    it('creates LOGOUT_SUCCESS after successful request', async () => {
      const store = mockStore({});

      const expectedActions = [{ type: actions.LOGOUT_SUCCESS }];

      await store.dispatch(actions.logout());
      expect(logoutSpy).toHaveBeenCalledTimes(1);
      await expect(managerSpy).toHaveBeenCalledWith('idToken');
      await expect(managerSpy).toHaveBeenCalledWith('accessToken');
      expect(managerSpy).toHaveBeenCalledTimes(2);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('checkAuth (async)', () => {
    afterEach(() => {
      fetchMock.reset();
      jest.clearAllMocks();
    });

    it('creates AUTH_CHEK_SUCCESS after successful auth', () => {
      const store = mockStore({});
      fetchMock.onGet('/me').reply(200, { name: 'moop', activities: [] });

      const expectedActions = [
        { type: actions.AUTH_CHECK_REQUEST },
        {
          type: actions.AUTH_CHECK_SUCCESS,
          data: { name: 'moop', activities: [] }
        }
      ];

      return store.dispatch(actions.checkAuth()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates AUTH_CHECK_FAILURE after unsuccessful auth and does not load APDs', () => {
      const store = mockStore({});
      fetchMock.onGet().reply(403);

      const expectedActions = [
        { type: actions.AUTH_CHECK_REQUEST },
        { type: actions.AUTH_CHECK_FAILURE }
      ];

      return store.dispatch(actions.checkAuth()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('handle loading data', () => {
    let fetchAllApdsSpy;
    let getUsersSpy;
    let getRolesSpy;

    beforeEach(() => {
      jest.clearAllMocks();

      jest.spyOn(mockOktaAuth, 'signIn').mockImplementation(() =>
        Promise.resolve({
          sessionToken: 'testSessionToken',
          status: 'SUCCESS'
        })
      );
      jest
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
      jest
        .spyOn(mockOktaAuth.tokenManager, 'add')
        .mockImplementation(() => Promise.resolve({ status: 'success' }));
      fetchAllApdsSpy = jest
        .spyOn(mockApp, 'fetchAllApds')
        .mockImplementation(() => {});
      getUsersSpy = jest
        .spyOn(mockAdmin, 'getUsers')
        .mockImplementation(() => {});
      getRolesSpy = jest
        .spyOn(mockAdmin, 'getRoles')
        .mockImplementation(() => {});
    });

    it('creates LOGIN_SUCCESS after successful single factor auth', async () => {
      fetchMock
        .onGet('/me')
        .reply(200, { name: 'moop', activities: ['view-document'] });

      const store = mockStore({});
      await store.dispatch(actions.login('name', 'secret'));
      await timeout(25);
      expect(fetchAllApdsSpy).toHaveBeenCalled();
      expect(getUsersSpy).not.toHaveBeenCalled();
      expect(getRolesSpy).not.toHaveBeenCalled();
    });
    it('creates LOGIN_SUCCESS after successful single factor auth', async () => {
      fetchMock
        .onGet('/me')
        .reply(200, { name: 'moop', activities: ['view-users'] });

      const store = mockStore({});
      await store.dispatch(actions.login('name', 'secret'));
      await timeout(25);
      expect(getUsersSpy).toHaveBeenCalled();
      expect(fetchAllApdsSpy).not.toHaveBeenCalled();
      expect(getRolesSpy).not.toHaveBeenCalled();
    });
    it('creates LOGIN_SUCCESS after successful single factor auth', async () => {
      fetchMock
        .onGet('/me')
        .reply(200, { name: 'moop', activities: ['view-roles'] });

      const store = mockStore({});
      await store.dispatch(actions.login('name', 'secret'));
      await timeout(25);
      expect(getRolesSpy).toHaveBeenCalled();
      expect(fetchAllApdsSpy).not.toHaveBeenCalled();
      expect(getUsersSpy).not.toHaveBeenCalled();
    });
  });
});
