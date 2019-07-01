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
          updateableFields: ['description', 'objective'],
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

  goalModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub(), related: sinon.stub() };
    self.get.withArgs('id').returns('Everyone');
    self.get.withArgs('description').returns('loves');
    self.get.withArgs('objective').returns('cake');

    const output = goal.toJSON.bind(self)();

    jsonTests.match(output, {
      id: 'Everyone',
      description: 'loves',
      objective: 'cake'
    });
  });
});
