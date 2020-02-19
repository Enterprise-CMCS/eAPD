const tap = require('tap');
const sinon = require('sinon');

const loggedIn = require('../../middleware').loggedIn;
const endpoint = require('./put');

tap.test('me PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    put: sandbox.stub()
  };

  const getUserByID = sandbox.stub();
  const updateUser = sandbox.stub();
  const validateUser = sandbox.stub();

  const req = {
    user: {
      id: 'one'
    }
  };

  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    req.body = {};

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);
  });

  endpointTest.test('setup', async setupTest => {
    endpoint(app);

    setupTest.ok(
      app.put.calledWith('/me', loggedIn, sinon.match.func),
      'me PUT endpoint is registered'
    );
  });

  endpointTest.test('update self handler', async tests => {
    let handler;

    tests.beforeEach(async () => {
      endpoint(app, { getUserByID, updateUser, validateUser });
      handler = app.put.args.filter(arg => arg[0] === '/me')[0][2];
    });

    tests.test('handles unexpected errors', async test => {
      delete req.body;

      await handler(req, res);

      test.ok(res.status.calledWith(500), 'HTTP status 500 set');
      test.ok(res.send.notCalled, 'no content is sent');
      test.ok(res.end.calledOnce, 'response is terminated');
    });

    tests.test(
      'returns current user if no applicable changes passed in',
      async test => {
        req.body = {
          junk: 'is ignored',
          stuff: 'also ignored'
        };

        await handler(req, res);

        test.ok(updateUser.notCalled, 'user is not updated');
        test.ok(
          res.send.calledWith({ id: 'one' }),
          'sends back the user object'
        );
      }
    );

    tests.test('with applicable changes', async changesTests => {
      changesTests.beforeEach(async () => {
        req.body = {
          email: 'new email',
          name: 'new name',
          password: 'new password',
          phone: 'new phone',
          position: 'new position'
        };
      });

      changesTests.test('validation fails', async test => {
        validateUser.rejects(new Error('validation'));
        await handler(req, res);

        test.ok(updateUser.notCalled, 'user is not updated');
        test.ok(res.status.calledWith(400), 'HTTP status 400 set');
        test.ok(
          res.send.calledWith({ error: 'edit-self.validation' }),
          'sends expected error token'
        );
        test.ok(res.end.calledOnce, 'response is terminated');
      });

      changesTests.test('everything is happy', async test => {
        validateUser.resolves();
        getUserByID.resolves('updated user object');

        await handler(req, res);

        updateUser.calledWith(
          'one',
          {
            name: 'new name',
            password: 'new password',
            phone: 'new phone',
            position: 'new position'
          },
          'updates the updateable fields, stripping out email'
        );
        test.ok(
          res.send.calledWith('updated user object'),
          'sends back the user object'
        );
      });
    });
  });
});
