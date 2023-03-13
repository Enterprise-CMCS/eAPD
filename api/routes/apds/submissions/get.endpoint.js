import { jest } from '@jest/globals';
import {
  apiNoKey,
  apiKeyAuth,
  getDB,
  setupDB,
  teardownDB
} from '../../../endpoint-tests/utils.js';

describe('Submissions endpoint | GET', () => {
  jest.setTimeout(300000);
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  it('it returns 403 when the IP is not allowed', async () => {
    const response = await apiNoKey.get('/apds/submissions');
    expect(response.status).toBe(403);
  });

  it('returns 200 when the IP is allowed', async () => {
    const response = await apiKeyAuth.get('/apds/submissions');
    expect(response.status).toEqual(200);
  });
});
