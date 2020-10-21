const {
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('Affiliation Requests endpoint', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  describe('GET /state/:stateId/affiliationRequests', () => {
    unauthenticatedTest('get', '/states/fl/affiliationRequests');
    unauthorizedTest('get', '/states/fl/affiliationRequests');

    it('returns 201', async () => {
      const response = await login()
        .then(api => api.get('/states/fl/affiliationRequests'));
      expect(response.status).toEqual(200);
    });
  });

  describe('GET /state/:stateId/affiliationRequests/:id', () => {
    unauthenticatedTest('get', '/states/fl/affiliationRequests/4000');
    unauthorizedTest('get', '/states/fl/affiliationRequests/4000');

    it('returns 200', async () => {
      const response = await login()
        .then(api => api.get('/states/fl/affiliationRequests/4000'));
      expect(response.status).toEqual(200);
    });

    it('returns 404', async () => {
      const response = await login()
        .then(api => api.get('/states/fl/affiliationRequests/NaN'));
      expect(response.status).toEqual(404);
    });
  })
});
