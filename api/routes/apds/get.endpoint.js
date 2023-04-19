import {
  getDB,
  setupDB,
  teardownDB,
  apiAllPermissions,
  apiAsStateAdmin,
  apiNoPermissionsNoState,
  unauthenticatedTest,
  unauthorizedTest
} from '../../endpoint-tests/utils.js';
import { mdAPDId, naAPDId, badAPDId } from '../../seeds/test/apds.js';

describe('APD endpoint', () => {
  const db = getDB();
  const api = apiAsStateAdmin;
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('List APDs endpoint | GET /apds', () => {
    const url = '/apds';

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    describe('when authenticated', () => {
      it('as a user with all permissions', async () => {
        const response = await apiAllPermissions.get(url);
        expect(response.status).toEqual(200);
      });
    });
  });

  describe('Get specific APD | GET /apds/:id', () => {
    const url = id => `/apds/${id}`;

    unauthenticatedTest('get', url(mdAPDId));
    unauthorizedTest('get', url(mdAPDId));

    describe('when authenticated', () => {
      it('as a user without a state', async () => {
        const response = await apiNoPermissionsNoState.get(url(mdAPDId));
        expect(response.status).toEqual(401);
      });

      describe('as a user with a state', () => {
        it('when requesting an APD that does not exist', async () => {
          const response = await api.get(url(badAPDId));
          expect(response.status).toEqual(404);
        });

        it('when requesting an APD that belongs to another state', async () => {
          const response = await api.get(url(mdAPDId));
          expect(response.status).toEqual(404);
        });

        it('when requesting an APD that belongs to their state', async () => {
          const response = await api.get(url(naAPDId));
          expect(response.status).toEqual(200);
        });
      });
    });
  });
});
