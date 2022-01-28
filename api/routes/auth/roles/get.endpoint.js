const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth roles endpoint get endpoint', () => {
  describe('GET /auth/roles', () => {
    const db = getDB();
    beforeAll(() => setupDB(db));
    afterAll(() => teardownDB(db));
    const url = '/auth/roles';

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    it('when authenticated', async () => {
      const api = login('state-admin');
      const response = await api.get(url);

      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot();
    });
  });
});
