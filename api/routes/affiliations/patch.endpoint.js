const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('Affiliations endpoint | PATCH', () => {
  const api = login('all-permissions');
  const db = getDB();
  beforeAll(() => setupDB(db));
  afterAll(() => teardownDB(db));

  unauthenticatedTest('patch', '/states/ak/affiliations/4000');
  unauthorizedTest('patch', '/states/ak/affiliations/4000');

  ['approved', 'denied', 'revoked'].forEach(status => {
    it(`returns 200, when an affiliation is ${status}`, async () => {
      const response = await api.patch('/states/ak/affiliations/4000', {
        status,
        roleId: 1106
      });
      expect(response.status).toEqual(200);
    });
  });

  it('returns 400 when US state is invalid', async () => {
    const fedAdminApi = login('fed-admin');
    const response = await fedAdminApi.patch('/states/zz/affiliations/4000');
    expect(response.status).toEqual(400);
  });

  it('returns 403 when US state is not authorized', async () => {
    // This user does not have state zz in scope and is not a fed admin
    // validForState middleware should reject the request
    const response = await api.patch('/states/zz/affiliations/4000');
    expect(response.status).toEqual(403);
  });

  it('returns 400 when affiliation id is invalid', async () => {
    const response = await api.patch('/states/ak/affiliations/NaN');
    expect(response.status).toEqual(400);
  });

  it('returns 400 when status is invalid', async () => {
    const response = await api.patch('/states/ak/affiliations/4000', {
      status: 'blarg',
      roleId: 1106
    });
    expect(response.status).toEqual(400);
  });

  it('returns 400 when body is invalid', async () => {
    const response = await api.patch('/states/ak/affiliations/4000', {
      status: undefined,
      roleId: undefined
    });
    expect(response.status).toEqual(400);
  });

  it(`returns 401, when user tries to change their status`, async () => {
    const response = await api.patch('/states/ak/affiliations/4002', {
      status: 'approved',
      roleId: 1106
    });
    expect(response.status).toEqual(401);
  });

  it(`returns 403, when user tries to change for a state they are not authorized for`, async () => {
    const response = await api.patch('/states/az/affiliations/4020', {
      status: 'approved',
      roleId: 1106
    });
    expect(response.status).toEqual(403);
  });

});
