const { api, authenticate } = require('../../endpoint-tests/utils');

describe('logout endpoint | /auth/logout', () => {
  const url = '/auth/logout';

  it('not already logged in', async () => {
    const response = await api.get(url)
      .then(res => res);

    expect(response.status).toEqual(400);
  });

  it('already logged in', async () => {
    const response = await authenticate()
      .then(api => api.get(url))
      .then(res => res);

    expect(response.status).toEqual(200);
  });
});
