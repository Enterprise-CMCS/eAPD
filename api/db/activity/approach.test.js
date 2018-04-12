const tap = require('tap');
const sinon = require('sinon');

const approach = require('./approach').apdActivityApproach;

tap.test('approach data model', async approachModelTests => {
  approachModelTests.test('setup', async setupTests => {
    setupTests.match(
      approach,
      {
        tableName: 'activity_approaches',
        static: {
          updateableFields: ['description', 'alternatives', 'explanation']
        }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      approach.activity,
      'function',
      'creates an activity relationship'
    );
  });

  approachModelTests.test(
    'approach model sets up activity relationship',
    async relationTest => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = approach.activity.bind(self)();

      relationTest.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to an activity'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  approachModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub() };
    self.get.withArgs('id').returns('Nick');
    self.get.withArgs('description').returns('Aretakis');
    self.get.withArgs('alternatives').returns('at');
    self.get.withArgs('explanation').returns('CMS');

    const output = approach.toJSON.bind(self)();

    jsonTests.match(output, {
      id: 'Nick',
      description: 'Aretakis',
      alternatives: 'at',
      explanation: 'CMS'
    });
  });
});
