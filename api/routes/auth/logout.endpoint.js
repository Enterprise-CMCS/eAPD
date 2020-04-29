const { api, login } = require('../../endpoint-tests/utils');

describe('logout endpoint | /auth/logout', () => {
  const url = '/auth/logout';

  it('not already logged in', async () => {
    const response = await api.get(url);

    expect(response.status).toEqual(200);
  });

  it('already logged in', async () => {
    const response = await login().then(() => api.get(url));

    expect(response.status).toEqual(200);
  });
});
