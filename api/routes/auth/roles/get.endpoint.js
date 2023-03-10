import { jest } from '@jest/globals';
import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';

describe('auth roles endpoint get endpoint', () => {
  jest.setTimeout(300000);
  const db = getDB();
  const controller = new AbortController();
  let api;
  beforeAll(async () => {
    api = login('state-admin', controller);
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
    controller.abort();
  });

  describe('GET /auth/roles', () => {
    const url = '/auth/roles';

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    it('when authenticated', async () => {
      const response = await api.get(url);
      const roles = response.data.map(r => ({
        activities: r.activities,
        name: r.name,
        isActive: r.isActive
      }));

      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
    });
  });
});
