import { jest } from '@jest/globals';
import {
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
    const controller = new AbortController();
    const api = apiKeyAuth('bad ip', controller);
    const response = await api.get('/apds/submissions');
    expect(response.status).toBe(403);
    controller.abort();
  });

  it('returns 200 when the IP is allowed', async () => {
    const controller = new AbortController();
    const api = apiKeyAuth(null, controller);
    const response = await api.get('/apds/submissions');
    expect(response.status).toEqual(200);
    controller.abort();
  });
});
