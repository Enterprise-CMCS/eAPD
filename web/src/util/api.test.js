import MockAdapter from 'axios-mock-adapter';

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

    test('uses API_URL env var', () => {
      const reset = set('api-url');
      const api = require('./api').default; // eslint-disable-line global-require
      expect(api.defaults.baseURL).toBe('api-url');
      expect(api.defaults.withCredentials).toBe(true);
      reset();
    });

    test('uses default URL when env var is empty', () => {
      const reset = set();
      const api = require('./api').default; // eslint-disable-line global-require
      expect(api.defaults.baseURL).toBe('http://localhost:8000');
      expect(api.defaults.withCredentials).toBe(true);
      reset();
    });
  })

  describe('token auth', () => {
    test('auth header is populated when jwt is present in localStorage', async () => {
      localStorage.setItem('token', 'xxx.yyy.zzz');
      const api = require('./api').default; // eslint-disable-line global-require
      const apiMock = new MockAdapter(api);
      apiMock.onGet('/').reply(200);
      await api.get('/');
      expect(apiMock.history.get[0].headers.Authorization).toEqual('Bearer xxx.yyy.zzz');
      localStorage.removeItem('token');
    });

    test('auth header is empty', async () => {
      const api = require('./api').default; // eslint-disable-line global-require
      const apiMock = new MockAdapter(api);
      apiMock.onGet('/').reply(200);
      await api.get('/');
      expect(apiMock.history.get[0].headers.Authorization).toBeUndefined();
    });
  })
});
