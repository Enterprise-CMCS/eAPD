const { actualVerifyEAPDToken } = require('../../../auth/jwtUtils');
const logger = require('../../../logger')('auth state get');

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
      const api = login('state-admin');
      logger.info('logging in as state-admin');
      const response = await api.get(`${url}/md`);
      logger.info(`data: ${JSON.stringify(response.data)}`);

      expect(response.status).toEqual(200);
      const claims = actualVerifyEAPDToken(response.data.jwt);
      expect(claims.state).toMatchSnapshot();
    });
  });
});
