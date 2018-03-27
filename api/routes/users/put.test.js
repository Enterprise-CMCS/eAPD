const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const putEndpoint = require('./put');

tap.test('users PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    put: sandbox.stub()
  };
  const User = {
    get: sandbox.stub(),
    set: sandbox.stub(),
    save: sandbox.stub(),
    toJSON: sandbox.stub(),
    validate: sandbox.stub()
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

  endpointTest.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    UserModel.where.returns({ fetch: UserModel.fetch });
  });

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app, UserModel);

    setupTest.ok(
      app.put.calledWith('/users/:id', can('edit-users'), sinon.match.func),
      'users PUT endpoint is registered'
    );
  });

  endpointTest.test('edit users handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(async () => {
      putEndpoint(app, UserModel);
      handler = app.put.args.find(args => args[0] === '/users/:id')[2];
    });

    handlerTest.test(
      'sends a not found error if requesting to edit a user that does not exist',
      async notFoundTest => {
        const req = { params: { id: 1 }, body: { name: 'person' } };
        UserModel.fetch.resolves(null);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        const req = {
          params: { id: 1 },
          body: { name: 'bob', activities: [1, 2] }
        };

        UserModel.fetch.rejects();

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test(
      'rejects if the data model validation fails',
      async invalidTest => {
        const req = {
          params: { id: 1 },
          body: { name: 'Bob', email: 'new@email.com' }
        };
        User.get
          .withArgs('id')
          .returns('bob-id')
          .withArgs('email')
          .returns('old@email.com');
        User.save.resolves();
        User.validate.rejects(new Error('invalidate-test'));

        UserModel.fetch.resolves(User);

        await handler(req, res);

        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'edit-user-invalidate-test' }),
          'error token is set'
        );
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('updates a valid user object', async validTest => {
      const req = {
        params: { id: 1 },
        body: { name: 'Bob', email: 'new@email.com' }
      };
      User.get
        .withArgs('id')
        .returns('bob-id')
        .withArgs('email')
        .returns('old@email.com');
      User.save.resolves();
      User.toJSON.returns({ name: 'json-name' });
      User.validate.resolves();

      UserModel.fetch.resolves(User);

      await handler(req, res);

      validTest.ok(
        User.set.calledWith({ name: 'Bob' }),
        'sets the user name field'
      );
      validTest.ok(
        User.set.calledWith({ email: 'new@email.com' }),
        'sets the new user email'
      );
      validTest.ok(
        User.save.calledAfter(User.set),
        'the model is saved after values are set'
      );
      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        User.toJSON.calledOnce,
        'database object is converted to pure object'
      );
      validTest.ok(
        res.send.calledWith({ name: 'json-name' }),
        'updated user data is sent'
      );
    });
  });
});
