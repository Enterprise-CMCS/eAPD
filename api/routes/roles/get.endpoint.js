import {
  getDB,
  setupDB,
  teardownDB,
  apiAllPermissions,
  apiAsFedAdmin,
  apiAsStateAdmin,
  apiNoPermissions,
  unauthenticatedTest,
  unauthorizedTest
} from '../../endpoint-tests/utils.js';

describe('Roles endpoint', () => {
  const db = getDB();
  const controller = new AbortController();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
    controller.abort();
  });

  describe('GET /roles', () => {
    unauthenticatedTest('get', '/roles');
    unauthorizedTest('get', '/roles');

    it('returns expected roles given a system admin', async () => {
      const response = await apiAllPermissions.get('/roles');
      const roles = response.data.map(r => r.name);
      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
    });

    it('returns expected roles given a fed admin', async () => {
      const response = await apiAsFedAdmin.get('/roles');
      const roles = response.data.map(r => r.name);
      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
    });

    it('returns expected roles given a state admin', async () => {
      const response = await apiAsStateAdmin.get('/roles');
      const roles = response.data.map(r => r.name);
      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
    });

    it('returns 200', async () => {
      const response = await apiAllPermissions.get('/roles');
      expect(response.status).toEqual(200);
    });

    it('returns 403', async () => {
      const response = await apiNoPermissions.get('/roles');
      expect(response.status).toEqual(403);
    });
  });
});
