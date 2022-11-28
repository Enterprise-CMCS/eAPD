import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils';

describe('auth/certifications delete endpoint', () => {
  describe('DELETE /auth/certifications', () => {
    const db = getDB();
    beforeAll(() => setupDB(db));
    afterAll(() => teardownDB(db));

    const url = '/auth/certifications';

    unauthenticatedTest('delete', url);
    unauthorizedTest('delete', url);

    describe('when authenticated as a user with permission', () => {
      let api;
      beforeAll(async () => {
        api = login();
      });

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
