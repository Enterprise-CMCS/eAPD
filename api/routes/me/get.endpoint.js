const {
  authenticate,
  getDB,
  unauthenticatedTest
} = require('../../endpoint-tests/utils');

const url = '/me';

describe('/me endpoint | GET', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', url);

  it('when authenticated', async () => {
    const response = await authenticate()
      .then(api => api.get(url))
      .then(res => res);

    expect(response.status).toEqual(200);
    expect(response.data).toMatchSnapshot();
  });
});
