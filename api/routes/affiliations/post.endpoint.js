const {
  getDB,
  login,
  unauthenticatedTest
} = require('../../endpoint-tests/utils');

describe('Affiliations endpoint | POST /state/:stateId/affiliations', () => {
  const api = login();
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('post', '/states/fl/affiliations');

  it('returns 201', async () => {
    const response = await api.post('/states/fl/affiliations');
    expect(response.status).toEqual(201);
    const keys = Object.keys(response.data)
    expect(keys).toEqual(['id']);
  });

  it('returns 404 when US state is invalid', async () => {
    const response = await api.post('/states/zz/affiliations');
    expect(response.status).toEqual(404);
  });
});
