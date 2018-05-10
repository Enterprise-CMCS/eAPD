const tap = require('tap');
const sinon = require('sinon');

const can = require('../../../middleware').can;
const getEndpoint = require('./index');

tap.test('auth activities GET endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    get: sandbox.stub()
  };
  const ActivityModel = {
    fetchAll: sandbox.stub()
  };
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app, ActivityModel);

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
    handlerTest.beforeEach(done => {
      getEndpoint(app, ActivityModel);
      handler = app.get.args.find(args => args[0] === '/auth/activities')[2];
      done();
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async invalidTest => {
        ActivityModel.fetchAll.rejects();

        await handler({}, res);

        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends back a list of activities', async validTest => {
      const toJSON = sinon.stub();
      toJSON.returns('json stuff');
      const activities = { toJSON };
      ActivityModel.fetchAll.resolves(activities);

      await handler({}, res);

      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        res.send.calledWith('json stuff'),
        'body is JSON-ified activities'
      );
    });
  });
});
