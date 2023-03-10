import {
  getDB,
  setupDB,
  teardownDB,
  apiAsStateAdmin,
  unauthenticatedTest,
  unauthorizedTest
} from '../../endpoint-tests/utils.js';
import {
  mnAPDId,
  akAPDId,
  finalAPDId,
  badAPDId
} from '../../seeds/test/apds.js';

describe('APD endpoint', () => {
  const db = getDB();
  const api = apiAsStateAdmin;
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('Delete/archive APD endpoint | DELETE /apds/:id', () => {
    const url = id => `/apds/${id}`;

    unauthenticatedTest('delete', url(0));
    unauthorizedTest('delete', url(0));

    describe('when authenticated as a user', () => {
      it('with a non-existant apd ID', async () => {
        const response = await api.delete(url(badAPDId));

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it(`with an APD in a state other than the user's state`, async () => {
        const response = await api.delete(url(mnAPDId));

        expect(response.status).toEqual(403);
        expect(response.data).toMatchSnapshot();
      });

      it('with an APD that is not in draft', async () => {
        const response = await api.delete(url(finalAPDId));

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid update', async () => {
        const response = await api.delete(url(akAPDId), {
          programOverview: 'new overview'
        });

        expect(response.status).toEqual(204);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
