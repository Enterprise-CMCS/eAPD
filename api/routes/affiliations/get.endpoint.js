const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

let api;

// using state AK because it's the first in the affiliations
// list so it will be the first affiliation loaded into the
// user, change once user is set
describe('Affiliations endpoint | GET', () => {
  const db = getDB();
  beforeAll(() => setupDB(db));
  afterAll(() => teardownDB(db));

  describe('GET /states/all/affiliations', () => {
    // unauthenticatedTest('get', '/states/all/affiliations');
    // unauthorizedTest('get', '/states/all/affiliations');

    xit('returns 200', async () => {
      api = login('all-permissions');
      const response = await api.get('/states/all/affiliations');
      expect(response.status).toEqual(200);
    });

    it('returns 403 when role is not eAPD Federal Admin', async () => {
      api = login('eapd-state-admin');
      const response = await api.get('/states/all/affiliations');
      expect(response.status).toEqual(403);
    });
  });

  xdescribe('GET /states/:stateId/affiliations', () => {
    unauthenticatedTest('get', '/states/ak/affiliations');
    unauthorizedTest('get', '/states/ak/affiliations');

    it('returns 200', async () => {
      const response = await api.get('/states/ak/affiliations');
      expect(response.status).toEqual(200);
    });
  });

  xdescribe('GET /states/:stateId/affiliations/:id', () => {
    unauthenticatedTest('get', '/states/ak/affiliations/4000');
    unauthorizedTest('get', '/states/ak/affiliations/4000');

    it('returns 200', async () => {
      const response = await api.get('/states/ak/affiliations/4000');
      expect(response.status).toEqual(200);
    });

    it('returns 400', async () => {
      const response = await api.get('/states/ak/affiliations/9000');
      expect(response.status).toEqual(400);
    });
  });
});
