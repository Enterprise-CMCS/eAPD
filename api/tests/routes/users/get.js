const tap = require('tap');
const sinon = require('sinon');

const loggedInMiddleware = require('../../../auth/middleware').loggedIn;
const getEndpoint = require('../../../routes/users/get');

tap.test('user GET endpoint', endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    get: sandbox.stub()
  };
  const db = sandbox.stub();
  const where = sandbox.stub();
  const select = sandbox.stub();
  const first = sandbox.stub();
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

    db.returns({ where, select, first });
    where.returns({ where, select, first });

    done();
  });

  endpointTest.test('setup', setupTest => {
    getEndpoint(app, db);

    setupTest.ok(
      app.get.calledWith('/user/:id', loggedInMiddleware, sinon.match.func),
      'single user GET endpoint is registered'
    );
    setupTest.ok(
      app.get.calledWith('/users', loggedInMiddleware, sinon.match.func),
      'all users GET endpoint is registered'
    );
    setupTest.done();
  });

  endpointTest.test('get all users handler', handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      getEndpoint(app, db);
      handler = app.get.args.find(args => args[0] === '/users')[2];
      done();
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      invalidTest => {
        select.rejects();

        handler({}, res);

        setTimeout(() => {
          invalidTest.ok(db.calledWith('users'), 'queries the users table');
          invalidTest.ok(
            select.calledWith('id', 'email'),
            'selects only user ID and email'
          );
          invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
          invalidTest.ok(res.send.notCalled, 'no body is sent');
          invalidTest.ok(res.end.called, 'response is terminated');
          invalidTest.done();
        }, 20);
      }
    );

    handlerTest.test('sends back a list of users', validTest => {
      const users = [{ id: 1, email: 'hi' }, { id: 2, email: 'bye' }];
      select.resolves(users);

      handler({}, res);

      setTimeout(() => {
        validTest.ok(db.calledWith('users'), 'queries the users table');
        validTest.ok(
          select.calledWith('id', 'email'),
          'selects only user ID and email'
        );
        validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
        validTest.ok(
          res.send.calledWith(users),
          'body is set to the list of users'
        );
        validTest.done();
      }, 20);
    });

    handlerTest.done();
  });

  endpointTest.test('get single user handler', handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      getEndpoint(app, db);
      handler = app.get.args.find(args => args[0] === '/user/:id')[2];
      done();
    });

    handlerTest.test('rejects invalid requests', invalidTests => {
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
        invalidTests.test(invalidCase.title, invalidTest => {
          handler({ params: invalidCase.params }, res);
          invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
          invalidTest.ok(
            res.send.calledWith('get-user-invalid'),
            'sets an error message'
          );
          invalidTest.ok(res.end.called, 'response is terminated');
          invalidTest.done();
        });
      });

      invalidTests.done();
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      invalidTest => {
        first.rejects();

        handler({ params: { id: 1 } }, res);

        setTimeout(() => {
          invalidTest.ok(db.calledWith('users'), 'queries the users table');
          invalidTest.ok(
            where.calledWith({ id: 1 }),
            'looks for only the specific user'
          );
          invalidTest.ok(
            first.calledWith('id', 'email'),
            'selects only user ID and email'
          );
          invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
          invalidTest.ok(res.send.notCalled, 'no body is sent');
          invalidTest.ok(res.end.called, 'response is terminated');
          invalidTest.done();
        }, 20);
      }
    );

    handlerTest.test(
      'sends a not-found error if the requested user does not exist',
      invalidTest => {
        first.resolves();
        handler({ params: { id: 1 } }, res);

        setTimeout(() => {
          invalidTest.ok(db.calledWith('users'), 'queries the users table');
          invalidTest.ok(
            where.calledWith({ id: 1 }),
            'looks for only the specific user'
          );
          invalidTest.ok(
            first.calledWith('id', 'email'),
            'selects only user ID and email'
          );
          invalidTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
          invalidTest.ok(res.send.notCalled, 'no body is sent');
          invalidTest.ok(res.end.called, 'response is terminated');
          invalidTest.done();
        }, 20);
      }
    );

    handlerTest.test('sends the requested user', validTest => {
      first.resolves({ id: 1, email: 'test-email@dotcom.com' });
      handler({ params: { id: 1 } }, res);

      setTimeout(() => {
        validTest.ok(db.calledWith('users'), 'queries the users table');
        validTest.ok(
          where.calledWith({ id: 1 }),
          'looks for only the specific user'
        );
        validTest.ok(
          first.calledWith('id', 'email'),
          'selects only user ID and email'
        );
        validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
        validTest.ok(
          res.send.calledWith({ id: 1, email: 'test-email@dotcom.com' }),
          'requested user is sent'
        );
        validTest.done();
      }, 20);
    });

    handlerTest.done();
  });

  endpointTest.done();
});
