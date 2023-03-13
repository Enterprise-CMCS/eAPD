import {
  getDB,
  setupDB,
  teardownDB,
  apiAllPermissions,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';
import {
  mnAPDId,
  akAPDId,
  akMMISId,
  badAPDId
} from '../../../seeds/test/apds.js';

describe('APD files endpoints', () => {
  const db = getDB();
  const api = apiAllPermissions;
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('Get a file associated with an APD | GET /apds/:id/files/:fileID', () => {
    const url = (apdID, fileID) => `/apds/${apdID}/files/${fileID}`;

    unauthenticatedTest('get', url(0));
    unauthorizedTest('get', url(0));

    describe('when authenticated as a user with permission', () => {
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
          url(akMMISId, '74aa0d06-ae6f-472f-8999-6ca0487c494f')
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
