const tap = require('tap');
const sinon = require('sinon');

const can = require('../../../middleware').can;
const getEndpoint = require('./get');

tap.test('auth roles GET endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    get: sandbox.stub()
  };
  const RoleModel = {
    fetchAll: sandbox.stub(),
    withRelated: 'related-stuff'
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
    getEndpoint(app, RoleModel);

    setupTest.ok(
      app.get.calledWith('/auth/roles', can('view-roles'), sinon.match.func),
      'roles GET endpoint is registered'
    );
  });

  endpointTest.test('get roles handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      getEndpoint(app, RoleModel);
      handler = app.get.args.find(args => args[0] === '/auth/roles')[2];
      done();
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async invalidTest => {
        RoleModel.fetchAll.rejects();

        await handler({}, res);

        invalidTest.ok(
          RoleModel.fetchAll.calledWith({
            withRelated: 'related-stuff'
          }),
          'also fetches related data'
        );
        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends back a list of roles', async validTest => {
      RoleModel.fetchAll.resolves({
        toJSON: sinon.stub().returns('roles as json')
      });

      await handler({}, res);

      validTest.ok(
        RoleModel.fetchAll.calledWith({
          withRelated: 'related-stuff'
        }),
        'also fetches related data'
      );
      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        res.send.calledWith('roles as json'),
        'body is JSON-ified roles'
      );
    });
  });
});
