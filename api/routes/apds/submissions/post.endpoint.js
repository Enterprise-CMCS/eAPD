import {
  apiKeyAuth,
  getDB,
  setupDB,
  teardownDB
} from '../../../endpoint-tests/utils.js';
import { mnAPDId, badAPDId } from '../../../seeds/test/apds.js';

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
    const response = await api.post('/apds/submissions', [
      {
        apdId: mnAPDId,
        newStatus: 'approved'
      }
    ]);
    expect(response.status).toBe(403);
  });

  it('it returns 400 when body is invalid', async () => {
    const api = apiKeyAuth();
    const response = await api.post('/apds/submissions', {
      apdId: badAPDId,
      newStatus: 'approved'
    });
    expect(response.status).toBe(400);
  });

  it('returns 200', async () => {
    const api = apiKeyAuth();
    const response = await api.post('/apds/submissions', [
      {
        apdId: mnAPDId,
        newStatus: 'approved'
      }
    ]);
    expect(response.status).toEqual(200);
  });
});
