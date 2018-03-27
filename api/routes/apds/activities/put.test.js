const tap = require('tap');
const sinon = require('sinon');

const {
  loggedIn,
  loadActivity,
  userCanEditAPD
} = require('../../../middleware');
const putEndpoint = require('./put');

tap.test('apd activity PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { put: sandbox.stub() };

  const ActivityModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
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
    putEndpoint(app, ActivityModel);

    setupTest.ok(
      app.put.calledWith(
        '/activities/:id',
        loggedIn,
        loadActivity(),
        userCanEditAPD(ActivityModel),
        sinon.match.func
      ),
      'apd activity PUT endpoint is registered'
    );
  });

  endpointTest.test('edit APD activity handler', async handlerTest => {
    let handler;
    let req;
    handlerTest.beforeEach(async () => {
      putEndpoint(app, ActivityModel);
      handler = app.put.args.find(args => args[0] === '/activities/:id').pop();

      req = {
        user: { id: 1 },
        params: { id: 1 },
        meta: {
          activity: {
            get: sandbox
              .stub()
              .withArgs('id')
              .returns('activity-id-from-db'),
            related: sandbox.stub(),
            save: sandbox.stub().resolves(),
            set: sandbox.spy(),
            toJSON: sandbox.stub().returns('activity-as-json')
          },
          apd: {
            get: sandbox
              .stub()
              .withArgs('id')
              .returns('apd-id-from-db'),
            related: sandbox.stub()
          }
        }
      };
    });

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        delete req.meta;
        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test(
      'sends an error if the activity name is an empty string',
      async invalidTest => {
        req.body = {
          name: '',
          description: 'fishing on the ice'
        };

        await handler(req, res);

        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'update-activity-invalid-name' }),
          'sends back an error string'
        );
        invalidTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an error if the activity name already exists within the APD',
      async invalidTest => {
        req.body = {
          name: 'ice fishing',
          description: 'fishing on the ice'
        };

        const some = sinon.stub().returns(true);
        req.meta.apd.related.withArgs('activities').returns({ some });

        await handler(req, res);

        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'update-activity-name-exists' }),
          'sends back an error string'
        );
        invalidTest.ok(res.end.calledOnce, 'response is terminated');

        invalidTest.test(
          '"some" function works as expected',
          async someTests => {
            const someFn = some.args[0][0];
            const obj = {
              get: sandbox.stub()
            };

            someTests.test(
              'returns false if the input activity has the same ID as the current activity, but different name',
              async falseTest => {
                obj.get.withArgs('id').returns('activity-id-from-db');
                obj.get.withArgs('name').returns('bloop');
                const result = someFn(obj);
                falseTest.notOk(result, 'returns false');
              }
            );

            someTests.test(
              'returns false if the input activity has the same ID as the current activity, and the same name',
              async falseTest => {
                obj.get.withArgs('id').returns('activity-id-from-db');
                obj.get.withArgs('name').returns('ice fishing');
                const result = someFn(obj);
                falseTest.notOk(result, 'returns false');
              }
            );

            someTests.test(
              'returns false if the input activity has a different ID as the current activity, and different name',
              async falseTest => {
                obj.get.withArgs('id').returns('some fake ID');
                obj.get.withArgs('name').returns('bloop');
                const result = someFn(obj);
                falseTest.notOk(result, 'returns false');
              }
            );

            someTests.test(
              'returns true if the input activity has the same ID as the current activity, but different name',
              async trueTest => {
                obj.get.withArgs('id').returns('some fake ID');
                obj.get.withArgs('name').returns('ice fishing');
                const result = someFn(obj);
                trueTest.ok(result, 'returns true');
              }
            );
          }
        );
      }
    );

    handlerTest.test('updates a valid APD activity', async validTest => {
      req.body = {
        name: 'ice fishing',
        description: 'fishing on the ice'
      };
      const some = sinon.stub().returns(false);
      req.meta.apd.related.withArgs('activities').returns({ some });

      await handler(req, res);

      validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
      validTest.ok(
        res.send.calledWith('activity-as-json'),
        'sends back the toJSON results'
      );
      validTest.ok(
        req.meta.activity.set.calledWith({
          name: 'ice fishing',
          description: 'fishing on the ice'
        }),
        'model is updated with data from the request body'
      );
      validTest.ok(
        req.meta.activity.save.calledAfter(req.meta.activity.set),
        'model is saved after updating'
      );
    });
  });
});
