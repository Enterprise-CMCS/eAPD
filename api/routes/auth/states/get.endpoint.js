const { actualVerifyEAPDToken } = require('../../../auth/jwtUtils');

const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth roles endpoint get endpoint', () => {
  describe('GET /auth/state/:stateId', () => {
    const db = getDB();
    beforeAll(() => setupDB(db));
    afterAll(() => teardownDB(db));
    const url = '/auth/state';

    unauthenticatedTest('get', `${url}/ak`);
    unauthorizedTest('get', `${url}/ak`);

    it('when authenticated', async () => {
      const api = login();
      const response = await api.get(`${url}/md`);

      expect(response.status).toEqual(200);
      const claims = actualVerifyEAPDToken(response.data.jwt);
      expect(claims.state).toMatchSnapshot();
    });
  });
});
