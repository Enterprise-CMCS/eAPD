const tap = require('tap');
const sinon = require('sinon');
const patchEndpoint = require('./patch');
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
let updateAPDReviewStatus;
let td;

tap.test('apds/submissions PATCH endpoint', async endpointTest => {
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
    updateAPDReviewStatus = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    patchEndpoint(app);

    setupTest.ok(
      app.patch.calledWith('/apds/submissions', sinon.match.func),
      'apds/submissions PATCH endpoint is registered'
    );
  });

  endpointTest.test('patch apds/submissions handler', async tests => {
    let handler;

    tests.beforeEach(async () => {
      patchEndpoint(app, { updateAPDReviewStatus });
      handler = app.patch.args
        .find(args => args[0] === '/apds/submissions')
        .pop();
    });

    tests.test('flag off', async test => {
      td.update(
        td.flag('sharepoint-endpoints-4196').on(true).valueForAllUsers(false)
      );
      const req = {
        headers: {},
        ip: 'bad ip'
      };
      await handler(req, res, next);
      test.ok(res.status.calledWith(403));
    });

    tests.test('invalid body', async test => {
      td.update(
        td.flag('sharepoint-endpoints-4196').on(true).valueForAllUsers(true)
      );
      const req = {
        headers: {},
        ip: '127.0.0.1',
        body: 'bad body'
      };
      await handler(req, res, next);
      test.ok(res.status.calledWith(400));
    });

    tests.test('flag on, body valid', async test => {
      updateAPDReviewStatus.returns([
        { apdId: 'apd id', status: 'approved', error: '' }
      ]);
      td.update(
        td.flag('sharepoint-endpoints-4196').on(true).valueForAllUsers(true)
      );
      const req = {
        headers: {},
        ip: '127.0.0.1',
        body: [{ apdId: 'apd id', newStatus: 'completed' }]
      };
      await handler(req, res, next);
      test.ok(res.status.calledWith(204));
    });
  });

  endpointTest.teardown(async () => {
    await disconnectLaunchDarkly();
  });
});
