const tap = require('tap');
const sinon = require('sinon');

const activity = require('./activity');

tap.test('activity data model', async activityModelTests => {
  activityModelTests.test('setup', async setupTests => {
    setupTests.match(
      activity,
      {
        apdActivity: {
          tableName: 'activities',

          apd: Function,
          goals: Function,
          approaches: Function,
          contractorResources: Function,
          expenses: Function,
          schedule: Function,
          statePersonnel: Function,
          costAllocation: Function,
          format: Function,

          static: {
            updateableFields: [
              'name',
              'summary',
              'description',
              'alternatives',
              'costAllocationMethodology',
              'otherFundingSources',
              'types',
              'standardsAndConditions'
            ],
            owns: {
              goals: 'apdActivityGoal',
              approaches: 'apdActivityApproach',
              contractorResources: 'apdActivityContractorResource',
              expenses: 'apdActivityExpense',
              schedule: 'apdActivitySchedule',
              statePersonnel: 'apdActivityStatePersonnel',
              costAllocation: 'apdActivityCostAllocation'
            },
            foreignKey: 'activity_id',
            withRelated: [
              'approaches',
              'contractorResources',
              'contractorResources.years',
              'goals',
              'expenses',
              'expenses.entries',
              'schedule',
              'statePersonnel',
              'statePersonnel.years',
              'costAllocation'
            ]
          }
        }
      },
      'get the expected model definitions'
    );
  });

  activityModelTests.test('sets up relationships', async relationshipTests => {
    relationshipTests.test(
      'activity model sets up apd relationship',
      async apdTests => {
        const self = {
          belongsTo: sinon.stub().returns('baz')
        };

        const output = activity.apdActivity.apd.bind(self)();

        apdTests.ok(
          self.belongsTo.calledWith('apd'),
          'sets up the relationship mapping to a apd'
        );
        apdTests.equal(output, 'baz', 'returns the expected value');
      }
    );

    relationshipTests.test(
      'activity model sets up goals relationship',
      async apdTests => {
        const self = {
          hasMany: sinon.stub().returns('bag')
        };

        const output = activity.apdActivity.goals.bind(self)();

        apdTests.ok(
          self.hasMany.calledWith('apdActivityGoal'),
          'sets up the relationship mapping to goal'
        );
        apdTests.equal(output, 'bag', 'returns the expected value');
      }
    );

    relationshipTests.test(
      'activity model sets up approaches relationship',
      async apdTests => {
        const self = {
          hasMany: sinon.stub().returns('starsky')
        };

        const output = activity.apdActivity.approaches.bind(self)();

        apdTests.ok(
          self.hasMany.calledWith('apdActivityApproach'),
          'sets up the relationship mapping to approach'
        );
        apdTests.equal(output, 'starsky', 'returns the expected value');
      }
    );

    relationshipTests.test(
      'activity model sets up contract resources relationship',
      async apdTests => {
        const self = {
          hasMany: sinon.stub().returns('southwest')
        };

        const output = activity.apdActivity.contractorResources.bind(self)();

        apdTests.ok(
          self.hasMany.calledWith('apdActivityContractorResource'),
          'sets up the relationship mapping to contractor resources'
        );
        apdTests.equal(output, 'southwest', 'returns the expected value');
      }
    );

    relationshipTests.test(
      'activity model sets up expenses relationship',
      async apdTests => {
        const self = {
          hasMany: sinon.stub().returns('bag')
        };

        const output = activity.apdActivity.expenses.bind(self)();

        apdTests.ok(
          self.hasMany.calledWith('apdActivityExpense'),
          'sets up the relationship mapping to expense'
        );
        apdTests.equal(output, 'bag', 'returns the expected value');
      }
    );

    relationshipTests.test(
      'activity model sets up state personnel relationship',
      async apdTests => {
        const self = {
          hasMany: sinon.stub().returns('locomotion')
        };

        const output = activity.apdActivity.statePersonnel.bind(self)();

        apdTests.ok(
          self.hasMany.calledWith('apdActivityStatePersonnel'),
          'sets up the relationship mapping to state personnel'
        );
        apdTests.equal(output, 'locomotion', 'returns the expected value');
      }
    );

    relationshipTests.test(
      'activity model sets up schedule relationship',
      async apdTests => {
        const self = {
          hasMany: sinon.stub().returns('can')
        };

        const output = activity.apdActivity.schedule.bind(self)();

        apdTests.ok(
          self.hasMany.calledWith('apdActivitySchedule'),
          'sets up the relationship mapping to schedule'
        );
        apdTests.equal(output, 'can', 'returns the expected value');
      }
    );

    relationshipTests.test(
      'activity model sets up cost allocation relationship',
      async apdTests => {
        const self = {
          hasMany: sinon.stub().returns('can')
        };

        const output = activity.apdActivity.costAllocation.bind(self)();

        apdTests.ok(
          self.hasMany.calledWith('apdActivityCostAllocation'),
          'sets up the relationship mapping to cost allocation'
        );
        apdTests.equal(output, 'can', 'returns the expected value');
      }
    );
  });

  activityModelTests.test(
    'activity model validate method',
    async validationTests => {
      const sandbox = sinon.createSandbox();
      const self = {
        hasChanged: sandbox.stub(),
        where: sandbox.stub(),
        fetchAll: sandbox.stub(),
        attributes: {}
      };
      const validate = activity.apdActivity.validate.bind(self);

      validationTests.beforeEach(async () => {
        sandbox.resetBehavior();
        sandbox.resetHistory();

        self.attributes = {};

        self.where.returns(self);
      });

      validationTests.test(
        'does not throw if the name has not changed',
        async test => {
          self.hasChanged.withArgs('name').returns(false);

          test.resolves(validate(), 'validate resolves');
        }
      );

      validationTests.test(
        'does not throw if the name has changed, is valid, and is unique',
        async test => {
          self.hasChanged.withArgs('name').returns(true);
          self.attributes.name = 'valid name';
          self.fetchAll.resolves([]);

          test.resolves(validate(), 'validate resolves');
        }
      );

      validationTests.test('throws if the name is null', async test => {
        self.hasChanged.withArgs('name').returns(true);
        self.attributes.name = null;

        try {
          await validate();
        } catch (e) {
          test.ok('rejects on an empty name');
          test.equal(
            e.message,
            'activity-name-invalid',
            'rejects with the expected message'
          );
        }
      });

      validationTests.test('throws if the name is not a number', async test => {
        self.hasChanged.withArgs('name').returns(true);
        self.attributes.name = 7;

        try {
          await validate();
        } catch (e) {
          test.ok('rejects on an empty name');
          test.equal(
            e.message,
            'activity-name-invalid',
            'rejects with the expected message'
          );
        }
      });

      validationTests.test(
        'throws if the name is an empty string',
        async test => {
          self.hasChanged.withArgs('name').returns(true);
          self.attributes.name = '';

          try {
            await validate();
          } catch (e) {
            test.ok('rejects on an empty name');
            test.equal(
              e.message,
              'activity-name-invalid',
              'rejects with the expected message'
            );
          }
        }
      );

      validationTests.test('throws if the name already exists', async test => {
        self.hasChanged.withArgs('name').returns(true);
        self.attributes.name = 'valid name';
        self.fetchAll.resolves([{ hello: 'world' }]);

        try {
          await validate();
        } catch (e) {
          test.ok('rejects if the name already exists');
          test.equal(
            e.message,
            'activity-name-exists',
            'rejects with the expected message'
          );
        }
      });
    }
  );

  activityModelTests.test(
    'activity model overrides toJSON method',
    async apdTests => {
      const self = {
        get: sinon.stub(),
        related: sinon.stub()
      };
      self.get.withArgs('id').returns('eye-dee');
      self.get.withArgs('name').returns('Jerome Lee');
      self.get.withArgs('summary').returns('US Public Health Service officer');
      self.get.withArgs('description').returns('cool CMS person');
      self.get.withArgs('alternatives').returns('Nick Aretakis');
      self.get.withArgs('cost_allocation_methodology').returns('moop moop');
      self.get
        .withArgs('other_funding_sources_description')
        .returns('panhandling, funny videos online');
      self.get
        .withArgs('other_funding_sources_amount')
        .returns('37¢ and some lint');
      self.get.withArgs('types').returns('on a typewriter');
      self.get
        .withArgs('standards_and_conditions')
        .returns('nobody reads them');

      self.related.withArgs('goals').returns('goooooaaaaals');
      self.related.withArgs('approaches').returns('quietly from the left');

      const output = activity.apdActivity.toJSON.bind(self)();

      apdTests.match(
        output,
        {
          id: 'eye-dee',
          name: 'Jerome Lee',
          summary: 'US Public Health Service officer',
          description: 'cool CMS person',
          alternatives: 'Nick Aretakis',
          costAllocationMethodology: 'moop moop',
          otherFundingSources: {
            description: 'panhandling, funny videos online',
            amount: '37¢ and some lint'
          },
          goals: 'goooooaaaaals',
          approaches: 'quietly from the left',
          types: 'on a typewriter',
          standardsAndConditions: 'nobody reads them'
        },
        'gives us back the right JSON-ified object'
      );
    }
  );
});
