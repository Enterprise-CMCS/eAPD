const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');
const { akAPDId, badAPDId } = require('../../../seeds/test/apds');

describe('APD events endpoints', () => {
  describe('Record an event associated with an APD | POST /apds/:id/events', () => {
    const db = getDB();
    beforeAll(async () => {
      await setupDB(db);
    });
    afterAll(async () => {
      await teardownDB(db);
    });

    const url = id => `/apds/${id}/events`;

    unauthenticatedTest('post', url(badAPDId));
    unauthorizedTest('post', url(badAPDId));

    describe('when authenticated as a user with permissions', () => {
      let api;
<<<<<<< HEAD
      beforeAll(() => {
        api = login('state-admin');
=======
      beforeAll(async () => {
        api = await login('state-admin');
>>>>>>> main
      });

      it('with a non-existant apd ID', async () => {
        const response = await api.post(url(badAPDId), { eventType: 'EXPORT' });
        expect(response.status).toEqual(404);
      });

      it('with a valid request', async () => {
        const response = await api.post(url(akAPDId), { eventType: 'EXPORT' });
        expect(response.status).toEqual(200);
        expect(response.data.success).toEqual(true);
      });
    });
  });
});
