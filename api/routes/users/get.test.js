const tap = require('tap');
const sinon = require('sinon');

const loggedInMiddleware = require('../../auth/middleware').loggedIn;
const getEndpoint = require('./get');

tap.test('user GET endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    get: sandbox.stub()
  };
  const UserModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub(),
    fetchAll: sandbox.stub()
  };
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(done => {
    sandbox.reset();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    UserModel.where.returns(UserModel);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app, UserModel);

    setupTest.ok(
      app.get.calledWith('/user/:id', loggedInMiddleware, sinon.match.func),
      'single user GET endpoint is registered'
    );
    setupTest.ok(
      app.get.calledWith('/users', loggedInMiddleware, sinon.match.func),
      'all users GET endpoint is registered'
    );
  });

  endpointTest.test('get all users handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      getEndpoint(app, UserModel);
      handler = app.get.args.find(args => args[0] === '/users')[2];
      done();
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async invalidTest => {
        UserModel.fetchAll.rejects();

        await handler({}, res);

        invalidTest.ok(
          UserModel.fetchAll.calledWith({
            columns: sinon.match.array.deepEquals(['id', 'email'])
          }),
          'selects only user ID and email'
        );
        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends back a list of users', async validTest => {
      const users = [{ id: 1, email: 'hi' }, { id: 2, email: 'bye' }];
      UserModel.fetchAll.resolves(users);

      await handler({}, res);

      validTest.ok(
        UserModel.fetchAll.calledWith({
          columns: sinon.match.array.deepEquals(['id', 'email'])
        }),
        'selects only user ID and email'
      );
      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        res.send.calledWith(users),
        'body is set to the list of users'
      );
    });
  });

  endpointTest.test('get single user handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      getEndpoint(app, UserModel);
      handler = app.get.args.find(args => args[0] === '/user/:id')[2];
      done();
    });

    handlerTest.test('rejects invalid requests', async invalidTests => {
      const invalidCases = [
        {
          title: 'no user ID',
          params: {}
        },
        {
          title: 'non-numeric ID',
          params: { id: 'letters' }
        }
      ];

      invalidCases.forEach(invalidCase => {
        invalidTests.test(invalidCase.title, async invalidTest => {
          handler({ params: invalidCase.params }, res);
          invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
          invalidTest.ok(
            res.send.calledWith({ error: 'get-user-invalid' }),
            'sets an error message'
          );
          invalidTest.ok(res.end.called, 'response is terminated');
        });
      });
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async invalidTest => {
        UserModel.fetch.rejects();

        await handler({ params: { id: 1 } }, res);

        invalidTest.ok(
          UserModel.where.calledWith({ id: 1 }),
          'looks for only the specific user'
        );
        invalidTest.ok(
          UserModel.fetch.calledWith({
            columns: sinon.match.array.deepEquals(['id', 'email'])
          }),
          'selects only user ID and email'
        );
        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a not-found error if the requested user does not exist',
      async invalidTest => {
        UserModel.fetch.resolves();
        await handler({ params: { id: 1 } }, res);

        invalidTest.ok(
          UserModel.where.calledWith({ id: 1 }),
          'looks for only the specific user'
        );
        invalidTest.ok(
          UserModel.fetch.calledWith({
            columns: sinon.match.array.deepEquals(['id', 'email'])
          }),
          'selects only user ID and email'
        );
        invalidTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends the requested user', async validTest => {
      UserModel.fetch.resolves({ id: 1, email: 'test-email@dotcom.com' });
      await handler({ params: { id: 1 } }, res);

      validTest.ok(
        UserModel.where.calledWith({ id: 1 }),
        'looks for only the specific user'
      );
      validTest.ok(
        UserModel.fetch.calledWith({
          columns: sinon.match.array.deepEquals(['id', 'email'])
        }),
        'selects only user ID and email'
      );
      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        res.send.calledWith({ id: 1, email: 'test-email@dotcom.com' }),
        'requested user is sent'
      );
    });
  });
});
