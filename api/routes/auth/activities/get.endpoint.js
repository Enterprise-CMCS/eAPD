const {
  authenticate,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth activities endpoint | GET /auth/activities', () => {
  const url = '/auth/activities';

  unauthenticatedTest('get', url);
  unauthorizedTest('get', url);

  it('when authenticated', async () => {
    const response = await authenticate()
      .then(api => api.get(url))
      .then(res => res);

    expect(response.status).toEqual(200);
    expect(response.data).toMatchSnapshot();
  });
});
