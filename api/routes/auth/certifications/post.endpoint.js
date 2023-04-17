import {
  getDB,
  setupDB,
  teardownDB,
  apiAsFedAdmin,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';

describe('auth/certifications endpoints', () => {
  const db = getDB();
  const api = apiAsFedAdmin;
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('POST /auth/certifications', () => {
    const validRequestBody = {
      ffy: 2021,
      name: 'Roger Klotz',
      email: 'fake@email.com',
      state: 'na',
      fileUrl: '/auth/certifications/files/12345'
    };

    const url = '/auth/certifications';

    unauthenticatedTest('post', url);
    unauthorizedTest('post', url);

    describe('when authenticated as a user with permission', () => {
      it('with no request body', async () => {
        const response = await api.post(url, {});

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid request body', async () => {
        const response = await api.post(url, validRequestBody);

        expect(response.status).toEqual(200);
      });
    });
  });
});
