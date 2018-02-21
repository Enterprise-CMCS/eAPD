const tap = require('tap');
const sinon = require('sinon');

const canMiddleware = require('../../auth/middleware').can('delete-roles');
const deleteEndpoint = require('./delete');

tap.test('roles DELETE endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    delete: sandbox.stub()
  };
  const RoleModel = {
    fetch: sandbox.stub(),
    where: sandbox.stub()
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
    deleteEndpoint(app, RoleModel);

    setupTest.ok(
      app.delete.calledWith('/roles/:id', canMiddleware, sinon.match.func),
      'roles DELETE endpoint is registered'
    );
  });

  endpointTest.test('delete role handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      deleteEndpoint(app, RoleModel);
      handler = app.delete.args.find(args => args[0] === '/roles/:id')[2];
      done();
    });

    handlerTest.test('sends a not found error if requesting to delete a role that does not exist', async notFoundTest => {
      const req = { user: { role: 'user-role' }, params: { id: 1 } };
      RoleModel.where.withArgs({ id: 1 }).returns({ fetch: RoleModel.fetch });
      RoleModel.fetch.resolves(null);

      await handler(req, res);

      notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
      notFoundTest.ok(res.send.notCalled, 'no body is sent');
      notFoundTest.ok(res.end.calledOnce, 'response is terminated');
    });

    handlerTest.test('sends an unauthorized error if requesting to delete a role that the user belongs to', async unauthorizedTest => {
      const req = { user: { role: 'user-role' }, params: { id: 1 } };
      const get = sinon.stub().withArgs('id').returns('role-id');
      RoleModel.where.withArgs({ id: 1 }).returns({ fetch: RoleModel.fetch });
      RoleModel.where.withArgs({ name: 'user-role' }).returns({ fetch: RoleModel.fetch });
      RoleModel.fetch.resolves({ get });

      await handler(req, res);

      unauthorizedTest.ok(res.status.calledWith(401), 'HTTP status set to 401');
      unauthorizedTest.ok(res.send.notCalled, 'no body is sent');
      unauthorizedTest.ok(res.end.calledOnce, 'response is terminated');
    });

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        const req = { user: { role: 'user-role' }, params: { id: 1 } };
        const get1 = sinon.stub().withArgs('id').returns('role-id-1');
        const get2 = sinon.stub().withArgs('id').returns('role-id-2');
        const destroy = sinon.stub().rejects();
        RoleModel.where.withArgs({ id: 1 }).returns({ fetch: sinon.stub().resolves({ destroy, get: get1 }) });
        RoleModel.where.withArgs({ name: 'user-role' }).returns({ fetch: sinon.stub().resolves({ get: get2 }) });

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test('deletes a role', async saveTest => {
      const req = { user: { role: 'user-role' }, params: { id: 1 } };
      const get1 = sinon.stub().withArgs('id').returns('role-id-1');
      const get2 = sinon.stub().withArgs('id').returns('role-id-2');
      const destroy = sinon.stub().resolves();
      RoleModel.where.withArgs({ id: 1 }).returns({ fetch: sinon.stub().resolves({ destroy, get: get1 }) });
      RoleModel.where.withArgs({ name: 'user-role' }).returns({ fetch: sinon.stub().resolves({ get: get2 }) });

      await handler(req, res);
      saveTest.ok(true);

      saveTest.ok(destroy.calledOnce, 'model is destroyed');
      saveTest.ok(res.status.calledWith(204), 'HTTP status set to 204');
      saveTest.ok(res.end.calledOnce, 'response is terminated');
    });
  });
});
