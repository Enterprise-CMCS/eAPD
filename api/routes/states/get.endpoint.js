import {
  api,
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest
} from '../../endpoint-tests/utils.js';

describe('US States endpoint', () => {
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('GET /states', () => {
    it('returns 200', async () => {
      const response = await api.get('/states');
      expect(response.status).toEqual(200);
      expect(response.data.length).toEqual(57);
      const keys = Object.keys(response.data[0]);
      expect(keys).toEqual(['id', 'name']);
    });
  });

  describe('GET /states/:id', () => {
    unauthenticatedTest('get', '/states/ak');

    it('returns 200', async () => {
      const authedClient = login('state-admin');
      const response = await authedClient.get('/states/ak');
      expect(response.status).toEqual(200);
      const keys = Object.keys(response.data);
      expect(keys).toEqual(['id', 'name', 'medicaid_office', 'stateAdmins']);
    });

    it('returns 403', async () => {
      const authedClient = login();
      // This state does not exist, therefore it can't be available to this user.
      const response = await authedClient.get('/states/zz');
      expect(response.status).toEqual(403);
    });

    it('works for a Federal Admin', async () => {
      const authedClient = login('fed-admin');
      const response = await authedClient.get('/states/mn');
      expect(response.status).toEqual(200);
    });

    it('gives a 404 to a Federal Admin for a fake state', async () => {
      const authedClient = login('fed-admin');
      // This state does not exist, therefore it can't be available to this user.
      const response = await authedClient.get('/states/zz');
      expect(response.status).toEqual(404);
    });
  });
});
