const tap = require('tap');
const sinon = require('sinon');

const loggedInMiddleware = require('../../../auth/middleware').loggedIn;
const postEndpoint = require('./post');

tap.test('apd activity POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { post: sandbox.stub() };

  const ActivityModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub(),
    forge: sandbox.stub()
  };

  const ApdModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };

  const userCanEditAPD = sandbox.stub();

  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    ActivityModel.where.returns(ActivityModel);
    ApdModel.where.returns(ApdModel);

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    postEndpoint(app, ActivityModel, ApdModel, userCanEditAPD);

    setupTest.ok(
      app.post.calledWith(
        '/apds/:apdID/activities',
        loggedInMiddleware,
        sinon.match.func
      ),
      'apd activity POST endpoint is registered'
    );
  });

  endpointTest.test('create APD activity handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(async () => {
      postEndpoint(app, ActivityModel, ApdModel, userCanEditAPD);
      handler = app.post.args.find(
        args => args[0] === '/apds/:apdID/activities'
      )[2];
    });

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async errorTest => {
        const req = { params: { apdID: 'apd-id' } };

        await handler(req, res);

        errorTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        errorTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an error if requesting to edit a apd not associated with user',
      async notFoundTest => {
        const req = {
          user: { id: 1 },
          params: { id: 1 }
        };
        userCanEditAPD.resolves(false);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an error if requesting to edit a apd that does not exist',
      async notFoundTest => {
        const req = {
          user: { id: 'user-id' },
          params: { apdID: 'apd-id' }
        };
        userCanEditAPD.resolves(true);
        ApdModel.where.withArgs({ id: 'apd-id' }).returns(ApdModel);
        ApdModel.fetch.resolves(false);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an error if activity name is not a string',
      async invalidTest => {
        const req = {
          user: { id: 'user-id' },
          params: { apdID: 'apd-id' },
          body: {
            name: 7,
            description: 'bloop blorp'
          }
        };
        userCanEditAPD.resolves(true);
        ApdModel.where.withArgs({ id: 'apd-id' }).returns(ApdModel);
        ApdModel.fetch.resolves(true);

        await handler(req, res);

        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'add-activity-invalid-name' }),
          'sends back an error string'
        );
        invalidTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an error if activity name is an empty string',
      async invalidTest => {
        const req = {
          user: { id: 'user-id' },
          params: { apdID: 'apd-id' },
          body: {
            name: '',
            description: 'bloop blorp'
          }
        };
        userCanEditAPD.resolves(true);
        ApdModel.where.withArgs({ id: 'apd-id' }).returns(ApdModel);
        ApdModel.fetch.resolves(true);

        await handler(req, res);

        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'add-activity-invalid-name' }),
          'sends back an error string'
        );
        invalidTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an error if activity name already exists in the APD',
      async invalidTest => {
        const req = {
          user: { id: 'user-id' },
          params: { apdID: 'apd-id' },
          body: {
            name: 'activity name',
            description: 'bloop blorp'
          }
        };
        userCanEditAPD.resolves(true);
        ApdModel.where.withArgs({ id: 'apd-id' }).returns(ApdModel);

        const apdObj = {
          related: sinon
            .stub()
            .withArgs('activities')
            .returns({
              pluck: sinon
                .stub()
                .withArgs(['name'])
                .returns(['other name', 'activity name'])
            })
        };

        ApdModel.fetch.resolves(apdObj);

        await handler(req, res);

        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'add-activity-name-exists' }),
          'sends back an error string'
        );
        invalidTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends back the new activity if everything is valid',
      async validTest => {
        const req = {
          user: { id: 'user-id' },
          params: { apdID: 'apd-id' },
          body: {
            name: 'activity name',
            description: 'bloop blorp'
          }
        };
        userCanEditAPD.resolves(true);
        ApdModel.where.withArgs({ id: 'apd-id' }).returns(ApdModel);

        const apdObj = {
          related: sinon
            .stub()
            .withArgs('activities')
            .returns({
              pluck: sinon
                .stub()
                .withArgs(['name'])
                .returns(['other name', 'third name'])
            }),
          get: sinon
            .stub()
            .withArgs('id')
            .returns('apd-id-from-db')
        };

        ApdModel.fetch.resolves(apdObj);

        const activityObj = {
          toJSON: sandbox.stub().returns('activity-as-json'),
          save: sandbox.stub().resolves()
        };
        ActivityModel.forge.returns(activityObj);

        await handler(req, res);

        validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
        validTest.ok(
          res.send.calledWith('activity-as-json'),
          'sends back activity object as JSON'
        );
        validTest.ok(
          ActivityModel.forge.calledWith({
            name: 'activity name',
            apd_id: 'apd-id-from-db'
          })
        );
        validTest.ok(activityObj.save.calledOnce, 'activity model is saved');
      }
    );
  });
});
