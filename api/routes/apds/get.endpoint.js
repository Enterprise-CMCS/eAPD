const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');
const { mnAPDId, akAPDId, badAPDId } = require('../../seeds/test/apds');

describe('APD endpoint', () => {
  const db = getDB();
  beforeAll(() => setupDB(db));
  afterAll(() => teardownDB(db));

  describe('List APDs endpoint | GET /apds', () => {
    const url = '/apds';

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    describe('when authenticated', () => {
      it('as a user with all permissions', async () => {
        const api = login('all-permissions');
        const response = await api.get(url);
        expect(response.status).toEqual(200);
      });
    });
  });

  describe('Get specific APD | GET /apds/:id', () => {
    const url = id => `/apds/${id}`;

    unauthenticatedTest('get', url(mnAPDId));
    unauthorizedTest('get', url(mnAPDId));

    describe('when authenticated', () => {
      it('as a user without a state', async () => {
        const api = login('all-permissions-no-state');
        const response = await api.get(url(mnAPDId));
        expect(response.status).toEqual(401);
      });

      describe('as a user with a state', () => {
        let api;
        beforeAll(async () => {
          api = login('state-admin');
        });

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
