const {
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('Affiliations endpoint | PATCH /state/:stateId/affiliations/:id', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('patch', '/states/fl/affiliations/4000');
  unauthorizedTest('patch', '/states/fl/affiliations/4000');

  ['approved', 'denied', 'revoked'].forEach(status => {
    it(`returns 200, when an affiliation is ${status}`, async () => {
      const response = await login()
        .then(api => api.patch('/states/fl/affiliations/4000', {
          status,
          roleId: 1106
        }));
      expect(response.status).toEqual(200);
    });
  })

  it('returns 404 when US state is invalid', async () => {
    const response = await login()
      .then(api => api.post('/states/zz/affiliations/4000'));
    expect(response.status).toEqual(404);
  });

  it('returns 404 when affiliation id is invalid', async () => {
    const response = await login()
      .then(api => api.post('/states/zz/affiliations/NaN'));
    expect(response.status).toEqual(404);
  });

  it('returns 404 when status is invalid', async () => {
    const response = await login()
      .then(api => api.post('/states/fl/affiliations/4000', {
        status: 'blarg',
        roleId: 1106
      }));
    expect(response.status).toEqual(404);
  });
});
