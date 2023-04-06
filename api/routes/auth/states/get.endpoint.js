import { actualVerifyEAPDToken } from '../../../auth/jwtUtils.js';
import {
  getDB,
  setupDB,
  teardownDB,
  apiAllPermissions,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';

describe('auth roles endpoint get endpoint', () => {
  const db = getDB();
  const api = apiAllPermissions;
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
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
