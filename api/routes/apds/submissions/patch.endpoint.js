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
    const controller = new AbortController();
    const api = apiKeyAuth('bad ip', controller);
    const response = await api.patch('/apds/submissions', [
      {
        apdId: mnAPDId,
        newStatus: 'approved'
      }
    ]);
    expect(response.status).toBe(403);
    controller.abort();
  });

  it('it returns 400 when body is invalid', async () => {
    const controller = new AbortController();
    const api = apiKeyAuth(null, controller);
    const response = await api.patch('/apds/submissions', {
      apdId: badAPDId,
      newStatus: 'approved'
    });
    expect(response.status).toBe(400);
    controller.abort();
  });

  it('returns 200', async () => {
    const controller = new AbortController();
    const api = apiKeyAuth(null, controller);
    const response = await api.patch('/apds/submissions', [
      {
        apdId: mnAPDId,
        newStatus: 'approved'
      }
    ]);
    expect(response.status).toEqual(200);
    controller.abort();
  });
});
