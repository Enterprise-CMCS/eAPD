const tap = require('tap');
const sinon = require('sinon');
const getEndpoint = require('./get');
const {
  createTestData,
  createLDClient,
  waitForInitialization,
  disconnectLaunchDarkly
} = require('../../../middleware/launchDarklyMock');

const mockExpress = require('../../../util/mockExpress');
const mockResponse = require('../../../util/mockResponse');

let app;
let res;
let next;
let getAllSubmittedAPDs;
let td;

tap.test('apds/submissions GET endpoint', async endpointTest => {
  endpointTest.before(async () => {
    td = createTestData();
    td.update(
      td.flag('sharepoint-endpoints-4196').on(true).valueForAllUsers(false)
    );
    createLDClient();
    await waitForInitialization();
  });

  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getAllSubmittedAPDs = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/apds/submissions', sinon.match.func),
      'apds/submissions GET endpoint is registered'
    );
  });

  endpointTest.test('get apds/submissions handler', async tests => {
    let handler;

    tests.beforeEach(async () => {
      getEndpoint(app, { getAllSubmittedAPDs });
      handler = app.get.args
        .find(args => args[0] === '/apds/submissions')
        .pop();
    });

    tests.test('flag off', async test => {
      const req = {
        headers: {},
        ip: 'bad ip' // bad ip
      };
      td.update(
        td.flag('sharepoint-endpoints-4196').on(true).valueForAllUsers(false)
      );
      await handler(req, res, next);
      test.ok(res.status.calledWith(403));
    });

    tests.test('flag on', async test => {
      getAllSubmittedAPDs.returns({ apdID: 'apd id' });
      const req = {
        headers: {},
        ip: '127.0.0.1' // good ip
      };
      td.update(
        td.flag('sharepoint-endpoints-4196').on(true).valueForAllUsers(true)
      );
      await handler(req, res, next);
      test.ok(res.send.calledWith({ apdID: 'apd id' }));
    });
  });

  endpointTest.teardown(async () => {
    await disconnectLaunchDarkly();
  });
});
