import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';
import {
  mnAPDId,
  akAPDId,
  akAPD2Id,
  badAPDId
} from '../../../seeds/test/apds.js';

describe('APD files endpoints', () => {
  describe('Get a file associated with an APD | GET /apds/:id/files/:fileID', () => {
    const db = getDB();
    beforeAll(() => setupDB(db));
    afterAll(() => teardownDB(db));

    const url = (apdID, fileID) => `/apds/${apdID}/files/${fileID}`;

    unauthenticatedTest('get', url(0));
    unauthorizedTest('get', url(0));

    describe('when authenticated as a user with permission', () => {
      let api;

      beforeAll(async () => {
        api = login();
      });

      it('with a non-existant apd ID', async () => {
        const response = await api.get(
          url(badAPDId, '74aa0d06-ae6f-472f-8999-6ca0487c494f')
        );

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it(`with an APD in a state other than the user's state`, async () => {
        const response = await api.get(
          url(mnAPDId, '74aa0d06-ae6f-472f-8999-6ca0487c494f')
        );

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with an APD that is not associated with the file', async () => {
        const response = await api.get(
          url(akAPD2Id, '74aa0d06-ae6f-472f-8999-6ca0487c494f')
        );

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid request', async () => {
        const response = await api.get(
          url(akAPDId, '74aa0d06-ae6f-472f-8999-6ca0487c494f')
        );

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
