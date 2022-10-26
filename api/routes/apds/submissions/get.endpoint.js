const {
  apiKeyAuth,
  getDB,
  setupDB,
  teardownDB
} = require('../../../endpoint-tests/utils');

describe(' /apds/submissions', () => {
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  it('it returns 403 when the IP is not allowed', async () => {
    const api = apiKeyAuth('bad ip');
    const response = await api.get('/apds/submissions');
    expect(response.status).toBe(403);
  });

  it('returns 200 when the IP is allowed', async () => {
    const api = apiKeyAuth('10.0.0.0');
    const response = await api.get('/apds/submissions');
    expect(response.status).toEqual(200);
  });
});
