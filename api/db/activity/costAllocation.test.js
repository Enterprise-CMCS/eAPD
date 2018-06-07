const tap = require('tap');
const sinon = require('sinon');

const costAllocation = require('./costAllocation').apdActivityCostAllocation;

tap.test('costAllocation data model', async costAllocationModelTests => {
  costAllocationModelTests.test('setup', async setupTests => {
    setupTests.match(
      costAllocation,
      {
        tableName: 'activity_cost_allocation',
        static: {
          updateableFields: ['year', 'federal', 'state', 'other']
        }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      costAllocation.activity,
      'function',
      'creates an activity relationship'
    );
  });

  costAllocationModelTests.test(
    'costAllocation model sets up activity relationship',
    async relationTest => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = costAllocation.activity.bind(self)();

      relationTest.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to an activity'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  costAllocationModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub() };
    self.get.withArgs('year').returns(1);
    self.get.withArgs('federal').returns('CMS');
    self.get.withArgs('state').returns('Franklin');
    self.get.withArgs('other').returns('Alvin the Chipmunk');

    const output = costAllocation.toJSON.bind(self)();

    jsonTests.match(output, {
      year: 1,
      federal: 'CMS',
      state: 'Franklin',
      other: 'Alvin the Chipmunk'
    });
  });
});
