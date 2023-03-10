import { actualVerifyEAPDToken } from '../../../auth/jwtUtils.js';
import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';

describe('auth roles endpoint get endpoint', () => {
  const db = getDB();
  const controller = new AbortController();
  let api;
  beforeAll(async () => {
    api = login(null, controller);
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
    controller.abort();
  });

  describe('GET /auth/state/:stateId', () => {
    const url = '/auth/state';

    unauthenticatedTest('get', `${url}/ak`);
    unauthorizedTest('get', `${url}/ak`);

    it('when authenticated', async () => {
      const response = await api.get(`${url}/md`);

      expect(response.status).toEqual(200);
      const claims = actualVerifyEAPDToken(response.data.jwt);
      expect(claims.state).toMatchSnapshot();
    });
  });
});
