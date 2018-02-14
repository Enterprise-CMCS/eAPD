const tap = require('tap');
const sinon = require('sinon');

const canMiddleware = require('../../auth/middleware').can('edit-roles');
const putEndpoint = require('./put');

tap.test('roles PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    put: sandbox.stub()
  };
  const RoleModel = {
    fetchAll: sandbox.stub()
  };
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(async () => {
    sandbox.reset();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);
  });

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app, RoleModel);

    setupTest.ok(
      app.put.calledWith('/roles', canMiddleware, sinon.match.func),
      'roles PUT endpoint is registered'
    );
  });
});
