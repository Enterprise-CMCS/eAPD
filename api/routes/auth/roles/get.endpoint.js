const {
  authenticate,
  getDB,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth roles endpoint | GET /auth/roles', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = '/auth/roles';

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
