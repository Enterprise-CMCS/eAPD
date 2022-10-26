const {
  apiKeyAuth,
  getDB,
  setupDB,
  teardownDB
} = require('../../../endpoint-tests/utils');
const { mnAPDId, badAPDId } = require('../../../seeds/test/apds');

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
    const response = await api.patch('/apds/submissions', [
      {
        apdId: mnAPDId,
        newStatus: 'approved'
      }
    ]);
    expect(response.status).toBe(403);
  });

  it('it returns 400 when body is invalid', async () => {
    const api = apiKeyAuth('10.0.0.0');
    const response = await api.patch('/apds/submissions', [
      {
        apdId: badAPDId,
        newStatus: 'approved'
      }
    ]);
    expect(response.status).toBe(400);
  });

  it('returns 204', async () => {
    const api = apiKeyAuth('10.0.0.0');
    const response = await api.patch('/apds/submissions', [
      {
        apdId: mnAPDId,
        newStatus: 'approved'
      }
    ]);
    expect(response.status).toEqual(204);
  });
});
