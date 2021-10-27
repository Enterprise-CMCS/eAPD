const tap = require('tap');
const sinon = require('sinon');

const can = require('../../../middleware').can;
const getEndpoint = require('./get');

const mockExpress = require('../../../util/mockExpress');
const mockResponse = require('../../../util/mockResponse');

let app;
let res;
let next;
let getAuthActivities;

tap.test('auth activities GET endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getAuthActivities = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith(
        '/auth/activities',
        can('view-roles'),
        sinon.match.func
      ),
      'all activities GET endpoint is registered'
    );
  });

  endpointTest.test('get all activities handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(() => {
      getEndpoint(app, { getAuthActivities });
      handler = app.get.args.find(args => args[0] === '/auth/activities')[2];
    });

    handlerTest.test('database error', async invalidTest => {
      const err = { error: 'err0r' };
      getAuthActivities.rejects(err);
      await handler({}, res, next);
      invalidTest.ok(next.called, 'next is called');
      invalidTest.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test('sends back a list of activities', async validTest => {
      const activities = [{ name: 'one' }, { name: 'two' }, { name: 'three' }];

      getAuthActivities.resolves(activities);

      await handler({}, res);

      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(res.send.calledWith(activities), 'body is activities');
    });
  });
});
