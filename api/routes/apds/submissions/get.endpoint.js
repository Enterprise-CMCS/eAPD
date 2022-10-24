const {
  apiKeyAuth,
  getDB,
  setupDB,
  teardownDB
} = require('../../../endpoint-tests/utils');
const {
  createTestData,
  createLDClient,
  waitForInitialization,
  disconnectLaunchDarkly
} = require('../../../middleware/launchDarklyMock');

let td;

describe(' /apds/submissions', () => {
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
    td = createTestData();
    td.update(
      td
        .flag('sharepoint-endpoints-4196')
        .on(true)
        .variationForUser({ key: 'anonymous', ip: '127.0.0.1' })
    );
    createLDClient();
    await waitForInitialization();
  });
  afterAll(async () => {
    await teardownDB(db);
    await disconnectLaunchDarkly();
  });

  // it('it returns 403 when the IP is not allowed', async () => {
  //   updateLDIdentity({ key: 'Regular User', ip: 'bad ip' });
  //   await setLaunchDarklyTestFlag({
  //     flagName: 'sharepoint-endpoints-4196',
  //     clearRules: true,
  //     newValue: false
  //   });
  //   const api = apiKeyAuth('bad ip');
  //   const response = await api.get('/apds/submissions');
  //   expect(response.status).toBe(403);
  // });

  it('returns 200 when the IP is allowed', async () => {
    const api = apiKeyAuth('127.0.0.1');
    const response = await api.get('/apds/submissions');
    expect(response.status).toEqual(200);
    expect(getFlagSpy).toHaveBeenCalled();
    getFlagSpy.mockReset();
  });
});
