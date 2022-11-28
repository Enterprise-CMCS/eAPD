import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../endpoint-tests/utils';
import { mnAPDId, akAPDId, finalAPDId, badAPDId } from '../../seeds/test/apds';

describe('APD endpoint', () => {
  describe('Delete/archive APD endpoint | DELETE /apds/:id', () => {
    const db = getDB();
    beforeAll(async () => {
      await setupDB(db);
    });
    afterAll(async () => {
      await teardownDB(db);
    });

    const url = id => `/apds/${id}`;

    unauthenticatedTest('delete', url(0));
    unauthorizedTest('delete', url(0));

    describe('when authenticated as a user', () => {
      it('with a non-existant apd ID', async () => {
        const api = login('state-admin');
        const response = await api.delete(url(badAPDId));

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it(`with an APD in a state other than the user's state`, async () => {
        const api = login('state-admin');
        const response = await api.delete(url(mnAPDId));

        expect(response.status).toEqual(403);
        expect(response.data).toMatchSnapshot();
      });

      it('with an APD that is not in draft', async () => {
        const api = login('state-admin');
        const response = await api.delete(url(finalAPDId));

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid update', async () => {
        const api = login('state-admin');
        const response = await api.delete(url(akAPDId), {
          programOverview: 'new overview'
        });

        expect(response.status).toEqual(204);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
