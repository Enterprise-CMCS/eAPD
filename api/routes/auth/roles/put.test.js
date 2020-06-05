const tap = require('tap');
const sinon = require('sinon');

const can = require('../../../middleware').can;
const putEndpoint = require('./put');

tap.test('auth roles PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    put: sandbox.stub()
  };

  const getAuthActivitiesByIDs = sandbox.stub();
  const getAuthRoleByID = sandbox.stub();
  const getAuthRoleByName = sandbox.stub();
  const updateAuthRole = sandbox.stub();

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
  });

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app);

    setupTest.ok(
      app.put.calledWith(
        '/auth/roles/:id',
        can('edit-roles'),
        sinon.match.func
      ),
      'roles PUT endpoint is registered'
    );
  });

  endpointTest.test('edit role handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      putEndpoint(app, {
        getAuthActivitiesByIDs,
        getAuthRoleByID,
        getAuthRoleByName,
        updateAuthRole
      });
      handler = app.put.args.find(args => args[0] === '/auth/roles/:id')[2];
      done();
    });

    handlerTest.test(
      'sends a not found error if requesting to edit a role that does not exist',
      async test => {
        getAuthRoleByID.resolves(null);

        await handler(
          { params: { id: 1 }, body: { activities: [1, 2, 3] } },
          res
        );

        test.ok(res.status.calledWith(404), 'HTTP status set to 404');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'rejects if the user attempts to edit own role',
      async invalidTest => {
        getAuthRoleByID.resolves({ id: 'role id' });
        getAuthRoleByName.withArgs('role').resolves({ id: 'role id' });

        await handler({ user: { role: 'role' }, params: { id: 1 } }, res);

        invalidTest.ok(res.status.calledWith(403), 'HTTP status set to 403');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    const returnsValidationFail = (test, reason) => {
      test.ok(res.status.calledWith(400), `HTTP status set to 400`);
      test.ok(res.send.calledWith({ error: `edit-role-${reason}` }));
      test.ok(res.end.calledOnce, 'response is terminated');
    };

    handlerTest.test(
      'fails gracefully if the role name is invalid: 3',
      async test => {
        getAuthRoleByID.resolves({ id: 'role id' });
        getAuthRoleByName.withArgs('role').resolves({ id: 'other id' });

        await handler(
          { body: { name: 3 }, user: { role: 'role' }, params: { id: 1 } },
          res
        );

        returnsValidationFail(test, 'invalid-name');
      }
    );

    handlerTest.test(
      'fails gracefully if an existing role already has this name',
      async test => {
        getAuthRoleByID.resolves({ id: 'role id' });
        getAuthRoleByName.withArgs('role').resolves({ id: 'other id' });
        getAuthRoleByName.withArgs('new role').resolves({});

        await handler(
          {
            body: { name: 'new role' },
            user: { role: 'role' },
            params: { id: 1 }
          },
          res
        );

        returnsValidationFail(test, 'duplicate-name');
      }
    );

    [undefined, 'activities', ['hello', 2, 3]].forEach(activities => {
      handlerTest.test(
        `fails gracefully if the list of activities is invalid: ${JSON.stringify(
          activities
        )}`,
        async test => {
          getAuthRoleByID.resolves({ id: 'role id' });
          getAuthRoleByName.withArgs('role').resolves({ id: 'other id' });
          getAuthRoleByName.withArgs('new role').resolves(null);

          await handler(
            {
              body: { name: 'new role', activities },
              user: { role: 'role' },
              params: { id: 1 }
            },
            res
          );

          returnsValidationFail(test, 'invalid-activities');
        }
      );
    });

    handlerTest.test(
      `fails gracefully if any activity IDs don't map to existing activities`,
      async test => {
        getAuthRoleByID.resolves({ id: 'role id' });
        getAuthRoleByName.withArgs('role').resolves({ id: 'other id' });
        getAuthRoleByName.withArgs('new role').resolves(null);
        getAuthActivitiesByIDs.resolves([
          { id: 1, name: 'one' },
          { id: 2, name: 'two' }
        ]);

        await handler(
          {
            body: { name: 'new role', activities: [1, 2, 3] },
            user: { role: 'role' },
            params: { id: 1 }
          },
          res
        );

        returnsValidationFail(test, 'invalid-activities');
      }
    );

    handlerTest.test('returns happily if everything is okay', async test => {
      getAuthRoleByID.resolves({ id: 'role id' });
      getAuthRoleByName.withArgs('role').resolves({ id: 'other id' });
      getAuthRoleByName.withArgs('new role').resolves(null);
      getAuthActivitiesByIDs.resolves([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ]);
      updateAuthRole.resolves();

      await handler(
        {
          body: { name: 'new role', isActive: true, activities: [1, 2] },
          user: { role: 'role' },
          params: { id: 1 }
        },
        res
      );

      test.ok(
        res.send.calledWith({
          id: 1,
          name: 'new role',
          isActive: true,
          activities: ['one', 'two']
        })
      );
    });

    handlerTest.test('returns happily if role is inactive', async test => {
      getAuthRoleByID.resolves({ id: 'role id' });
      getAuthRoleByName.withArgs('role').resolves({ id: 'other id' });
      getAuthRoleByName.withArgs('new role').resolves(null);
      getAuthActivitiesByIDs.resolves([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ]);
      updateAuthRole.resolves();

      await handler(
        {
          body: { name: 'new role', isActive: false, activities: [1, 2] },
          user: { role: 'role' },
          params: { id: 1 }
        },
        res
      );

      test.ok(
        res.send.calledWith({
          id: 1,
          name: 'new role',
          isActive: false,
          activities: ['one', 'two']
        })
      );
    });

    handlerTest.test(
      'returns a server error if there is an unexpected error',
      async test => {
        getAuthRoleByID.resolves({ id: 'role id' });
        getAuthRoleByName.withArgs('role').resolves({ id: 'other id' });
        getAuthRoleByName.withArgs('new role').resolves(null);
        getAuthActivitiesByIDs.resolves([
          { id: 1, name: 'one' },
          { id: 2, name: 'two' }
        ]);
        updateAuthRole.rejects();

        await handler(
          {
            body: { name: 'new role', activities: [1, 2] },
            user: { role: 'role' },
            params: { id: 1 }
          },
          res
        );

        test.ok(res.status.calledWith(500));
        test.ok(res.end.calledOnce, 'response is terminated');
      }
    );
  });
});
