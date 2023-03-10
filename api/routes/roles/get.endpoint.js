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
      const controllerAll = new AbortController();
      const authedClient = login('all-permissions', controllerAll);
      const response = await authedClient.get('/roles');
      const roles = response.data.map(r => r.name);
      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
      controllerAll.abort();
    });

    it('returns expected roles given a fed admin', async () => {
      const controllerFed = new AbortController();
      const authedClient = login('fed-admin', controllerFed);
      const response = await authedClient.get('/roles');
      const roles = response.data.map(r => r.name);
      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
      controllerFed.abort();
    });

    it('returns expected roles given a state admin', async () => {
      const controllerState = new AbortController();
      const authedClient = login('state-admin', controllerState);
      const response = await authedClient.get('/roles');
      const roles = response.data.map(r => r.name);
      expect(response.status).toEqual(200);
      expect(roles).toMatchSnapshot();
      controllerState.abort();
    });

    it('returns 200', async () => {
      const controllerAuth = new AbortController();
      const authedClient = login(null, controllerAuth);
      const response = await authedClient.get('/roles');
      expect(response.status).toEqual(200);
      controllerAuth.abort();
    });

    it('returns 403', async () => {
      const controllerNoPermissions = new AbortController();
      const unauthedClient = login('no-permissions', controllerNoPermissions);
      const response = await unauthedClient.get('/roles');
      expect(response.status).toEqual(403);
      controllerNoPermissions.abort();
    });
  });
});
