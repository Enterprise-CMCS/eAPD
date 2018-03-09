const tap = require('tap');
const sinon = require('sinon');

const canMiddleware = require('../../auth/middleware').can('delete-users');
const deleteEndpoint = require('./delete');

tap.test('user DELETE endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    delete: sandbox.stub()
  };
  const UserModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };
  const destroy = sandbox.stub();
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    UserModel.where.returns(UserModel);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    deleteEndpoint(app);

    setupTest.ok(
      app.delete.calledWith('/users/:id', canMiddleware, sinon.match.func),
      'user DELETE endpoint is registered'
    );
  });

  endpointTest.test('delete user handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      deleteEndpoint(app, UserModel);
      handler = app.delete.args.find(args => args[0] === '/users/:id')[2];
      done();
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async invalidTest => {
        UserModel.fetch.rejects();

        await handler({ user: {}, params: { id: 1 } }, res);

        invalidTest.ok(
          UserModel.where.calledWith({ id: 1 }),
          'looks for only the specific user'
        );
        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an invalid request error if the ID is not numeric',
      async invalidTest => {
        await handler({ user: {}, params: { id: 'abc' } }, res);

        invalidTest.ok(UserModel.where.notCalled, 'database is not queried');
        invalidTest.ok(UserModel.fetch.notCalled, 'database is not queried');
        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an unauthorized error if the user attempts to delete themselves',
      async invalidTest => {
        await handler({ user: { id: 1 }, params: { id: 1 } }, res);

        invalidTest.ok(UserModel.where.notCalled, 'database is not queried');
        invalidTest.ok(UserModel.fetch.notCalled, 'database is not queried');
        invalidTest.ok(res.status.calledWith(401), 'HTTP status set to 401');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a not-found error if the requested user does not exist',
      async invalidTest => {
        UserModel.fetch.resolves();
        await handler({ user: {}, params: { id: '1' } }, res);

        invalidTest.ok(
          UserModel.where.calledWith({ id: 1 }),
          'looks for only the specific user'
        );
        invalidTest.ok(UserModel.fetch.calledOnce, 'fetches just once');
        invalidTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('deletes the requested user', async validTest => {
      UserModel.fetch.resolves({
        destroy,
        get: sinon.stub().returns()
      });
      destroy.resolves();

      await handler({ user: {}, params: { id: 1 } }, res);

      validTest.ok(
        UserModel.where.calledWith({ id: 1 }),
        'looks for only the specific user'
      );
      validTest.ok(UserModel.fetch.calledOnce, 'fetches just once');
      validTest.ok(destroy.calledOnce, 'model is destroyed');
      validTest.ok(res.status.calledWith(204), 'HTTP status set to 204');
      validTest.ok(res.send.notCalled, 'no body is sent');
      validTest.ok(res.end.called, 'response is terminated');
    });
  });
});
