const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

// using state AK because it's the first in the affiliations
// list so it will be the first affiliation loaded into the
// user, change once user is set
describe('Affiliations endpoint | GET', () => {
  const api = login('all-permissions');
  const db = getDB();
  beforeAll(() => setupDB(db));
  afterAll(() => teardownDB(db));

  describe('GET /states/all/affiliations', () => {
    // unauthenticatedTest('get', '/states/all/affiliations');
    // unauthorizedTest('get', '/states/all/affiliations');

    it('returns 200', async () => {
      const response = await api.get('/states/all/affiliations');
      expect(response.status).toEqual(200);
      // returning 400 because...
      // seeded user doesn't have appropriate role?
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
