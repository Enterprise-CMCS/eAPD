const {
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');
const { activeRoles } = require('../../util/roles');

describe('Roles endpoint', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  describe('GET /roles', () => {
    unauthenticatedTest('get', '/roles');
    unauthorizedTest('get', '/roles');

    it('returns 200', async () => {
      const authedClient = login();
      const response = await authedClient.get('/roles');
      expect(response.status).toEqual(200);
      expect(response.data.length).toEqual(activeRoles.length + 1); // have to account for non-active eAPD Admin role
    });

    it('returns 403', async () => {
      const unauthedClient = login('no-permissions');
      const response = await unauthedClient.get('/roles');
      expect(response.status).toEqual(403);
    });
  });
});
