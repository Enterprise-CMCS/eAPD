const tap = require('tap');
const sinon = require('sinon');

const goal = require('./goal').apdActivityGoal;

tap.test('goal data model', async goalModelTests => {
  goalModelTests.test('setup', async setupTests => {
    setupTests.match(
      goal,
      {
        tableName: 'activity_goals',
        static: {
          updateableFields: ['description'],
          owns: { objectives: 'apdActivityGoalObjective' },
          foreignKey: 'activity_goal_id'
        }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      goal.activity,
      'function',
      'creates an activity relationship'
    );

    setupTests.type(
      goal.objectives,
      'function',
      'creates an activity relationship'
    );
  });

  goalModelTests.test(
    'goal model sets up activity relationship',
    async relationTest => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = goal.activity.bind(self)();

      relationTest.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to an activity'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  goalModelTests.test(
    'goal model sets up objectives relationship',
    async relationTest => {
      const self = {
        hasMany: sinon.stub().returns('baz')
      };

      const output = goal.objectives.bind(self)();

      relationTest.ok(
        self.hasMany.calledWith('apdActivityGoalObjective'),
        'sets up the relationship mapping to objectives'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  goalModelTests.test('has validate method', async validationTests => {
    validationTests.test('throws if description is empty', async test => {
      test.rejects(
        goal.validate.bind({
          attributes: {
            description: undefined
          }
        }),
        'fails if description is undefined'
      );

      test.rejects(
        goal.validate.bind({
          attributes: {
            description: null
          }
        }),
        'fails if description is null'
      );

      test.rejects(
        goal.validate.bind({
          attributes: {
            description: ''
          }
        }),
        'fails if description is empty string'
      );

      test.resolves(
        goal.validate.bind({
          attributes: {
            description: 'something'
          }
        }),
        'passes if description is not empty'
      );
    });
  });

  goalModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub(), related: sinon.stub() };
    self.get.withArgs('id').returns('Everyone');
    self.get.withArgs('description').returns('loves');
    self.related.withArgs('objectives').returns('cake');

    const output = goal.toJSON.bind(self)();

    jsonTests.match(output, {
      id: 'Everyone',
      description: 'loves',
      objectives: 'cake'
    });
  });
});
