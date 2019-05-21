const tap = require('tap');
const sinon = require('sinon');

const loggedIn = require('../../middleware').loggedIn;
const endpoint = require('./put');

tap.test('me PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    put: sandbox.stub()
  };

  const req = {
    session: { passport: { user: 'session id' } },
    user: {
      id: 'one',
      model: {
        get: sandbox.stub(),
        set: sandbox.stub(),
        save: sandbox.stub(),
        validate: sandbox.stub(),
        related: sinon
          .stub()
          .withArgs('state')
          .returns({
            get: sinon.stub().returns('state info')
          })
      }
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
    const deserialize = sandbox.stub();
    let handler;

    tests.beforeEach(async () => {
      endpoint(app, { deserialize });
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

        test.ok(
          res.send.calledWith(
            sinon.match({
              id: 'one',
              state: { id: 'state info', name: 'state info' }
            })
          ),
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

      const fieldsAreUpdated = test => {
        test.notOk(
          req.user.model.set.calledWith('email'),
          'email is NOT updated'
        );
        test.ok(
          req.user.model.set.calledWith('name', 'new name'),
          'name is updated'
        );
        test.ok(
          req.user.model.set.calledWith('password', 'new password'),
          'password is updated'
        );
        test.ok(
          req.user.model.set.calledWith('phone', 'new phone'),
          'phone is updated'
        );
        test.ok(
          req.user.model.set.calledWith('position', 'new position'),
          'position is updated'
        );
      };

      changesTests.test('validation fails', async test => {
        req.user.model.validate.rejects(new Error('validation'));
        await handler(req, res);

        fieldsAreUpdated(test);

        test.ok(res.status.calledWith(400), 'HTTP status 400 set');
        test.ok(
          res.send.calledWith({ error: 'edit-self.validation' }),
          'sends expected error token'
        );
        test.ok(res.end.calledOnce, 'response is terminated');
      });

      changesTests.test('deserialization fails', async test => {
        deserialize.yields('error', null);

        await handler(req, res);

        fieldsAreUpdated(test);

        test.ok(res.status.calledWith(500), 'HTTP status 500 set');
        test.ok(res.send.notCalled, 'no content is sent');
        test.ok(res.end.calledOnce, 'response is terminated');
      });

      changesTests.test('everything is happy', async test => {
        deserialize.yields(null, req.user);

        await handler(req, res);

        fieldsAreUpdated(test);
        test.ok(
          res.send.calledWith(
            sinon.match({
              id: 'one',
              state: { id: 'state info', name: 'state info' }
            })
          ),
          'sends back the user object'
        );
      });
    });
  });
});
