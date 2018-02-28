const tap = require('tap');
const sinon = require('sinon');

const canMiddleware = require('../../auth/middleware').can('edit-users');
const putEndpoint = require('./put');

tap.test('users PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    put: sandbox.stub()
  };
  const UserModel = {
    fetch: sandbox.stub(),
    where: sandbox.stub()
  };
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };
  const passwordChecker = sandbox.stub();

  endpointTest.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);
  });

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app, UserModel, passwordChecker);

    setupTest.ok(
      app.put.calledWith('/users/:id', canMiddleware, sinon.match.func),
      'users PUT endpoint is registered'
    );
  });

  endpointTest.test('edit users handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(async () => {
      putEndpoint(app, UserModel, passwordChecker);
      handler = app.put.args.find(args => args[0] === '/users/:id')[2];
    });

    handlerTest.test(
      'sends a not found error if requesting to edit a user that does not exist',
      async notFoundTest => {
        const req = { params: { id: 1 }, body: { name: 'person' } };
        UserModel.where.withArgs({ id: 1 }).returns({ fetch: UserModel.fetch });
        UserModel.fetch.resolves(null);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'rejects invalid user objects...',
      async validationTest => {
        validationTest.beforeEach(async () => {
          const get = sinon.stub();
          get.withArgs('email').returns('test-email');
          const fetch = sinon.stub().resolves({ get });
          UserModel.where.withArgs({ id: 1 }).returns({ fetch });
        });

        validationTest.test(
          'if the user sends a new email that is already in the system',
          async invalidTest => {
            const req = { params: { id: 1 }, body: { email: 'new-email' } };
            UserModel.where
              .withArgs({ email: 'new-email' })
              .returns({ fetch: UserModel.fetch });
            UserModel.fetch.resolves(true);

            await handler(req, res);

            invalidTest.ok(
              res.send.calledWith({ error: sinon.match.string }),
              'sends back an error string'
            );
            invalidTest.ok(
              res.status.calledWith(400),
              'HTTP status set to 400'
            );
            invalidTest.ok(
              res.send.calledWith({ error: 'edit-user-email-exists' }),
              'body set to error token'
            );
            invalidTest.ok(res.end.calledOnce, 'response is terminated');
          }
        );

        validationTest.test(
          'if the user sends a new password that is weak',
          async invalidTest => {
            const req = {
              params: { id: 1 },
              body: { password: 'test-password' }
            };
            passwordChecker.returns({ score: 1 });

            await handler(req, res);

            invalidTest.ok(
              res.send.calledWith({ error: sinon.match.string }),
              'sends back an error string'
            );
            invalidTest.ok(
              res.status.calledWith(400),
              'HTTP status set to 400'
            );
            invalidTest.ok(
              res.send.calledWith({ error: 'edit-user-weak-password' }),
              'body set to error token'
            );
            invalidTest.ok(res.end.calledOnce, 'response is terminated');
          }
        );
      }
    );

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        const req = {
          params: { id: 1 },
          body: { name: 'bob', activities: [1, 2] }
        };

        UserModel.where.withArgs({ id: 1 }).returns({ fetch: UserModel.fetch });
        UserModel.fetch.rejects();

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test(
      'updates a valid user object where the email is updated',
      async validTest => {
        const req = {
          params: { id: 1 },
          body: { name: 'Bob', email: 'new@email.com' }
        };
        const save = sinon.stub().resolves();
        const set = sinon.stub();
        UserModel.where.withArgs({ id: 1 }).returns({ fetch: UserModel.fetch });

        UserModel.fetch.resolves({
          save,
          set,
          get: sinon
            .stub()
            .withArgs('id')
            .returns('bob-id')
            .withArgs('email')
            .returns('old@email.com')
        });

        UserModel.where
          .withArgs({ email: 'new@email.com' })
          .returns({ fetch: sinon.stub().resolves(null) });

        await handler(req, res);

        validTest.ok(
          set.calledWith({ name: 'Bob' }),
          'sets the user name field'
        );
        validTest.ok(
          set.calledWith({ email: 'new@email.com' }),
          'sets the new user email'
        );
        validTest.ok(
          save.calledAfter(set),
          'the model is called after values are set'
        );
        validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      }
    );

    handlerTest.test(
      'updates a valid user object where the password is updated',
      async validTest => {
        const req = {
          params: { id: 1 },
          body: { name: 'Bob', password: 'newpassword' }
        };
        const save = sinon.stub().resolves();
        const set = sinon.stub();
        UserModel.where.withArgs({ id: 1 }).returns({ fetch: UserModel.fetch });
        UserModel.fetch.resolves({
          save,
          set,
          get: sinon
            .stub()
            .withArgs('id')
            .returns('bob-id')
        });
        passwordChecker.returns({ score: 4 });

        await handler(req, res);

        validTest.ok(
          set.calledWith({ name: 'Bob' }),
          'sets the user name field'
        );
        validTest.ok(
          set.calledWith({ password: sinon.match(/^\$2a\$10\$.{53}$/) }),
          'sets the new user password to a hashed value'
        );
        validTest.ok(
          save.calledAfter(set),
          'the model is called after values are set'
        );
        validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      }
    );

    handlerTest.test(
      'updates a valid user object where neither the email or password is updated',
      async validTest => {
        const req = {
          params: { id: 1 },
          body: { name: 'Bob' }
        };
        const save = sinon.stub().resolves();
        const set = sinon.stub();
        UserModel.where.withArgs({ id: 1 }).returns({ fetch: UserModel.fetch });

        UserModel.fetch.resolves({
          save,
          set,
          get: sinon
            .stub()
            .withArgs('id')
            .returns('bob-id')
        });

        await handler(req, res);

        validTest.ok(
          set.calledWith({ name: 'Bob' }),
          'sets the user name field'
        );
        validTest.ok(
          save.calledAfter(set),
          'the model is called after values are set'
        );
        validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      }
    );
  });
});
