const tap = require('tap');
const sinon = require('sinon');

const loggedInMiddleware = require('../../../../auth/middleware').loggedIn;
const putEndpoint = require('./put');

tap.test('apd activity goal PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { put: sandbox.stub() };

  const ActivityModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };
  const GoalModel = {
    forge: sandbox.stub(),
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };
  const ObjectiveModel = {
    forge: sandbox.stub(),
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };

  const activityObj = {
    related: sandbox.stub(),
    get: sandbox.stub()
  };

  const apdObj = {
    related: sandbox.stub(),
    get: sandbox.stub()
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
    ActivityModel.fetch.resolves(activityObj);
    activityObj.related.withArgs('apd').returns(apdObj);

    GoalModel.where.returns(GoalModel);
    ObjectiveModel.where.returns(ObjectiveModel);

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app, ActivityModel, GoalModel, ObjectiveModel, userCanEditAPD);

    setupTest.ok(
      app.put.calledWith(
        '/activities/:id/goals',
        loggedInMiddleware,
        sinon.match.func
      ),
      'apd activity PUT endpoint is registered'
    );
  });

  endpointTest.test('edit APD activity handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(async () => {
      putEndpoint(
        app,
        ActivityModel,
        GoalModel,
        ObjectiveModel,
        userCanEditAPD
      );
      handler = app.put.args.find(
        args => args[0] === '/activities/:id/goals'
      )[2];
    });

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
        activityObj.get.withArgs('id').returns('apd-id');
        userCanEditAPD.resolves(false);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an error if request body is not an array',
      async invalidTest => {
        const req = {
          user: { id: 1 },
          params: { id: 1 },
          body: 'hello'
        };
        activityObj.get.withArgs('id').returns('apd-id');
        userCanEditAPD.resolves(true);

        await handler(req, res);

        invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
        invalidTest.ok(
          res.send.calledWith({ error: 'edit-activity-invalid-goals' }),
          'sends an error string'
        );
        invalidTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test('updates valid goals', async validTest => {
      const req = {
        user: { id: 1 },
        params: { id: 1 },
        body: [
          {
            description: 'goal 1',
            objectives: ['objective 1.1', 'objective 1.2']
          },
          { description: 'goal 2', objectives: ['objective 2.1'] },
          { hello: 'world', objectives: ['objective 3.1', 'objective 3.2'] }
        ]
      };
      activityObj.get.withArgs('id').returns('apd-id');

      const existingGoals = [];
      for (let i = 0; i < 3; i += 1) {
        const goalObjectives = [];

        for (let j = 0; j < 3; j += 1) {
          goalObjectives.push({
            destroy: sinon.stub().resolves()
          });
        }

        existingGoals.push({
          related: sinon.stub().returns(goalObjectives),
          destroy: sinon.stub().resolves()
        });
      }

      activityObj.related.withArgs('goals').returns(existingGoals);
      userCanEditAPD.resolves(true);

      const goal = {
        save: sandbox.stub().resolves(),
        get: sandbox.stub().returns('goal-id')
      };

      GoalModel.forge.returns(goal);

      const objective = {
        save: sandbox.stub().resolves()
      };

      ObjectiveModel.forge.returns(objective);

      ActivityModel.fetch.onSecondCall().resolves({
        toJSON: sandbox.stub().returns('activity-from-json')
      });

      await handler(req, res);

      validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
      validTest.ok(
        res.send.calledWith('activity-from-json'),
        'sends JSON-ified activity'
      );

      validTest.ok(
        existingGoals.every(oldGoal =>
          oldGoal
            .related()
            .every(
              oldObjective =>
                oldObjective.destroy.calledOnce &&
                oldObjective.destroy.calledBefore(oldGoal.destroy)
            )
        ),
        'all of the old objectives are deleted, before deleting their containing goals'
      );
      validTest.ok(
        existingGoals.every(
          oldGoal =>
            oldGoal.destroy.calledOnce &&
            oldGoal.destroy.calledBefore(GoalModel.forge) &&
            oldGoal.destroy.calledBefore(ObjectiveModel.forge)
        ),
        'all of the old goals are deleted before new goals/objectives are created'
      );
      validTest.ok(
        GoalModel.forge.calledTwice,
        'two goals are created (the invalid one is left out)'
      );
      validTest.ok(
        GoalModel.forge.calledWith({ description: 'goal 1', activity_id: 1 }) &&
          GoalModel.forge.calledWith({ description: 'goal 2', activity_id: 1 }),
        'the two expected goals are created'
      );
      validTest.ok(
        goal.save.calledBefore(ObjectiveModel.forge),
        'goals are saved before objectives are created'
      );
      validTest.ok(
        ObjectiveModel.forge.calledThrice,
        'three objectives are created (objectives for invalid goal are left out)'
      );
      validTest.ok(
        ObjectiveModel.forge.calledWith({
          description: 'objective 1.1',
          activity_goal_id: 'goal-id'
        }) &&
          ObjectiveModel.forge.calledWith({
            description: 'objective 1.2',
            activity_goal_id: 'goal-id'
          }) &&
          ObjectiveModel.forge.calledWith({
            description: 'objective 2.1',
            activity_goal_id: 'goal-id'
          }),
        'the three expected objectives are created'
      );
    });
  });
});
