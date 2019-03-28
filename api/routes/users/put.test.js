const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const putEndpoint = require('./put');

tap.test('user PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    put: sandbox.stub()
  };

  const RoleModel = {
    fetchAll: sandbox.stub()
  };

  const UserModel = {
    fetch: sandbox.stub(),
    where: sandbox.stub()
  };

  const StateModel = {
    fetchAll: sandbox.stub()
  };

  const model = () => ({
    get: sandbox.stub(),
    save: sandbox.stub(),
    set: sandbox.stub(),
    validate: sandbox.stub()
  });

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

  endpointTest.test('setup', async test => {
    putEndpoint(app);

    test.ok(
      app.put.calledWith('/users/:id', can('add-users'), sinon.match.func),
      'user PUT endpoint is registered'
    );
  });

  endpointTest.test('update user handler', async tests => {
    let handler;
    tests.beforeEach(done => {
      putEndpoint(app, { RoleModel, StateModel, UserModel });
      handler = app.put.args.find(args => args[0] === '/users/:id')[2];
      done();
    });

    tests.test(
      'sends an invalid request error if the ID is not numeric',
      async test => {
        await handler({ user: {}, params: { id: 'abc' } }, res);

        test.ok(UserModel.where.notCalled, 'database is not queried');
        test.ok(UserModel.fetch.notCalled, 'database is not queried');
        test.ok(res.status.calledWith(400), 'HTTP status set to 400');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    tests.test(
      'sends a server error code if there is a database error',
      async test => {
        UserModel.fetch.rejects();

        await handler({ user: {}, params: { id: 1 } }, res);

        test.ok(
          UserModel.where.calledWith({ id: 1 }),
          'looks for only the specific user'
        );
        test.ok(res.status.calledWith(500), 'HTTP status set to 500');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    tests.test(
      'sends a not-found error if the requested user does not exist',
      async test => {
        UserModel.fetch.resolves();
        await handler({ user: {}, params: { id: '1' } }, res);

        test.ok(
          UserModel.where.calledWith({ id: 1 }),
          'looks for only the specific user'
        );
        test.ok(UserModel.fetch.calledOnce, 'fetches just once');
        test.ok(res.status.calledWith(404), 'HTTP status set to 404');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    tests.test('updates simple properties, if set', async propertyTests => {
      ['email', 'name', 'position', 'phone'].forEach(prop =>
        propertyTests.test(`for ${prop} property`, async test => {
          const user = model();
          UserModel.fetch.resolves(user);

          await handler(
            {
              body: { [prop]: 'value' },
              user: { id: 2 },
              params: { id: '1' }
            },
            res
          );

          test.ok(
            user.set.calledWith(prop, 'value'),
            `${prop} is set on data model`
          );
        })
      );

      propertyTests.test('for all of them at once', async test => {
        const user = model();
        UserModel.fetch.resolves(user);

        await handler(
          {
            body: {
              email: 'email-value',
              name: 'name-value',
              position: 'position-value',
              phone: 'phone-value'
            },
            user: { id: 2 },
            params: { id: '1' }
          },
          res
        );

        test.ok(
          user.set.calledWith('email', 'email-value'),
          'email is set on data model'
        );
        test.ok(
          user.set.calledWith('name', 'name-value'),
          'name is set on data model'
        );
        test.ok(
          user.set.calledWith('position', 'position-value'),
          'position is set on data model'
        );
        test.ok(
          user.set.calledWith('phone', 'phone-value'),
          'phone is set on data model'
        );
      });

      propertyTests.test('ignores junk properties', async test => {
        const user = model();
        UserModel.fetch.resolves(user);

        await handler(
          {
            body: {
              junk: 'property',
              should: 'be',
              thrown: 'out'
            },
            user: { id: 2 },
            params: { id: '1' }
          },
          res
        );

        test.ok(user.set.notCalled, 'no properties are set on the data model');
      });
    });

    tests.test('updates the state property', async stateTests => {
      const user = model();

      stateTests.beforeEach(async () => {
        UserModel.fetch.resolves(user);
      });

      stateTests.test('sends an error if the state is invalid', async test => {
        const state1 = model();
        state1.get.withArgs('id').returns('aa');
        const state2 = model();
        state2.get.withArgs('id').returns('bb');
        StateModel.fetchAll.resolves([state1, state2]);

        await handler(
          {
            body: { state: 'st' },
            user: { id: 2 },
            params: { id: '1' }
          },
          res
        );

        test.ok(user.set.notCalled, 'user database model is not update');
        test.ok(res.status.calledWith(400), 'HTTP status set to 400');
        test.ok(
          res.send.calledWith({ error: 'update-user-invalid-state' }),
          'error message is sent'
        );
        test.ok(
          res.send.calledAfter(res.status),
          'error message is sent after setting status'
        );
        test.ok(res.end.called, 'response is terminated');
        test.ok(
          res.end.calledAfter(res.send),
          'response is terminated after error message is sent'
        );
      });

      stateTests.test(
        'sets the state on the database model if valid',
        async test => {
          const state1 = model();
          state1.get.withArgs('id').returns('st');
          const state2 = model();
          state2.get.withArgs('id').returns('bb');
          StateModel.fetchAll.resolves([state1, state2]);

          await handler(
            {
              body: { state: 'st' },
              user: { id: 2 },
              params: { id: '1' }
            },
            res
          );

          test.ok(
            user.set.calledWith('state_id', 'st'),
            'user model is updated with new state'
          );
        }
      );
    });

    tests.test('updates the role property', async roleTests => {
      const user = model();

      roleTests.beforeEach(async () => {
        UserModel.fetch.resolves(user);
      });

      roleTests.test('sends an error if the role is invalid', async test => {
        const role1 = model();
        role1.get.withArgs('name').returns('role1');
        const role2 = model();
        role2.get.withArgs('name').returns('role2');
        RoleModel.fetchAll.resolves([role1, role2]);

        await handler(
          {
            body: { role: 'bad' },
            user: { id: 2 },
            params: { id: '1' }
          },
          res
        );

        test.ok(user.set.notCalled, 'user database model is not update');
        test.ok(res.status.calledWith(400), 'HTTP status set to 400');
        test.ok(
          res.send.calledWith({ error: 'update-user-invalid-role' }),
          'error message is sent'
        );
        test.ok(
          res.send.calledAfter(res.status),
          'error message is sent after setting status'
        );
        test.ok(res.end.called, 'response is terminated');
        test.ok(
          res.end.calledAfter(res.send),
          'response is terminated after error message is sent'
        );
      });

      roleTests.test(
        'does not set the role on the database model if the user is updating their own account',
        async test => {
          const role1 = model();
          role1.get.withArgs('name').returns('good');
          const role2 = model();
          role2.get.withArgs('name').returns('better');
          RoleModel.fetchAll.resolves([role1, role2]);

          await handler(
            {
              body: { role: 'good' },
              user: { id: 1 },
              params: { id: '1' }
            },
            res
          );

          test.notOk(
            user.set.calledWith('auth_role'),
            'user model is not updated with new role'
          );
        }
      );

      roleTests.test(
        'sets the role on the database model if valid',
        async test => {
          const role1 = model();
          role1.get.withArgs('name').returns('good');
          const role2 = model();
          role2.get.withArgs('name').returns('better');
          RoleModel.fetchAll.resolves([role1, role2]);

          await handler(
            {
              body: { role: 'good' },
              user: { id: 2 },
              params: { id: '1' }
            },
            res
          );

          test.ok(
            user.set.calledWith('auth_role', 'good'),
            'user model is updated with new role'
          );
        }
      );

      roleTests.test(
        'clears the role on the database model if an empty string is provided',
        async test => {
          await handler(
            {
              body: { role: '' },
              user: { id: 2 },
              params: { id: '1' }
            },
            res
          );

          test.ok(
            user.set.calledWith('auth_role', null),
            'user model is updated with new role'
          );
        }
      );
    });

    tests.test('validates the model before saving', async validateTests => {
      const user = model();

      validateTests.beforeEach(async () => {
        UserModel.fetch.resolves(user);
      });

      validateTests.test(
        'sends an error if the model fails to validate',
        async test => {
          const err = new Error('error message');
          user.validate.throws(err);

          await handler({ body: {}, user: { id: 1 }, params: { id: 2 } }, res);

          test.ok(res.status.calledWith(400), 'HTTP status set to 400');
          test.ok(
            res.send.calledWith({ error: 'update-user-error message' }),
            'error message is sent'
          );
          test.ok(
            res.send.calledAfter(res.status),
            'error message is sent after setting status'
          );
          test.ok(res.end.called, 'response is terminated');
          test.ok(
            res.end.calledAfter(res.send),
            'response is terminated after error message is sent'
          );
        }
      );

      validateTests.test('saves if validation succeeds', async test => {
        user.validate.resolves();

        await handler({ body: {}, user: { id: 1 }, params: { id: 2 } }, res);

        test.ok(user.save.calledOnce, 'user model is saved');
        test.ok(
          user.save.calledAfter(user.validate),
          'model is saved after validation'
        );
        test.ok(res.status.calledWith(204), 'HTTP status set to 200');
        test.ok(res.send.notCalled, 'body not sent');
        test.ok(res.end.calledOnce, 'response is terminated');
        test.ok(
          res.end.calledAfter(res.status),
          'response is terminated after status is set'
        );
      });
    });
  });
});
