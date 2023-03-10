import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';

// using state AK because it's the first in the affiliations
// list so it will be the first affiliation loaded into the
// user, change once user is set
describe('Affiliations endpoint | GET', () => {
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

  describe('GET /states/:stateId/affiliations', () => {
    unauthenticatedTest('get', '/states/ak/affiliations');
    unauthorizedTest('get', '/states/ak/affiliations');

    it('returns 200', async () => {
      const response = await api.get('/states/ak/affiliations');
      expect(response.status).toEqual(200);
    });
    // Figure this out when we have the
    it('returns 200 for the "federal" state', async () => {
      const controllerFed = new AbortController();
      const fedAdminApi = login('fed-admin', controllerFed);
      const response = await fedAdminApi.get('/states/fd/affiliations');
      expect(response.status).toEqual(200);
      controllerFed.abort();
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
});
