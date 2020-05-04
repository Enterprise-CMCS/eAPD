const {
  getDB,
  login,
  unauthenticatedTest
} = require('../../endpoint-tests/utils');

const url = '/me';

describe('/me endpoint | GET', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', url);

  it('when authenticated', async () => {
    const response = await login()
      .then(api => api.get(url));

    expect(response.status).toEqual(200);
    expect(response.data).toMatchSnapshot();
  });
});
