import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils';

describe('auth/certifications get endpoint', () => {
  describe('GET /auth/certifications', () => {
    const db = getDB();
    beforeAll(() => setupDB(db));
    afterAll(() => teardownDB(db));

    const url = '/auth/certifications';

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    describe('when authenticated as a user with permission', () => {
      let api;
      beforeAll(async () => {
        api = login('fed-admin');
      });

      it('valid request', async () => {
        const response = await api.get(url);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
