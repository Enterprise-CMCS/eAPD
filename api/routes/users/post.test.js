const tap = require('tap');
const sinon = require('sinon');

const canMiddleware = require('../../auth/middleware').can('add-users');
const postEndpoint = require('./post');

tap.test('user POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    post: sandbox.stub()
  };

  const UserModel = sandbox.stub();
  UserModel.where = sandbox.stub();
  UserModel.fetch = sandbox.stub();
  UserModel.save = sandbox.stub();

  const passwordChecker = sandbox.stub();

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

    UserModel.returns({ save: UserModel.save });
    UserModel.where.returns(UserModel);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    postEndpoint(app, UserModel);

    setupTest.ok(
      app.post.calledWith('/user', canMiddleware, sinon.match.func),
      'user POST endpoint is registered'
    );
  });

  endpointTest.test('handler', async handlerTest => {
    let handler;

    handlerTest.beforeEach(done => {
      postEndpoint(app, UserModel, passwordChecker);
      handler = app.post.args[0][2];
      done();
    });

    handlerTest.test('rejects invalid requests', async invalidTests => {
      const invalidCases = [
        {
          title: 'no email or password',
          body: {}
        },
        {
          title: 'email, but no password',
          body: { email: 'em@il.com' }
        },
        {
          title: 'no email, but password',
          body: { password: 'password' }
        },
        {
          title: 'email exists but is blank, valid password',
          body: { email: '', password: 'password' }
        },
        {
          title: 'valid email, password exists but is blank',
          body: { email: 'em@il.com', password: '' }
        }
      ];

      invalidCases.forEach(invalidCase => {
        invalidTests.test(invalidCase.title, async invalidTest => {
          handler({ body: invalidCase.body }, res);

          invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
          invalidTest.ok(
            res.send.calledWith({ error: 'add-user-invalid' }),
            'sets an error message'
          );
          invalidTest.ok(res.end.called, 'response is terminated');
        });
      });
    });

    handlerTest.test(
      'rejects inserting an existing user',
      async invalidTest => {
        UserModel.fetch.resolves({});
        passwordChecker.returns({ score: 3 });

        await handler(
          { body: { email: 'em@il.com', password: 'password' } },
          res
        );

        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'add-user-email-exists' }),
          'sets an error message'
        );
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a server error code if there is a database error checking for an existing user',
      async invalidTest => {
        UserModel.fetch.rejects();
        passwordChecker.returns({ score: 3 });

        await handler(
          { body: { email: 'em@il.com', password: 'password' } },
          res
        );

        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'does not send a message');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'rejects if the password is too weak',
      async invalidTest => {
        UserModel.fetch.resolves();
        passwordChecker.returns({ score: 0 });

        await handler(
          { body: { email: 'em@il.com', password: 'password' } },
          res
        );

        invalidTest.ok(
          passwordChecker.calledWith('password', ['em@il.com']),
          'password is checked with supplemental data'
        );
        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'add-user-weak-password' }),
          'sets an error message'
        );
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a server error code if there is a database error inserting a new user',
      async invalidTest => {
        UserModel.fetch.resolves();
        UserModel.save.rejects();
        passwordChecker.returns({ score: 3 });

        await handler(
          { body: { email: 'em@il.com', password: 'password' } },
          res
        );

        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'does not send a message');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'inserts a new user and returns a success for a valid, new user',
      async validTest => {
        UserModel.fetch.resolves();
        UserModel.save.resolves();
        passwordChecker.returns({ score: 3 });

        await handler(
          { body: { email: 'em@il.com', password: 'password' } },
          res
        );

        validTest.ok(
          passwordChecker.calledWith('password', ['em@il.com']),
          'password is checked with supplemental data'
        );
        validTest.ok(res.status.calledWith(200), 'HTTP status set to 200');
        validTest.ok(res.send.notCalled, 'does not send a message');
        validTest.ok(res.end.called, 'response is terminated');
      }
    );
  });
});
