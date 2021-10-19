const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('APD events endpoints', () => {
  describe('Record an event associated with an APD | POST /apds/:id/events', () => {
    const db = getDB();
    beforeAll(() => setupDB(db));
    afterAll(() => teardownDB(db));

    const url = id => `/apds/${id}/events`;

    unauthenticatedTest('post', url(0));
    unauthorizedTest('post', url(0));

    describe('when authenticated as a user with permissions', () => {
      let api;
      beforeAll(async () => {
        api = await login();
      });

      it('with a non-existant apd ID', async () => {
        const response = await api.post(url(9000), { eventType: 'EXPORT' });
        expect(response.status).toEqual(400);
      });

      it('with a valid request', async () => {
        const response = await api.post(url(4001), { eventType: 'EXPORT' });
        expect(response.status).toEqual(200);
        expect(response.data.success).toEqual(true);
      });
    });
  });
});
