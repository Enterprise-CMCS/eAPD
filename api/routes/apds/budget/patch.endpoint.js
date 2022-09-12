const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');
const { mnAPDId, akAPDId, badAPDId } = require('../../../seeds/test/apds');

describe('APD budget endpoint | PATCH /apds/:id/budget', () => {
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  const url = apdID => `/apds/${apdID}/budget`;

  unauthenticatedTest('patch', url(1));
  unauthorizedTest('patch', url(1));

  describe('when authenticated as a user with permission', () => {
    let api;
    beforeAll(() => {
      api = login('state-admin');
    });

    it('with a non-existant apd ID', async () => {
      const response = await api.patch(url(badAPDId));

      expect(response.status).toEqual(404);
      expect(response.data).toMatchSnapshot();
    });

    it(`with an APD in a state other than the user's state`, async () => {
      const response = await api.patch(url(mnAPDId));

      expect(response.status).toEqual(403);
      expect(response.data).toMatchSnapshot();
    });

    it('with a valid apd ID', async () => {
      const response = await api.patch(url(akAPDId));

      expect(response.status).toEqual(200);
      expect(response.status).not.toEqual({});
    });
  });
});
