import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../endpoint-tests/utils.js';

describe('Roles endpoint', () => {
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('GET /roles', () => {
    unauthenticatedTest('get', '/roles');
    unauthorizedTest('get', '/roles');

    it('returns expected roles given a system admin', async () => {
      const authedClient = login('all-permissions');
      const response = await authedClient.get('/roles');
      const roles = response.data.map(r => r.name);
      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
    });

    it('returns expected roles given a fed admin', async () => {
      const authedClient = login('fed-admin');
      const response = await authedClient.get('/roles');
      const roles = response.data.map(r => r.name);
      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
    });

    it('returns expected roles given a state admin', async () => {
      const authedClient = login('state-admin');
      const response = await authedClient.get('/roles');
      const roles = response.data.map(r => r.name);
      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
    });

    it('returns 200', async () => {
      const authedClient = login();
      const response = await authedClient.get('/roles');
      expect(response.status).toEqual(200);
    });

    it('returns 403', async () => {
      const unauthedClient = login('no-permissions');
      const response = await unauthedClient.get('/roles');
      expect(response.status).toEqual(403);
    });
  });
});
