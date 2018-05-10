const tap = require('tap');
const sinon = require('sinon');

const can = require('../../../middleware').can;
const postEndpoint = require('./post');

tap.test('auth roles POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    post: sandbox.stub()
  };
  const activities = {
    attach: sandbox.spy(),
    detach: sandbox.spy()
  };
  const roleObj = {
    activities: sandbox.stub(),
    get: sandbox.stub(),
    getActivities: sandbox.stub(),
    load: sandbox.stub(),
    save: sandbox.stub(),
    validate: sandbox.stub(),
    toJSON: sandbox.stub().returns('as json')
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

    RoleModel.forge.returns(roleObj);
    roleObj.activities.returns(activities);

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);
  });

  endpointTest.test('setup', async setupTest => {
    postEndpoint(app, RoleModel);

    setupTest.ok(
      app.post.calledWith('/auth/roles', can('create-roles'), sinon.match.func),
      'roles POST endpoint is registered'
    );
  });

  endpointTest.test('create role handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      postEndpoint(app, RoleModel);
      handler = app.post.args.find(args => args[0] === '/auth/roles')[2];
      done();
    });

    handlerTest.test('rejects if model validation fails', async invalidTest => {
      roleObj.validate.rejects(new Error('oh-noes'));

      await handler({ body: { name: 'Bob' } }, res);

      invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
      invalidTest.ok(
        res.send.calledWith({ error: 'add-role-oh-noes' }),
        'sends an error token'
      );
      invalidTest.ok(res.end.calledOnce, 'response is terminated');
    });

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        const req = { body: { name: 'bob', activities: [1, 2] } };
        RoleModel.forge.throws();

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test('saves a valid role object', async saveTest => {
      const req = { body: { name: 'bob', activities: [1, 2] } };
      roleObj.validate.resolves();
      roleObj.save.resolves();
      roleObj.getActivities.resolves(['activity1', 'activity2']);
      roleObj.load.withArgs('activities').resolves();

      await handler(req, res);

      saveTest.ok(
        RoleModel.forge.calledWith({ name: 'bob' }),
        'new role created'
      );
      saveTest.ok(
        roleObj.save.calledBefore(activities.attach),
        'the model is saved before activities are attached'
      );
      saveTest.ok(
        activities.attach.calledWith(sinon.match.array.deepEquals([1, 2])),
        'the role is associated with activities'
      );
      saveTest.ok(
        roleObj.save.calledAfter(activities.attach),
        'the model is saved after activities are attached'
      );
      saveTest.ok(
        roleObj.load.calledBefore(roleObj.getActivities),
        'activities are loaded before trying to read them [bookshelf quirk]'
      );
      saveTest.ok(res.status.calledWith(201), 'HTTP status set to 201');
      saveTest.ok(
        res.send.calledWith('as-json'),
        'sends back the JSON-ified new role object'
      );
    });
  });
});
