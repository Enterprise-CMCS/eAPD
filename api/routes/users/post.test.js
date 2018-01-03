const tap = require('tap');
const sinon = require('sinon');

const loggedInMiddleware = require('../../auth/middleware').loggedIn;
const postEndpoint = require('./post');

tap.test('user POST endpoint', endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    post: sandbox.stub()
  };
  const db = sandbox.stub();
  const where = sandbox.stub();
  const first = sandbox.stub();
  const insert = sandbox.stub();
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

    db.returns({ where, first, insert });
    where.returns({ where, first, insert });

    done();
  });

  endpointTest.test('setup', setupTest => {
    postEndpoint(app, db);

    setupTest.ok(
      app.post.calledWith('/user', loggedInMiddleware, sinon.match.func),
      'user POST endpoint is registered'
    );
    setupTest.done();
  });

  endpointTest.test('handler', handlerTest => {
    let handler;

    handlerTest.beforeEach(done => {
      postEndpoint(app, db);
      handler = app.post.args[0][2];
      done();
    });

    handlerTest.test('rejects invalid requests', invalidTests => {
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
        invalidTests.test(invalidCase.title, invalidTest => {
          handler({ body: invalidCase.body }, res);

          invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
          invalidTest.ok(
            res.send.calledWith({ error: 'add-user-invalid' }),
            'sets an error message'
          );
          invalidTest.ok(res.end.called, 'response is terminated');
          invalidTest.done();
        });
      });

      invalidTests.done();
    });

    handlerTest.test('rejects inserting an existing user', invalidTest => {
      first.resolves({});

      handler({ body: { email: 'em@il.com', password: 'password' } }, res);

      setTimeout(() => {
        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'add-user-email-exists' }),
          'sets an error message'
        );
        invalidTest.ok(res.end.called, 'response is terminated');
        invalidTest.done();
      }, 20);
    });

    handlerTest.test(
      'sends a server error code if there is a database error checking for an existing user',
      invalidTest => {
        first.rejects();

        handler({ body: { email: 'em@il.com', password: 'password' } }, res);

        setTimeout(() => {
          invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
          invalidTest.ok(res.send.notCalled, 'does not send a message');
          invalidTest.ok(res.end.called, 'response is terminated');
          invalidTest.done();
        }, 20);
      }
    );

    handlerTest.test(
      'sends a server error code if there is a database error inserting a new user',
      invalidTest => {
        first.resolves();
        insert.rejects();

        handler({ body: { email: 'em@il.com', password: 'password' } }, res);

        setTimeout(() => {
          invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
          invalidTest.ok(res.send.notCalled, 'does not send a message');
          invalidTest.ok(res.end.called, 'response is terminated');
          invalidTest.done();
        }, 20);
      }
    );

    handlerTest.test(
      'inserts a new user and returns a success for a valid, new user',
      validTest => {
        first.resolves();
        insert.resolves();

        handler({ body: { email: 'em@il.com', password: 'password' } }, res);

        setTimeout(() => {
          validTest.ok(res.status.calledWith(200), 'HTTP status set to 200');
          validTest.ok(res.send.notCalled, 'does not send a message');
          validTest.ok(res.end.called, 'response is terminated');
          validTest.done();
        }, 20);
      }
    );

    handlerTest.done();
  });

  endpointTest.done();
});
