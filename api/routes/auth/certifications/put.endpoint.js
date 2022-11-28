import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils';

describe('auth/certifications put endpoint', () => {
  describe('PUT /auth/certifications', () => {
    const db = getDB();
    beforeAll(() => setupDB(db));
    afterAll(() => teardownDB(db));

    const url = '/auth/certifications';

    const payload = {
      certificationId: '5004',
      affiliationId: '4004',
      stateId: 'ak',
      certificationFfy: '2022'
    };

    unauthenticatedTest('put', url);
    unauthorizedTest('put', url);

    describe('when authenticated as a user with permissions', () => {
      let api;
      beforeAll(async () => {
        api = login();
      });

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
