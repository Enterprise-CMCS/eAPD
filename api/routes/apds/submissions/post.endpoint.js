import {
  apiNoKey,
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

  it('it returns 403 when there is no api key', async () => {
    const response = await apiNoKey.post('/apds/submissions', [
      {
        apdId: mnAPDId,
        newStatus: 'approved'
      }
    ]);
    expect(response.status).toBe(403);
  });

  it('it returns 400 when body is invalid', async () => {
    const response = await apiKeyAuth.post('/apds/submissions', {
      apdId: badAPDId,
      newStatus: 'approved'
    });
    expect(response.status).toBe(400);
  });

  it('returns 200 when there is an api key and the body is valid', async () => {
    const response = await apiKeyAuth.post('/apds/submissions', [
      {
        apdId: mnAPDId,
        newStatus: 'approved'
      }
    ]);
    expect(response.status).toEqual(200);
  });
});
