import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest
} from '../../endpoint-tests/utils.js';

describe('US States endpoint', () => {
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
      const controllerState = new AbortController();
      const authedClient = login('state-admin', controllerState);
      const response = await authedClient.get('/states/ak');
      expect(response.status).toEqual(200);
      const keys = Object.keys(response.data);
      expect(keys).toEqual(['id', 'name', 'medicaid_office', 'stateAdmins']);
      controllerState.abort();
    });

    it('returns 403', async () => {
      // This state does not exist, therefore it can't be available to this user.
      const response = await api.get('/states/zz');
      expect(response.status).toEqual(403);
    });

    it('works for a Federal Admin', async () => {
      const controllerFed = new AbortController();
      const authedClient = login('fed-admin', controllerFed);
      const response = await authedClient.get('/states/mn');
      expect(response.status).toEqual(200);
      controllerFed.abort();
    });

    it('gives a 404 to a Federal Admin for a fake state', async () => {
      const controllerFed = new AbortController();
      const authedClient = login('fed-admin', controllerFed);
      // This state does not exist, therefore it can't be available to this user.
      const response = await authedClient.get('/states/zz');
      expect(response.status).toEqual(404);
      controllerFed.abort();
    });
  });
});
