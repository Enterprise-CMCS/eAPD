const tap = require('tap');
const sinon = require('sinon');

const can = require('../../../middleware').can;
const putEndpoint = require('./put');

tap.test('auth roles PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    put: sandbox.stub()
  };
  const RoleModel = {
    fetch: sandbox.stub(),
    forge: sandbox.stub(),
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
  });

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app, RoleModel);

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
      putEndpoint(app, RoleModel);
      handler = app.put.args.find(args => args[0] === '/auth/roles/:id')[2];
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
      'rejects if the user attempts to edit own role',
      async invalidTest => {
        const req = { user: { role: 'role' }, params: { id: 1 } };
        RoleModel.where
          .withArgs({ id: 1 })
          .returns({ fetch: RoleModel.fetch })
          .withArgs({ id: 1, name: 'role' })
          .returns({ fetch: sinon.stub().resolves(true) });
        RoleModel.fetch.resolves(true);

        await handler(req, res);

        invalidTest.ok(res.status.calledWith(403), 'HTTP status set to 403');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test('rejects if model validation fails', async invalidTest => {
      const req = {
        user: { role: 'role' },
        params: { id: 1 },
        body: { name: 'bob', activities: [1, 2] }
      };
      const save = sinon.stub().resolves();
      const attach = sinon.stub();
      const detach = sinon.stub();
      RoleModel.where
        // query to make sure the role exists
        .withArgs({ id: 1 })
        .returns({ fetch: RoleModel.fetch })
        // query to make sure the role is not this user's role
        .withArgs({ id: 1, name: 'role' })
        .returns({ fetch: sinon.stub().resolves(false) });
      RoleModel.fetch.resolves({
        save,
        activities: () => ({ attach, detach }),
        getActivities: async () => ['activity model 1', 'activity model 2'],
        get: sinon
          .stub()
          .withArgs('id')
          .returns('bob-id'),
        validate: sinon.stub().rejects(new Error('oh-noes')),
        toJSON: sinon.stub()
      });

      await handler(req, res);

      invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
      invalidTest.ok(
        res.send.calledWith({ error: 'edit-role-oh-noes' }),
        'sends an error token'
      );
      invalidTest.ok(res.end.calledOnce, 'response is terminated');
    });

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async errorTest => {
        const req = {
          params: { id: 1 }
        };
        RoleModel.where.withArgs({ id: 1 }).returns({ fetch: RoleModel.fetch });
        RoleModel.fetch.rejects();

        await handler(req, res);

        errorTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        errorTest.ok(res.send.notCalled, 'body is not sent');
        errorTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test('saves a valid role object', async saveTest => {
      const req = {
        user: { role: 'role' },
        params: { id: 1 },
        body: { name: 'bob', activities: [1, 2] }
      };
      const save = sinon.stub().resolves();
      const attach = sinon.stub();
      const detach = sinon.stub();
      RoleModel.where
        // query to make sure the role exists
        .withArgs({ id: 1 })
        .returns({ fetch: RoleModel.fetch })
        // query to make sure the role is not this user's role
        .withArgs({ id: 1, name: 'role' })
        .returns({ fetch: sinon.stub().resolves(false) });
      const model = {
        save,
        activities: () => ({ attach, detach }),
        getActivities: async () => ['activity model 1', 'activity model 2'],
        get: sinon
          .stub()
          .withArgs('id')
          .returns('bob-id'),
        set: sinon.spy(),
        validate: sinon.stub().resolves(),
        toJSON: sinon.stub().returns('as json')
      };
      RoleModel.fetch.resolves(model);

      await handler(req, res);

      saveTest.ok(
        model.set.calledWith({ name: 'bob' }),
        'updates the role name'
      );
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
      saveTest.ok(
        res.send.calledWith('as json'),
        'sends JSON-ified updated role'
      );
    });
  });
});
