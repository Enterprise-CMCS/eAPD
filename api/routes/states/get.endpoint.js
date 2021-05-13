const {
  api,
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest
} = require('../../endpoint-tests/utils');

describe('US States endpoint', () => {
  const db = getDB();
  beforeAll(() => setupDB(db));
  afterAll(() => teardownDB(db));

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
    unauthenticatedTest('get', '/states/fl');

    it('returns 200', async () => {
      const authedClient = login();
      const response = await authedClient.get('/states/fl');
      expect(response.status).toEqual(200);
      const keys = Object.keys(response.data);
      expect(keys).toEqual(['id', 'name', 'medicaid_office', 'stateAdmins']);
    });

    it('returns 400', async () => {
      const authedClient = login();
      const response = await authedClient.get('/states/zz');
      expect(response.status).toEqual(400);
    });
  });
});
