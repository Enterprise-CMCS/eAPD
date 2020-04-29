const {
  api,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth activities endpoint | GET /auth/activities', () => {
  const url = '/auth/activities';

  unauthenticatedTest('get', url);
  unauthorizedTest('get', url);

  it('when authenticated', async () => {
    const response = await login().then(() => api.get(url));

    expect(response.status).toEqual(200);
    expect(response.data).toMatchSnapshot();
  });
});
