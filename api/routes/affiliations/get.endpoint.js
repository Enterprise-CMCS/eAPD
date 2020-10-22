const {
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('Affiliations endpoint | GET', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  describe('GET /state/:stateId/affiliations', () => {
    unauthenticatedTest('get', '/states/fl/affiliations');
    unauthorizedTest('get', '/states/fl/affiliations');

    it('returns 201', async () => {
      const response = await login()
        .then(api => api.get('/states/fl/affiliations'));
      expect(response.status).toEqual(200);
    });
  });

  describe('GET /state/:stateId/affiliations/:id', () => {
    unauthenticatedTest('get', '/states/fl/affiliations/4000');
    unauthorizedTest('get', '/states/fl/affiliations/4000');

    it('returns 200', async () => {
      const response = await login()
        .then(api => api.get('/states/fl/affiliations/4000'));
      expect(response.status).toEqual(200);
    });

    it('returns 404', async () => {
      const response = await login()
        .then(api => api.get('/states/fl/affiliations/NaN'));
      expect(response.status).toEqual(404);
    });
  })
});
