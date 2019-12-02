const tap = require('tap');
const sinon = require('sinon');

const can = require('../../../middleware').can;
const postEndpoint = require('./post');

tap.test('auth roles POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    post: sandbox.stub()
  };

  const createAuthRole = sandbox.stub();
  const getAuthActivitiesByIDs = sandbox.stub();
  const getAuthRoleByName = sandbox.stub();

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
    postEndpoint(app);

    setupTest.ok(
      app.post.calledWith('/auth/roles', can('create-roles'), sinon.match.func),
      'roles POST endpoint is registered'
    );
  });

  endpointTest.test('create role handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      postEndpoint(app, {
        createAuthRole,
        getAuthActivitiesByIDs,
        getAuthRoleByName
      });
      handler = app.post.args.find(args => args[0] === '/auth/roles')[2];
      done();
    });

    const returnsValidationFail = (test, reason) => {
      test.ok(res.status.calledWith(400), 'HTTP status set to 400');
      test.ok(res.send.calledWith({ error: `add-role-${reason}` }));
      test.ok(res.end.calledOnce, 'response is terminated');
    };

    [undefined, '', 3].forEach(name => {
      handlerTest.test(
        `fails gracefully if the role name is invalid: ${JSON.stringify(name)}`,
        async test => {
          await handler({ body: { name } }, res);

          returnsValidationFail(test, 'missing-name');
        }
      );
    });

    handlerTest.test(
      'fails gracefully if an existing role already has this name',
      async test => {
        getAuthRoleByName.resolves({});

        await handler({ body: { name: 'new role' } }, res);

        returnsValidationFail(test, 'duplicate-name');
      }
    );

    [undefined, 'activities', ['hello', 2, 3]].forEach(activities => {
      handlerTest.test(
        `fails gracefully if the list of activities is invalid: ${JSON.stringify(
          activities
        )}`,
        async test => {
          getAuthRoleByName.resolves(null);

          await handler({ body: { name: 'new role', activities } }, res);

          returnsValidationFail(test, 'invalid-activities');
        }
      );
    });

    handlerTest.test(
      `fails gracefully if any activity IDs don't map to existing activities`,
      async test => {
        getAuthRoleByName.resolves(null);
        getAuthActivitiesByIDs.resolves([
          { id: 1, name: 'one' },
          { id: 2, name: 'two' }
        ]);

        await handler(
          { body: { name: 'new role', activities: [1, 2, 3] } },
          res
        );

        returnsValidationFail(test, 'invalid-activities');
      }
    );

    handlerTest.test('returns happily if everything is okay', async test => {
      getAuthRoleByName.resolves(null);
      getAuthActivitiesByIDs.resolves([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' }
      ]);
      createAuthRole.resolves('role id');

      await handler({ body: { name: 'new role', activities: [1, 2] } }, res);

      test.ok(res.status.calledWith(201));
      test.ok(
        res.send.calledWith({
          id: 'role id',
          name: 'new role',
          activities: ['one', 'two']
        })
      );
    });

    handlerTest.test(
      'returns a server error if there is an unexpected error',
      async test => {
        getAuthRoleByName.resolves(null);
        getAuthActivitiesByIDs.resolves([
          { id: 1, name: 'one' },
          { id: 2, name: 'two' }
        ]);
        createAuthRole.rejects();

        await handler({ body: { name: 'new role', activities: [1, 2] } }, res);

        test.ok(res.status.calledWith(500));
        test.ok(res.end.calledOnce, 'response is terminated');
      }
    );
  });
});
