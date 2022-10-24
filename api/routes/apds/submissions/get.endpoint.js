const {
  apiKeyAuth,
  getDB,
  setupDB,
  teardownDB
} = require('../../../endpoint-tests/utils');
const {
  getTestData,
  getLDClient,
  waitForInitialization
} = require('../../../middleware/launchDarkly');

let td;

describe(' /apds/submissions', () => {
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
    td = getTestData();
    td.update(
      td.flag('flagkey').on(true).booleanFlag().fallthroughVariation(false)
    );
    getLDClient({ updateProcessor: td });
    await waitForInitialization();
  });
  afterAll(async () => {
    await teardownDB(db);
    jest.restoreAllMocks();
  });

  it('it returns 403 when the IP is not allowed', async () => {
    td.update(
      td
        .flag('sharepoint-endpoints-4196')
        .booleanFlag()
        .variationForAllUsers(false)
    );
    const api = apiKeyAuth('bad ip');
    const response = await api.get('/apds/submissions');
    expect(response.status).toBe(403);
  });

  // it('returns 200 when the IP is allowed', async () => {
  //   td.update(
  //     td
  //       .flag('sharepoint-endpoints-4196')
  //       .booleanFlag()
  //       .variationForAllUsers(true)
  //   );
  //   const api = apiKeyAuth('127.0.0.1');
  //   const response = await api.get('/apds/submissions');
  //   expect(response.status).toEqual(200);
  // });
});
