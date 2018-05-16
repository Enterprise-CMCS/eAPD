const tap = require('tap');
const sinon = require('sinon');
const moment = require('moment');

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

    contractorResourceModelTests.test('validation', async test => {
      await Promise.all(
        ['end', 'start'].map(async attr => {
          await Promise.all(
            [7, 'bob', 'January 3, 1947', '14 October 1066', '2014-3-9'].map(
              async invalidValue => {
                try {
                  const self = { attributes: { [attr]: invalidValue } };
                  await contractor.validate.bind(self)();
                  test.fail(`rejects if ${attr} is "${invalidValue}"`);
                } catch (e) {
                  test.pass(`rejects if ${attr} is "${invalidValue}"`);
                }
              }
            )
          );
        })
      );

      const self = {
        attributes: {
          end: '2000-01-01',
          start: '2000-01-01'
        }
      };

      try {
        await contractor.validate.bind(self)();
        test.pass('resolves if all values are valid');
      } catch (e) {
        test.fail('resolves if all values are valid');
      }
    });

    contractorResourceModelTests.test(
      'overrides toJSON method',
      async jsonTests => {
        const self = { get: sinon.stub(), related: sinon.stub() };
        self.get.returns('--- unknown field ---');
        self.get.withArgs('id').returns('id field');
        self.get.withArgs('name').returns('name field');
        self.get.withArgs('description').returns('description field');
        self.get.withArgs('start').returns(moment('2001-01-01').toDate());
        self.get.withArgs('end').returns(moment('2002-02-02').toDate());
        self.related.withArgs('years').returns('some times');

        const output = contractor.toJSON.bind(self)();

        jsonTests.same(output, {
          id: 'id field',
          name: 'name field',
          description: 'description field',
          start: '2001-01-01',
          end: '2002-02-02',
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
