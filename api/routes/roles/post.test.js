const tap = require('tap');
const sinon = require('sinon');

const canMiddleware = require('../../auth/middleware').can('create-roles');
const postEndpoint = require('./post');

tap.test('roles POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    post: sandbox.stub()
  };
  const RoleModel = {
    fetch: sandbox.stub(),
    forge: sandbox.stub(),
    where: sandbox.stub()
  };
  const ActivityModel = {
    fetchAll: sandbox.stub(),
    where: sandbox.stub()
  };
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(async () => {
    sandbox.reset();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);
  });

  endpointTest.test('setup', async setupTest => {
    postEndpoint(app, RoleModel, ActivityModel);

    setupTest.ok(
      app.post.calledWith('/roles', canMiddleware, sinon.match.func),
      'roles POST endpoint is registered'
    );
  });

  endpointTest.test('create role handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      postEndpoint(app, RoleModel, ActivityModel);
      handler = app.post.args.find(args => args[0] === '/roles')[2];
      done();
    });

    handlerTest.test(
      'rejects invalid role objects...',
      async validationTest => {
        validationTest.test('if no role is sent', async invalidTest => {
          const req = {};

          await handler(req, res);

          invalidTest.ok(
            res.send.calledWith({ error: sinon.match.string }),
            'sends back an error string'
          );
          invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
          invalidTest.ok(res.end.calledOnce, 'response is terminated');
        });

        validationTest.test(
          'if the role does not have a name',
          async invalidTest => {
            const req = { body: {} };

            await handler(req, res);

            invalidTest.ok(
              res.send.calledWith({ error: sinon.match.string }),
              'sends back an error string'
            );
            invalidTest.ok(
              res.status.calledWith(400),
              'HTTP status set to 400'
            );
            invalidTest.ok(res.end.calledOnce, 'response is terminated');
          }
        );

        validationTest.test(
          'if the role name already exists',
          async invalidTest => {
            const req = { body: { name: 'bob' } };
            RoleModel.where
              .withArgs({ name: 'bob' })
              .returns({ fetch: RoleModel.fetch });
            RoleModel.fetch.resolves({ id: 'existing-role' });

            await handler(req, res);

            invalidTest.ok(
              res.send.calledWith({ error: sinon.match.string }),
              'sends back an error string'
            );
            invalidTest.ok(
              res.status.calledWith(400),
              'HTTP status set to 400'
            );
            invalidTest.ok(res.end.calledOnce, 'response is terminated');
          }
        );

        validationTest.test(
          'if the role does not have any activities',
          async invalidTest => {
            const req = { body: { name: 'bob' } };
            RoleModel.where
              .withArgs({ name: 'bob' })
              .returns({ fetch: RoleModel.fetch });
            RoleModel.fetch.resolves(null);

            await handler(req, res);

            invalidTest.ok(
              res.send.calledWith({ error: sinon.match.string }),
              'sends back an error string'
            );
            invalidTest.ok(
              res.status.calledWith(400),
              'HTTP status set to 400'
            );
            invalidTest.ok(res.end.calledOnce, 'response is terminated');
          }
        );

        validationTest.test(
          'if the role has non-numeric activities',
          async invalidTest => {
            const req = { body: { name: 'bob', activities: [1, 'one'] } };
            RoleModel.where
              .withArgs({ name: 'bob' })
              .returns({ fetch: RoleModel.fetch });
            RoleModel.fetch.resolves(null);

            await handler(req, res);

            invalidTest.ok(
              res.send.calledWith({ error: sinon.match.string }),
              'sends back an error string'
            );
            invalidTest.ok(
              res.status.calledWith(400),
              'HTTP status set to 400'
            );
            invalidTest.ok(res.end.calledOnce, 'response is terminated');
          }
        );

        validationTest.test(
          'if the role has activity IDs that do not match any activities',
          async invalidTest => {
            const req = { body: { name: 'bob', activities: [1, 2, 3] } };
            RoleModel.where
              .withArgs({ name: 'bob' })
              .returns({ fetch: RoleModel.fetch });
            RoleModel.fetch.resolves(null);
            ActivityModel.where
              .withArgs('id', 'in', sinon.match.array)
              .returns({ fetchAll: ActivityModel.fetchAll });

            // This fetchAll returns the activity IDs that ARE KNOWN to the
            // system, so we trigger this invalidation route by leaving out
            // one or more of the activity IDs from the test data
            ActivityModel.fetchAll.resolves([
              { get: sinon.stub().returns(1) },
              { get: sinon.stub().returns(2) }
            ]);

            await handler(req, res);

            invalidTest.ok(
              res.send.calledWith({ error: sinon.match.string }),
              'sends back an error string'
            );
            invalidTest.ok(
              res.status.calledWith(400),
              'HTTP status set to 400'
            );
            invalidTest.ok(res.end.calledOnce, 'response is terminated');
          }
        );
      }
    );

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        const req = { body: { name: 'bob', activities: [1, 2] } };
        const save = sinon.stub().rejects();
        const attach = sinon.stub();
        RoleModel.where
          .withArgs({ name: 'bob' })
          .returns({ fetch: RoleModel.fetch });
        RoleModel.fetch.resolves(null);
        ActivityModel.where
          .withArgs('id', 'in', sinon.match.array)
          .returns({ fetchAll: ActivityModel.fetchAll });
        ActivityModel.fetchAll.resolves([
          { get: sinon.stub().returns(1) },
          { get: sinon.stub().returns(2) }
        ]);
        RoleModel.forge.withArgs({ name: 'bob' }).returns({
          save,
          activities: () => ({ attach }),
          get: sinon
            .stub()
            .withArgs('id')
            .returns('bob-id')
        });

        await handler(req, res);
        saveTest.ok(true);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test('saves a valid role object', async saveTest => {
      const req = { body: { name: 'bob', activities: [1, 2] } };
      const save = sinon.stub().resolves();
      const attach = sinon.stub();
      RoleModel.where
        .withArgs({ name: 'bob' })
        .returns({ fetch: RoleModel.fetch });
      RoleModel.fetch.resolves(null);
      ActivityModel.where
        .withArgs('id', 'in', sinon.match.array)
        .returns({ fetchAll: ActivityModel.fetchAll });
      ActivityModel.fetchAll.resolves([
        { get: sinon.stub().returns(1) },
        { get: sinon.stub().returns(2) }
      ]);

      const newUserModel = {
        save,
        activities: () => ({ attach }),
        getActivities: async () => ['one', 'two'],
        get: sinon.stub()
      };
      newUserModel.get.withArgs('id').returns('bob-id');
      newUserModel.get.withArgs('name').returns('bob');

      RoleModel.forge.withArgs({ name: 'bob' }).returns(newUserModel);

      await handler(req, res);
      saveTest.ok(true);

      saveTest.ok(
        RoleModel.forge.calledWith({ name: 'bob' }),
        'new role created'
      );
      saveTest.ok(
        save.calledBefore(attach),
        'the model is saved before activities are attached'
      );
      saveTest.ok(
        attach.calledWith(sinon.match.array.deepEquals([1, 2])),
        'the role is associated with activities'
      );
      saveTest.ok(
        save.calledAfter(attach),
        'the model is saved after activities are attached'
      );
      saveTest.ok(res.status.calledWith(201), 'HTTP status set to 201');
      saveTest.ok(
        res.send.calledWith({
          name: 'bob',
          id: 'bob-id',
          activities: sinon.match.array.deepEquals(['one', 'two'])
        }),
        'sends back the new role object'
      );
    });
  });
});
