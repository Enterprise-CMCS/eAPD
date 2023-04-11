import {
  getDB,
  setupDB,
  teardownDB,
  apiAsStateAdmin,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';
import { naAPDId, badAPDId } from '../../../seeds/test/apds.js';

describe('APD events endpoints', () => {
  const db = getDB();
  const api = apiAsStateAdmin;
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('Record an event associated with an APD | POST /apds/:id/events', () => {
    const url = id => `/apds/${id}/events`;

    unauthenticatedTest('post', url(badAPDId));
    unauthorizedTest('post', url(badAPDId));

    describe('when authenticated as a user with permissions', () => {
      it('with a non-existant apd ID', async () => {
        const response = await api.post(url(badAPDId), { eventType: 'EXPORT' });
        expect(response.status).toEqual(404);
      });

      it('with a valid request', async () => {
        const response = await api.post(url(naAPDId), { eventType: 'EXPORT' });
        expect(response.status).toEqual(200);
        expect(response.data.success).toEqual(true);
      });
    });
  });
});
