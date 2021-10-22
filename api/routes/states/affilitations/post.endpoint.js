const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest
} = require('../../../endpoint-tests/utils');

describe('Affiliations endpoint | POST', () => {
  const api = login('no-permissions');
  const db = getDB();
  beforeAll(() => setupDB(db));
  afterAll(() => teardownDB(db));

  unauthenticatedTest('post', '/states/ak/affiliations');

  it('returns 201', async () => {
    const response = await api.post('/states/ak/affiliations');
    expect(response.status).toEqual(201);
    const keys = Object.keys(response.data);
    expect(keys).toEqual(['id']);
  });

  it('returns 400 when US state is invalid', async () => {
    const response = await api.post('/states/zz/affiliations');
    expect(response.status).toEqual(400);
  });
});
