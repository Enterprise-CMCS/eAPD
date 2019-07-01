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
});
