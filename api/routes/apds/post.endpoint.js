const {
  authenticate,
  getDB,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('APD endpoint | POST /apds', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = `/apds`;

  unauthenticatedTest('post', url);
  unauthorizedTest('post', url);

  it('when authenticated as a user with permission', async () => {
    const response = await authenticate()
      .then(api => api.post(url))
      .then(res => res);  // eslint-disable no-return-assign

    expect(response.status).toEqual(200);

    // The created and updated dates are based on when the APD is saved. Rather
    // than figure out something fancy with the snapshots, just pull out the
    // dates and test them with a regex.
    const { created, updated } = response.data;
    delete response.data.created;
    delete response.data.updated;

    expect(created).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(updated).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(response.data).toMatchSnapshot();
  });
});
