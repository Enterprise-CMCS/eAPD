const tap = require('tap');
const sinon = require('sinon');

const {
  apdActivityContractorResource: contractor,
  apdActivityContractorResourceCost: cost
} = require('./contractorResource');

tap.test(
  'contractor resource data model',
  async contractorResourceModelTests => {
    contractorResourceModelTests.test('setup', async setupTests => {
      setupTests.match(
        contractor,
        {
          tableName: 'activity_contractor_resources',
          activity: Function,
          years: Function,
          static: {
            updateableFields: ['name', 'description', 'start', 'end'],
            owns: { years: 'apdActivityContractorResourceCost' },
            foreignKey: 'contractor_resource_id'
          }
        },
        'get the expected model definitions'
      );
    });

    contractorResourceModelTests.test(
      'expense model sets up activity relationship',
      async relationTest => {
        const self = {
          belongsTo: sinon.stub().returns('baz')
        };

        const output = contractor.activity.bind(self)();

        relationTest.ok(
          self.belongsTo.calledWith('apdActivity'),
          'sets up the relationship mapping to an activity'
        );
        relationTest.equal(output, 'baz', 'returns the expected value');
      }
    );

    contractorResourceModelTests.test(
      'expense model sets up resource cost relationship',
      async relationTest => {
        const self = {
          hasMany: sinon.stub().returns('baz')
        };

        const output = contractor.years.bind(self)();

        relationTest.ok(
          self.hasMany.calledWith(
            'apdActivityContractorResourceCost',
            'contractor_resource_id'
          ),
          'sets up the relationship mapping to years'
        );
        relationTest.equal(output, 'baz', 'returns the expected value');
      }
    );

    contractorResourceModelTests.test('validation', async validationTests => {
      validationTests.test('fails if dates cannot be parsed', async test => {
        const self = { attributes: { start: 'invalid date', end: 0 } };

        test.rejects(
          contractor.validate.bind(self),
          'rejects if start date is invalid'
        );

        self.attributes.start = 0;
        self.attributes.end = 'invalidate date';

        test.rejects(
          contractor.validate.bind(self),
          'rejects if end date is invalid'
        );
      });

      validationTests.test('pass if dates are valid', async test => {
        const self = { attributes: { start: 0, end: 0 } };
        test.resolves(contractor.validate.bind(self), 'resolves');
      });
    });

    contractorResourceModelTests.test(
      'overrides toJSON method',
      async jsonTests => {
        const self = { get: sinon.stub(), related: sinon.stub() };
        self.get.returns('--- unknown field ---');
        self.get.withArgs('id').returns('id field');
        self.get.withArgs('name').returns('name field');
        self.get.withArgs('description').returns('description field');
        self.get.withArgs('start').returns('start field');
        self.get.withArgs('end').returns('end field');
        self.related.withArgs('years').returns('some times');

        const output = contractor.toJSON.bind(self)();

        jsonTests.same(output, {
          id: 'id field',
          name: 'name field',
          description: 'description field',
          start: 'start field',
          end: 'end field',
          years: 'some times'
        });
      }
    );
  }
);

tap.test(
  'contractor resource cost data model',
  async contractorResourceCostModelTests => {
    contractorResourceCostModelTests.test('setup', async setupTests => {
      setupTests.match(
        cost,
        {
          tableName: 'activity_contractor_resources_yearly',
          contractorResource: Function,
          static: {
            updateableFields: ['year', 'cost']
          }
        },
        'get the expected model definitions'
      );
    });

    contractorResourceCostModelTests.test(
      'expense model sets up contractor resource relationship',
      async relationTest => {
        const self = {
          belongsTo: sinon.stub().returns('baz')
        };

        const output = cost.contractorResource.bind(self)();

        relationTest.ok(
          self.belongsTo.calledWith('apdActivityContractorResource'),
          'sets up the relationship mapping to a contractor resource'
        );
        relationTest.equal(output, 'baz', 'returns the expected value');
      }
    );

    contractorResourceCostModelTests.test(
      'validation',
      async validationTests => {
        validationTests.test(
          'fails if the year is too early or too late',
          async test => {
            const self = { attributes: { year: 2009 } };
            test.rejects(
              cost.validate.bind(self),
              'rejects if year is too early'
            );
            self.attributes.year = 3001;
            test.rejects(
              cost.validate.bind(self),
              'rejects if year is too late'
            );
          }
        );

        validationTests.test('succeeds if year is valid', async test => {
          const self = { attributes: { year: 2019 } };
          test.resolves(cost.validate.bind(self), 'resolves if year is valid');
        });
      }
    );

    contractorResourceCostModelTests.test(
      'overrides toJSON method',
      async jsonTests => {
        const self = { get: sinon.stub() };
        self.get.returns('--- unknown field ---');
        self.get.withArgs('id').returns('id field');
        self.get.withArgs('cost').returns('cost field');
        self.get.withArgs('year').returns('year field');

        const output = cost.toJSON.bind(self)();

        jsonTests.same(output, {
          id: 'id field',
          cost: 'cost field',
          year: 'year field'
        });
      }
    );
  }
);
