import {
  getDB,
  setupDB,
  teardownDB,
  apiAllPermissions,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../../endpoint-tests/utils.js';

describe('auth/certifications/files endpoints', () => {
  const db = getDB();
  const api = apiAllPermissions;
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('Get a file by fileId | GET /auth/certifications/:fileID', () => {
    const url = fileID => `/auth/certifications/files/${fileID}`;

    describe('when authenticated as a user with permission', () => {
      unauthenticatedTest('get', url(0));
      unauthorizedTest('get', url(0));

      it('with an invalid request', async () => {
        const response = await api.get(url(null));

        expect(response.status).toEqual(400);
      });

      it('with a valid request', async () => {
        const response = await api.get(url('test-123'));

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
