const tap = require('tap');
const sinon = require('sinon');

const {
  loggedIn,
  loadActivity,
  userCanEditAPD
} = require('../../../../middleware');
const putEndpoint = require('./put');

tap.test('apd activity schedule PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { put: sandbox.stub() };

  const ActivityModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };
  const ScheduleModel = {
    forge: sandbox.stub()
  };

  const activityObj = {
    related: sandbox.stub(),
    get: sandbox.stub()
  };

  const apdObj = {
    related: sandbox.stub(),
    get: sandbox.stub()
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
    ActivityModel.fetch.resolves(activityObj);
    activityObj.related.withArgs('apd').returns(apdObj);

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app, ActivityModel, ScheduleModel);

    setupTest.ok(
      app.put.calledWith(
        '/activities/:id/schedule',
        loggedIn,
        loadActivity(),
        userCanEditAPD(ActivityModel),
        sinon.match.func
      ),
      'apd activity schedule PUT endpoint is registered'
    );
  });

  endpointTest.test('set APD activity schedule handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(async () => {
      putEndpoint(app, ActivityModel, ScheduleModel);
      handler = app.put.args.find(
        args => args[0] === '/activities/:id/schedule'
      )[4];
    });

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        const req = {
          user: { id: 1 },
          params: { id: 1 },
          body: { status: 'foo' },
          meta: null
        };

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test(
      'sends an error if request body is not an array',
      async invalidTest => {
        const req = {
          user: { id: 1 },
          params: { id: 1 },
          body: 'hello',
          meta: { activity: activityObj }
        };
        activityObj.get.withArgs('id').returns('apd-id');

        await handler(req, res);

        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'edit-activity-invalid-schedule' }),
          'sends an error string'
        );
        invalidTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test('updates valid schedule entries', async validTest => {
      const req = {
        user: { id: 1 },
        params: { id: 1 },
        body: [
          {
            milestone: 'milestone 1',
            status: 'status 1'
          },
          {
            milestone: 'milestone 2',
            status: 'status 2'
          },
          {
            invalid: 'this one is ignored',
            because: 'it does not have any expected fields'
          }
        ],
        meta: { activity: activityObj }
      };
      activityObj.get.withArgs('id').returns('apd-id');

      const destroyExisting = sinon.stub();
      const existingSchedule = [
        { destroy: destroyExisting },
        { destroy: destroyExisting },
        { destroy: destroyExisting }
      ];

      activityObj.related.withArgs('schedule').returns(existingSchedule);

      const schedule = {
        save: sandbox.stub().resolves()
      };

      ScheduleModel.forge.returns(schedule);

      ActivityModel.fetch.resolves({
        toJSON: sandbox.stub().returns('activity-from-json')
      });

      await handler(req, res);

      validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
      validTest.ok(
        res.send.calledWith('activity-from-json'),
        'sends JSON-ified activity'
      );

      validTest.ok(
        destroyExisting.calledThrice,
        'all of the old schedules are deleted'
      );
      validTest.ok(
        ScheduleModel.forge.calledTwice,
        'two schedule entries are created'
      );
      validTest.ok(
        ScheduleModel.forge.calledWith({
          milestone: 'milestone 1',
          status: 'status 1',
          activity_id: 1
        }) &&
          ScheduleModel.forge.calledWith({
            milestone: 'milestone 2',
            status: 'status 2',
            activity_id: 1
          }),
        'the two expected schedule entries are created'
      );
    });
  });
});
