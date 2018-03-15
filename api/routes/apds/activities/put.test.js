const tap = require('tap');
const sinon = require('sinon');

const loggedInMiddleware = require('../../../auth/middleware').loggedIn;
const putEndpoint = require('./put');

tap.test('apd activity PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { put: sandbox.stub() };

  const ActivityModel = {
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

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app, ActivityModel, userCanEditAPD);

    setupTest.ok(
      app.put.calledWith(
        '/activities/:id',
        loggedInMiddleware,
        sinon.match.func
      ),
      'apd activity PUT endpoint is registered'
    );
  });

  endpointTest.test('edit APD activity handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(async () => {
      putEndpoint(app, ActivityModel, userCanEditAPD);
      handler = app.put.args.find(args => args[0] === '/activities/:id')[2];
    });

    handlerTest.test(
      'sends a not found error if requesting to edit an activity that does not exist',
      async notFoundTest => {
        const req = { params: { id: 1 } };
        ActivityModel.fetch.resolves(null);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an error if requesting to edit a apd not associated with user',
      async notFoundTest => {
        const req = {
          user: { id: 1 },
          params: { id: 1 }
        };
        ActivityModel.fetch.resolves({
          related: sinon.stub().returns({ get: sinon.stub().returns('apd-id') })
        });
        userCanEditAPD.resolves(false);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        const req = {
          user: { id: 1 },
          params: { id: 1 },
          body: { status: 'foo' }
        };
        ActivityModel.fetch.rejects();

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test(
      'sends an error if the activity name already exists within the APD',
      async invalidTest => {
        const req = {
          user: { id: 1 },
          params: { id: 1 },
          body: {
            name: 'ice fishing',
            description: 'fishing on the ice'
          }
        };
        const related = sinon.stub();
        const some = sinon.stub();
        related
          .withArgs('apd')
          .returns({ get: sinon.stub().returns('apd-id'), related });
        related.withArgs('activities').returns({ some });
        some.returns(true);
        ActivityModel.fetch.resolves({ related });
        userCanEditAPD.resolves(true);

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
                obj.get.withArgs('id').returns(1);
                obj.get.withArgs('name').returns('bloop');
                const result = someFn(obj);
                falseTest.notOk(result, 'returns false');
              }
            );

            someTests.test(
              'returns false if the input activity has the same ID as the current activity, and the same name',
              async falseTest => {
                obj.get.withArgs('id').returns(1);
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
      const req = {
        user: { id: 1 },
        params: { id: 1 },
        body: {
          name: 'ice fishing',
          description: 'fishing on the ice'
        }
      };
      const related = sinon.stub();
      const some = sinon.stub();
      userCanEditAPD.resolves(true);
      related
        .withArgs('apd')
        .returns({ get: sinon.stub().returns('apd-id'), related });
      related.withArgs('activities').returns({ some });
      some.returns(false);
      const activityObj = {
        related,
        set: sinon.spy(),
        save: sinon.stub().resolves(),
        toJSON: sinon.stub().returns('Nick Aretakis')
      };
      ActivityModel.fetch.resolves(activityObj);

      await handler(req, res);

      validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
      validTest.ok(
        res.send.calledWith('Nick Aretakis'),
        'sends back the toJSON results'
      );
      validTest.ok(
        activityObj.set.calledWith({
          name: 'ice fishing',
          description: 'fishing on the ice'
        }),
        'model is updated with data from the request body'
      );
      validTest.ok(
        activityObj.save.calledAfter(activityObj.set),
        'model is saved after updating'
      );
    });
  });
});
