const tap = require('tap');
const sinon = require('sinon');

const canMiddleware = require('../../auth/middleware').can('edit-roles');
const putEndpoint = require('./put');

tap.test('roles POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    put: sandbox.stub()
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
    putEndpoint(app, RoleModel, ActivityModel);

    setupTest.ok(
      app.put.calledWith('/roles/:id', canMiddleware, sinon.match.func),
      'roles PUT endpoint is registered'
    );
  });

  endpointTest.test('edit role handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      putEndpoint(app, RoleModel, ActivityModel);
      handler = app.put.args.find(args => args[0] === '/roles/:id')[2];
      done();
    });

    handlerTest.test(
      'sends a not found error if requesting to edit a role that does not exist',
      async notFoundTest => {
        const req = { params: { id: 1 }, body: { activities: [1, 2, 3] } };
        RoleModel.where.withArgs({ id: 1 }).returns({ fetch: RoleModel.fetch });
        RoleModel.fetch.resolves(null);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'rejects invalid role objects...',
      async validationTest => {
        validationTest.beforeEach(async () => {
          const fetch = sinon.stub.resolves(true);
          RoleModel.where.withArgs({ id: 1 }).returns({ fetch });
        });

        validationTest.test(
          'if the role does not have any activities',
          async invalidTest => {
            const req = { params: { id: 1 }, body: {} };
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
            const req = { params: { id: 1 }, body: { activities: [1, 'one'] } };
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
            const req = { params: { id: 1 }, body: { activities: [1, 2, 3] } };
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
        const req = {
          params: { id: 1 },
          body: { name: 'bob', activities: [1, 2] }
        };
        const save = sinon.stub().rejects();
        const attach = sinon.stub();
        const detach = sinon.stub();
        const fetch = sinon.stub;
        RoleModel.where.withArgs({ id: 1 }).returns({ fetch });
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
        fetch.resolves({
          save,
          activities: () => ({ attach, detach }),
          get: sinon
            .stub()
            .withArgs('id')
            .returns('bob-id')
        });

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test('saves a valid role object', async saveTest => {
      const req = {
        params: { id: 1 },
        body: { name: 'bob', activities: [1, 2] }
      };
      const save = sinon.stub().resolves();
      const attach = sinon.stub();
      const detach = sinon.stub();
      const fetch = sinon.stub();
      RoleModel.where.withArgs({ id: 1 }).returns({ fetch });
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
      fetch.resolves({
        save,
        activities: () => ({ attach, detach }),
        getActivities: async () => ['activity model 1', 'activity model 2'],
        get: sinon
          .stub()
          .withArgs('id')
          .returns('bob-id')
      });

      await handler(req, res);
      saveTest.ok(true);

      saveTest.ok(
        detach.calledBefore(attach),
        'activities are detached before new activities are added'
      );
      saveTest.ok(
        detach.calledWithExactly(),
        'all existing related activities are removed'
      );
      saveTest.ok(
        save.calledAfter(detach),
        'the model is saved after old activities are detached'
      );
      saveTest.ok(
        save.calledBefore(attach),
        'the model is saved before new activities are attached'
      );
      saveTest.ok(
        attach.calledWith(sinon.match.array.deepEquals([1, 2])),
        'the role is associated with new activities'
      );
      saveTest.ok(
        save.calledAfter(attach),
        'the model is saved after new activities are attached'
      );
      saveTest.ok(res.status.calledWith(204), 'HTTP status set to 204');
      saveTest.ok(res.end.calledOnce, 'response is terminated');
    });
  });
});
