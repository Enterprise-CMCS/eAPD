const tap = require('tap');
const sinon = require('sinon');

const { loggedIn, userCanEditAPD } = require('../../../middleware');
const postEndpoint = require('./post');

tap.test('apd activity POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { post: sandbox.stub() };

  const ActivityModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub(),
    fetchAll: sandbox.stub(),
    forge: sandbox.stub()
  };

  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    ActivityModel.where.returns(ActivityModel);

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    postEndpoint(app, ActivityModel);

    setupTest.ok(
      app.post.calledWith(
        '/apds/:id/activities',
        loggedIn,
        userCanEditAPD(),
        sinon.match.func
      ),
      'apd activity POST endpoint is registered'
    );
  });

  endpointTest.test('create APD activity handler', async handlerTest => {
    let handler;
    let req;
    handlerTest.beforeEach(async () => {
      postEndpoint(app, ActivityModel);
      handler = app.post.args
        .find(args => args[0] === '/apds/:id/activities')
        .pop();

      req = {
        user: { id: 1 },
        params: { id: 'apd-id' },
        meta: {
          apd: {
            get: sandbox.stub().returns('apd-id-from-db'),
            related: sandbox.stub()
          }
        }
      };
    });

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async errorTest => {
        delete req.meta;
        await handler(req, res);

        errorTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        errorTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('adding a single activity...', async singleTests => {
      singleTests.test(
        'sends an error if activity does not validate',
        async invalidTest => {
          req.body = {
            name: 7,
            description: 'bloop blorp'
          };

          const activityObj = {
            toJSON: sandbox.stub().returns('activity-as-json'),
            save: sandbox.stub().resolves(),
            validate: sandbox.stub().rejects(new Error('REJECTED'))
          };
          ActivityModel.forge.returns(activityObj);

          await handler(req, res);

          invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
          invalidTest.ok(
            res.send.calledWith({ error: 'add-activity-REJECTED' }),
            'sends back an error string'
          );
          invalidTest.ok(res.end.calledOnce, 'response is terminated');
        }
      );

      singleTests.test(
        'sends back all APD activities, including new one, if everything is valid',
        async validTest => {
          req.body = {
            name: 'activity name',
            description: 'bloop blorp'
          };

          req.meta.apd.related.withArgs('activities').returns({
            pluck: sinon
              .stub()
              .withArgs(['name'])
              .returns(['other name', 'third name'])
          });

          ActivityModel.fetchAll.resolves({
            toJSON: sandbox.stub().returns('activity-as-json')
          });
          const activityObj = {
            toJSON: sandbox.stub().returns('activity-as-json'),
            save: sandbox.stub().resolves(),
            validate: sandbox.stub().resolves()
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
            }),
            'creates an activity object'
          );
          validTest.ok(activityObj.save.calledOnce, 'activity model is saved');
        }
      );
    });

    handlerTest.test('adding multiple activities...', async multipleTests => {
      multipleTests.test(
        'sends an error if any activity is not valid',
        async invalidTest => {
          req.body = [
            {
              name: 'activity name',
              description: 'bloop blorp'
            },
            {
              id: 'existing-activity',
              name: 'new-name!'
            }
          ];

          const existing = [
            {
              get: sinon
                .stub()
                .withArgs('id')
                .returns('existing-activity'),
              set: sinon.stub(),
              save: sinon.stub().resolves(),
              validate: sandbox.stub().rejects(new Error('REJECTED'))
            }
          ];

          req.meta.apd.related.withArgs('activities').returns(existing);

          ActivityModel.fetchAll.resolves({
            toJSON: sinon.stub().returns('activity-as-json')
          });

          const activityObj = {
            toJSON: sandbox.stub().returns('activity-as-json'),
            save: sandbox.stub().resolves(),
            validate: sandbox.stub().rejects(new Error('REJECTED'))
          };
          ActivityModel.forge.returns(activityObj);

          await handler(req, res);

          invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
          invalidTest.ok(
            res.send.calledWith({ error: 'add-activity-REJECTED' }),
            'sends back an error string'
          );
          invalidTest.ok(res.end.calledOnce, 'response is terminated');
        }
      );

      multipleTests.test(
        'sends back all APD activities, including new ones, if everything is valid',
        async validTest => {
          req.body = [
            {
              name: 'activity name',
              description: 'bloop blorp'
            },
            {
              id: 'existing-activity',
              name: 'new-name!'
            }
          ];

          const existing = [
            {
              get: sinon
                .stub()
                .withArgs('id')
                .returns('existing-activity'),
              set: sinon.stub(),
              save: sinon.stub().resolves(),
              validate: sinon.stub().resolves()
            }
          ];

          req.meta.apd.related.withArgs('activities').returns(existing);

          ActivityModel.fetchAll.resolves({
            toJSON: sinon.stub().returns('activity-as-json')
          });

          const activityObj = {
            toJSON: sandbox.stub().returns('activity-as-json'),
            save: sandbox.stub().resolves(),
            validate: sandbox.stub().resolves()
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
            }),
            'creates an activity object'
          );
          validTest.ok(activityObj.save.calledOnce, 'activity model is saved');
        }
      );
    });
  });
});
