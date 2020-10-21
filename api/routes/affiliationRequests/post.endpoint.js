const {
  getDB,
  login,
  unauthenticatedTest
} = require('../../endpoint-tests/utils');

describe('Affiliation Requests endpoint | POST /state/:stateId/affiliationRequests', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('post', '/states/fl/affiliationRequests');

  it('returns 201', async () => {
    const response = await login()
      .then(api => api.post('/states/fl/affiliationRequests'));
    expect(response.status).toEqual(201);
    const keys = Object.keys(response.data)
    expect(keys).toEqual(['id']);
  });

  it('returns 404 when US state is invalid', async () => {
    const response = await login()
      .then(api => api.post('/states/zz/affiliationRequests'));
    expect(response.status).toEqual(404);
  });
});
