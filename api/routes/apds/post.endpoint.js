const { APD_TYPE } = require('@cms-eapd/common');
const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('APD endpoint | POST /apds', () => {
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  const url = `/apds`;

  unauthenticatedTest('post', url);
  unauthorizedTest('post', url);

  it('when authenticated as a user with permission', async () => {
    const api = login();
    const response = await api.post(url, {
      apdType: APD_TYPE.MMIS
    });

    expect(response.status).toEqual(200);

    // The created and updated dates are based on when the APD is saved. Rather
    // than figure out something fancy with the snapshots, just pull out the
    // dates and test them with a regex.
    const { created, updated } = response.data;
    delete response.data.created;
    delete response.data.updated;
    delete response.data.id;

    expect(created).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(updated).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(response.data).toMatchSnapshot();
  });
});
