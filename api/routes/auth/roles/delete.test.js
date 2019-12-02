const tap = require('tap');
const sinon = require('sinon');

const can = require('../../../middleware').can;
const deleteEndpoint = require('./delete');

tap.test('auth roles DELETE endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    delete: sandbox.stub()
  };

  const deleteAuthRole = sandbox.stub();
  const getAuthRoleByID = sandbox.stub();
  const getAuthRoleByName = sandbox.stub();

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
    deleteEndpoint(app);

    setupTest.ok(
      app.delete.calledWith(
        '/auth/roles/:id',
        can('edit-roles'),
        sinon.match.func
      ),
      'roles DELETE endpoint is registered'
    );
  });

  endpointTest.test('delete role handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      deleteEndpoint(app, {
        deleteAuthRole,
        getAuthRoleByID,
        getAuthRoleByName
      });
      handler = app.delete.args.find(args => args[0] === '/auth/roles/:id')[2];
      done();
    });

    handlerTest.test(
      'sends a not found error if requesting to delete a role that does not exist',
      async notFoundTest => {
        const req = { user: { role: 'user-role' }, params: { id: 1 } };
        getAuthRoleByID.resolves(null);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an unauthorized error if requesting to delete a role that the user belongs to',
      async unauthorizedTest => {
        const req = { user: { role: 'user-role' }, params: { id: 1 } };

        getAuthRoleByID.resolves({ id: 'role id' });
        getAuthRoleByName.resolves({ id: 'role id' });

        await handler(req, res);

        unauthorizedTest.ok(
          res.status.calledWith(401),
          'HTTP status set to 401'
        );
        unauthorizedTest.ok(res.send.notCalled, 'no body is sent');
        unauthorizedTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        const req = { user: { role: 'user-role' }, params: { id: 1 } };
        getAuthRoleByID.rejects();

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test('deletes a role', async saveTest => {
      const req = { user: { role: 'user-role' }, params: { id: 1 } };

      getAuthRoleByID.resolves({ id: 'delete this one' });
      getAuthRoleByName.resolves({ id: `user's role` });
      deleteAuthRole.resolves();

      await handler(req, res);

      saveTest.ok(
        deleteAuthRole.calledWith('delete this one'),
        'deletes the right role'
      );
      saveTest.ok(res.status.calledWith(204), 'HTTP status set to 204');
      saveTest.ok(res.end.calledOnce, 'response is terminated');
    });
  });
});
