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
          updateableFields: ['entity', 'percent_of_cost']
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
    self.get.withArgs('id').returns(1);
    self.get.withArgs('entity').returns('Medicaid');
    self.get.withArgs('percent_of_cost').returns(100);

    const output = costAllocation.toJSON.bind(self)();

    jsonTests.match(output, {
      id: 1,
      entity: 'Medicaid',
      percent_of_cost: 100
    });
  });
});
