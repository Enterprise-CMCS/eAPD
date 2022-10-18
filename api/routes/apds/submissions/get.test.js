const tap = require('tap');
const sinon = require('sinon');
const getEndpoint = require('./get');

const mockExpress = require('../../../util/mockExpress');
const mockResponse = require('../../../util/mockResponse');

let app;
let res;
let next;

tap.test('apds/submissions GET endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
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
      getEndpoint(app, {});
      handler = app.get.args
        .find(args => args[0] === '/apds/submissions')
        .pop();
    });

    tests.test('basic handler test', async test => {
      const req = {};
      await handler(req, res, next);
      test.ok(res.send.calledWith({ result: 'success' }));
    });
  });
});
