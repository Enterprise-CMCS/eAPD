import {
  getDB,
  setupDB,
  teardownDB,
  apiAsFedAdmin,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';

describe('auth/certifications put endpoint', () => {
  const db = getDB();
  const api = apiAsFedAdmin;
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('PUT /auth/certifications', () => {
    const url = '/auth/certifications';

    const payload = {
      certificationId: '5004',
      affiliationId: '4005',
      stateId: 'ak',
      certificationFfy: '2023'
    };

    unauthenticatedTest('put', url);
    unauthorizedTest('put', url);

    describe('when authenticated as a user with permissions', () => {
      it('with no request body', async () => {
        const response = await api.put(url, {});

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid request body', async () => {
        const response = await api.put(url, payload);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
