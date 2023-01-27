import MockAdapter from 'axios-mock-adapter';
import api from './api';
import * as auth from './auth';

const set = url => {
  const old = process.env.API_URL;
  if (url) {
    process.env.API_URL = url;
  } else {
    delete process.env.API_URL;
  }

  return () => {
    process.env.API_URL = old;
  };
};

describe('api wrapper', () => {
  describe('url', () => {
    beforeEach(() => jest.resetModules());

    // TODO: clean up test
    xtest('uses API_URL env var', async () => {
      const reset = set('api-url');
      const updatedApi = await import('./api.js');
      expect(updatedApi.defaults.baseURL).toBe('api-url');
      reset();
    });

    test('uses default URL when env var is empty', async () => {
      const reset = set();
      expect(api.defaults.baseURL).toBe('http://localhost:8000');
      reset();
    });
  });

  describe('token auth', () => {
    test('auth header is populated when jwt is present in localStorage', async () => {
      const apiMock = new MockAdapter(api, { onNoMatch: 'throwException' });
      const managerSpy = jest
        .spyOn(auth, 'getLocalAccessToken')
        .mockImplementation(() => 'aaa.bbb.ccc');
      apiMock.onGet('/').reply(200);
      await api.get('/');
      expect(apiMock.history.get[0].headers.Authorization).toEqual(
        'Bearer aaa.bbb.ccc'
      );
      managerSpy.mockRestore();
    });

    test('auth header is empty', async () => {
      const apiMock = new MockAdapter(api, { onNoMatch: 'throwException' });
      const managerSpy = jest
        .spyOn(auth, 'getLocalAccessToken')
        .mockImplementation(() => '');
      apiMock.onGet('/').reply(200);
      await api.get('/');
      expect(apiMock.history.get[0].headers.Authorization).toBeUndefined();
      managerSpy.mockRestore();
    });
  });
});
