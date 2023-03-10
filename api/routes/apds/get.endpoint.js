import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../endpoint-tests/utils.js';
import { mnAPDId, akAPDId, badAPDId } from '../../seeds/test/apds.js';

describe('APD endpoint', () => {
  const db = getDB();
  const controller = new AbortController();
  let api;
  beforeAll(async () => {
    api = login('state-admin', controller);
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
    controller.abort();
  });

  describe('List APDs endpoint | GET /apds', () => {
    const url = '/apds';

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    describe('when authenticated', () => {
      it('as a user with all permissions', async () => {
        const controllerAll = new AbortController();
        const apiAll = login('all-permissions', controllerAll);
        const response = await apiAll.get(url);
        expect(response.status).toEqual(200);
        controllerAll.abort();
      });
    });
  });

  describe('Get specific APD | GET /apds/:id', () => {
    const url = id => `/apds/${id}`;

    unauthenticatedTest('get', url(mnAPDId));
    unauthorizedTest('get', url(mnAPDId));

    describe('when authenticated', () => {
      it('as a user without a state', async () => {
        const controllerNoState = new AbortController();
        const apiNoState = login('all-permissions-no-state', controllerNoState);
        const response = await apiNoState.get(url(mnAPDId));
        expect(response.status).toEqual(401);
        controllerNoState.abort();
      });

      describe('as a user with a state', () => {
        it('when requesting an APD that does not exist', async () => {
          const response = await api.get(url(badAPDId));
          expect(response.status).toEqual(404);
        });

        it('when requesting an APD that belongs to another state', async () => {
          const response = await api.get(url(mnAPDId));
          expect(response.status).toEqual(404);
        });

        it('when requesting an APD that belongs to their state', async () => {
          const response = await api.get(url(akAPDId));
          expect(response.status).toEqual(200);
        });
      });
    });
  });
});
