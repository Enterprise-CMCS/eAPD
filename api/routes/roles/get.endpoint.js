const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('Roles endpoint', () => {
  const db = getDB();
  beforeAll(() => setupDB(db));
  afterAll(() => teardownDB(db));

  describe('GET /roles', () => {
    unauthenticatedTest('get', '/roles');
    unauthorizedTest('get', '/roles');

    it('returns expected number of roles given a system admin', async () => {
      const authedClient = login('all-permissions');
      const response = await authedClient.get('/roles');
      expect(response.status).toEqual(200);
      expect(response.data.length).toBe(6);
    });

    it('returns expected number of roles given a fed admin', async () => {
      const authedClient = login('fed-admin');
      const response = await authedClient.get('/roles');
      expect(response.status).toEqual(200);
      expect(response.data.length).toBe(2);
    });

    it('returns expected number of roles given a state admin', async () => {
      const authedClient = login('state-admin');
      const response = await authedClient.get('/roles');
      expect(response.status).toEqual(200);
      expect(response.data.length).toBe(2);
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
