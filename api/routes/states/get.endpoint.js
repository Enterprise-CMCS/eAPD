const {
  api,
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('/states endpoint | GET', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  it('when unauthenticated', async () => {
    const response = await api.get('/states');
    expect(response.status).toEqual(200);
    expect(response.data.length).toEqual(56);
    const keys = Object.keys(response.data[0])
    expect(keys).toEqual(['id', 'name']);
  });

  describe('/states/:id endpoint | GET', () => {
    unauthenticatedTest('get', '/states/fl');
    unauthorizedTest('get', '/states/fl');

    it('when authenticated', async () => {
      const response = await login()
        .then(api => api.get('/states/fl'));
      expect(response.status).toEqual(200);
      const keys = Object.keys(response.data)
      expect(keys).toEqual(['id', 'name', 'medicaid_office']);
    });
  });
});
