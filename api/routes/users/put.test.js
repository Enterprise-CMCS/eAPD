const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const putEndpoint = require('./put');

tap.test('user PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    put: sandbox.stub()
  };

  const getUserByID = sandbox.stub();
  const updateUser = sandbox.stub();
  const validateUser = sandbox.stub();

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
      putEndpoint(app, { getUserByID, updateUser, validateUser });
      handler = app.put.args.find(args => args[0] === '/users/:id')[2];
      done();
    });

    tests.test(
      'sends an invalid request error if the ID is not numeric',
      async test => {
        await handler({ user: {}, params: { id: 'abc' } }, res);

        test.ok(res.status.calledWith(400), 'HTTP status set to 400');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    tests.test(
      'sends a server error code if there is a database error',
      async test => {
        getUserByID.rejects();

        await handler({ user: {}, params: { id: 1 } }, res);

        test.ok(res.status.calledWith(500), 'HTTP status set to 500');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    tests.test(
      'sends a not-found error if the requested user does not exist',
      async test => {
        getUserByID.resolves();
        await handler({ user: {}, params: { id: '1' } }, res);

        test.ok(res.status.calledWith(404), 'HTTP status set to 404');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    tests.test('updates properties', async propertyTests => {
      propertyTests.beforeEach(async () => {
        getUserByID.resolves({ id: 'id', email: 'email' });
        validateUser.resolves();
        updateUser.resolves();
      });

      propertyTests.test(
        'role is stripped if user is trying to update themselves',
        async test => {
          await handler(
            {
              body: { role: 'new role', name: 'value' },
              user: { id: 2 },
              params: { id: '2' }
            },
            res
          );

          test.ok(
            updateUser.calledWith(2, { name: 'value' }),
            `auth_role is not updated`
          );
          test.ok(
            validateUser.calledWith({ id: 2, name: 'value' }),
            'user ID is included in the validation call'
          );
        }
      );

      propertyTests.test('username property becomes email', async test => {
        await handler(
          { body: { username: 'value' }, user: { id: 2 }, params: { id: '1' } },
          res
        );

        test.ok(
          updateUser.calledWith(1, { email: 'value' }),
          `email is updated on user`
        );
        test.ok(
          validateUser.calledWith({ id: 1, email: 'value' }),
          'user ID is included in the validation call'
        );
      });

      propertyTests.test('state property becomes state_id', async test => {
        await handler(
          { body: { state: 'value' }, user: { id: 2 }, params: { id: '1' } },
          res
        );

        test.ok(
          updateUser.calledWith(1, { state_id: 'value' }),
          `state is updated on user`
        );
        test.ok(
          validateUser.calledWith({ id: 1, state_id: 'value' }),
          'user ID is included in the validation call'
        );
      });

      propertyTests.test('empty state sets state_id to null', async test => {
        await handler(
          { body: { state: '' }, user: { id: 2 }, params: { id: '1' } },
          res
        );

        test.ok(
          updateUser.calledWith(1, { state_id: null }),
          `state is updated on user`
        );
        test.ok(
          validateUser.calledWith({ id: 1, state_id: null }),
          'user ID is included in the validation call'
        );
      });

      propertyTests.test('role property becomes auth_role', async test => {
        await handler(
          { body: { role: 'value' }, user: { id: 2 }, params: { id: '1' } },
          res
        );

        test.ok(
          updateUser.calledWith(1, { auth_role: 'value' }),
          `role is updated on user`
        );
        test.ok(
          validateUser.calledWith({ id: 1, auth_role: 'value' }),
          'user ID is included in the validation call'
        );
      });

      propertyTests.test('empty role sets auth_role to null', async test => {
        await handler(
          { body: { role: '' }, user: { id: 2 }, params: { id: '1' } },
          res
        );

        test.ok(
          updateUser.calledWith(1, { auth_role: null }),
          `state is updated on user`
        );
        test.ok(
          validateUser.calledWith({ id: 1, auth_role: null }),
          'user ID is included in the validation call'
        );
      });

      ['name', 'password', 'position', 'phone'].forEach(prop =>
        propertyTests.test(`for ${prop} property`, async test => {
          await handler(
            {
              body: { [prop]: 'value' },
              user: { id: 2 },
              params: { id: '1' }
            },
            res
          );

          test.ok(
            updateUser.calledWith(1, { [prop]: 'value' }),
            `${prop} is updated on user`
          );
          test.ok(
            validateUser.calledWith({ id: 1, [prop]: 'value' }),
            'user ID is included in the validation call'
          );
        })
      );

      propertyTests.test('for all of them at once', async test => {
        await handler(
          {
            body: {
              name: 'name-value',
              password: 'password-value',
              position: 'position-value',
              phone: 'phone-value',
              username: 'email-value'
            },
            user: { id: 2 },
            params: { id: '1' }
          },
          res
        );

        test.ok(
          updateUser.calledWith(1, {
            email: 'email-value',
            name: 'name-value',
            password: 'password-value',
            position: 'position-value',
            phone: 'phone-value'
          }),

          'all of the properties are updated'
        );
        test.ok(
          validateUser.calledWith({
            id: 1,
            email: 'email-value',
            name: 'name-value',
            password: 'password-value',
            position: 'position-value',
            phone: 'phone-value'
          }),
          'user ID is included in the validation call'
        );
      });

      propertyTests.test('ignores junk properties', async test => {
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

        test.ok(
          updateUser.notCalled,
          'no properties are set on the data model'
        );
      });
    });

    tests.test('validates the model before saving', async validateTests => {
      validateTests.beforeEach(async () => {
        getUserByID.resolves({ id: 'id', email: 'email' });
        updateUser.resolves();
      });

      // If there aren't any changes to save, nothing is validated, so we need to
      // actually set something in the request body

      validateTests.test(
        'sends an error if the model fails to validate',
        async test => {
          const err = new Error('error message');
          validateUser.rejects(err);

          await handler(
            { body: { name: 'new name' }, user: { id: 1 }, params: { id: 2 } },
            res
          );

          test.ok(
            validateUser.calledWith({ id: 2, name: 'new name' }),
            'user ID is included in the validation call'
          );
          test.ok(res.status.calledWith(400), 'HTTP status set to 400');
          test.ok(
            res.send.calledWith({ error: 'edit-account.error message' }),
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
        validateUser.resolves();

        await handler(
          { body: { name: 'new name' }, user: { id: 1 }, params: { id: 2 } },
          res
        );

        test.ok(
          validateUser.calledWith({ id: 2, name: 'new name' }),
          'user ID is included in the validation call'
        );
        test.ok(updateUser.calledOnce, 'user model is saved');
        test.ok(
          updateUser.calledAfter(validateUser),
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
