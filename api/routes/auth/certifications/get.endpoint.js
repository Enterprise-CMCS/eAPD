import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';

describe('auth/certifications get endpoint', () => {
  const db = getDB();
  const controller = new AbortController();
  let api;
  beforeAll(async () => {
    api = login('fed-admin', controller);
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
    controller.abort();
  });

  describe('GET /auth/certifications', () => {
    const url = '/auth/certifications';

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    describe('when authenticated as a user with permission', () => {
      it('valid request', async () => {
        const response = await api.get(url);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
