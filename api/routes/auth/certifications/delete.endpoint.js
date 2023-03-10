import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';

describe('auth/certifications delete endpoint', () => {
  const db = getDB();
  const controller = new AbortController();
  let api;
  beforeAll(async () => {
    api = login(null, controller);
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
    controller.abort();
  });

  describe('DELETE /auth/certifications', () => {
    const url = '/auth/certifications';

    unauthenticatedTest('delete', url);
    unauthorizedTest('delete', url);

    describe('when authenticated as a user with permission', () => {
      it('with an invalid request', async () => {
        const request = {
          data: {
            certificationId: null
          }
        };

        const response = await api.delete(url, request);

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid request', async () => {
        const request = {
          data: {
            certificationId: '5004'
          }
        };

        const response = await api.delete(url, request);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
