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
          updateableFields: [
            'year',
            'federalPercent',
            'statePercent',
            'otherAmount'
          ]
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
    self.get.withArgs('federal_percent').returns('CMS');
    self.get.withArgs('state_percent').returns('Franklin');
    self.get.withArgs('other_amount').returns('Alvin the Chipmunk');

    const output = costAllocation.toJSON.bind(self)();

    jsonTests.match(output, {
      year: 1,
      federalPercent: 'CMS',
      statePercent: 'Franklin',
      otherAmount: 'Alvin the Chipmunk'
    });
  });
});
