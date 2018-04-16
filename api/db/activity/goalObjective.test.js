const tap = require('tap');
const sinon = require('sinon');

const goalObjective = require('./goalObjective').apdActivityGoalObjective;

tap.test('goal objective data model', async goalObjectiveModelTests => {
  goalObjectiveModelTests.test('setup', async setupTests => {
    setupTests.match(
      goalObjective,
      {
        tableName: 'activity_goal_objectives',
        static: {
          updateableFields: ['description']
        }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      goalObjective.goal,
      'function',
      'creates a goal relationship'
    );
  });

  goalObjectiveModelTests.test(
    'goal objective model sets up goal relationship',
    async relationTest => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = goalObjective.goal.bind(self)();

      relationTest.ok(
        self.belongsTo.calledWith('apdActivityGoal'),
        'sets up the relationship mapping to a goal'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  goalObjectiveModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub() };
    self.get.withArgs('description').returns('omgwtfbbqpewpew');

    const output = goalObjective.toJSON.bind(self)();

    jsonTests.match(output, 'omgwtfbbqpewpew');
  });
});
