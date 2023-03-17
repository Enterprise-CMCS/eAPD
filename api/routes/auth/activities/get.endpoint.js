import {
  getDB,
  setupDB,
  teardownDB,
  apiAllPermissions,
  unauthenticatedTest,
  unauthorizedTest
} from '../../../endpoint-tests/utils.js';

describe('auth activities endpoint | GET /auth/activities', () => {
  const db = getDB();
  const api = apiAllPermissions;
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  const url = '/auth/activities';

  unauthenticatedTest('get', url);
  unauthorizedTest('get', url);

  it('when authenticated', async () => {
    const response = await api.get(url);
    const permissions = response.data.map(p => p.name);

    expect(response.status).toEqual(200);
    expect(permissions).toMatchSnapshot();
  });
});
