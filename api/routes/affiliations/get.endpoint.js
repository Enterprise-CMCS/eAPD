import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../endpoint-tests/utils.js';

// using state AK because it's the first in the affiliations
// list so it will be the first affiliation loaded into the
// user, change once user is set
describe('Affiliations endpoint | GET', () => {
  jest.setTimeout(30000);
  const api = login('state-admin');
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('GET /states/:stateId/affiliations', () => {
    unauthenticatedTest('get', '/states/ak/affiliations');
    unauthorizedTest('get', '/states/ak/affiliations');

    it('returns 200', async () => {
      const response = await api.get('/states/ak/affiliations');
      expect(response.status).toEqual(200);
    });
    // Figure this out when we have the
    it('returns 200 for the "federal" state', async () => {
      const fedAdminApi = login('fed-admin');
      const response = await fedAdminApi.get('/states/fd/affiliations');
      expect(response.status).toEqual(200);
    });
  });

  describe('GET /states/:stateId/affiliations/:id', () => {
    unauthenticatedTest('get', '/states/ak/affiliations/4000');
    unauthorizedTest('get', '/states/ak/affiliations/4000');

    it('returns 200', async () => {
      const response = await api.get('/states/ak/affiliations/4000');
      expect(response.status).toEqual(200);
    });

    it('returns 404', async () => {
      const response = await api.get('/states/ak/affiliations/9000');
      expect(response.status).toEqual(404);
    });
  });

  describe('GET /affiliations/me', () => {
    unauthenticatedTest('get', '/affiliations/me');
    // usually there would be an unauthorized test here, but this endpoint is
    // implicitly authorized because it is about the current user.

    it('returns 200', async () => {
      const response = await api.get('/affiliations/me');
      expect(response.status).toEqual(200);
    });
  });
});
