const tap = require('tap');
const sinon = require('sinon');

const activity = require('./activity')();

tap.test('activity data model', async activityModelTests => {
  activityModelTests.test('setup', async setupTests => {
    setupTests.match(
      activity,
      {
        apdActivity: { tableName: 'activities' },
        apdActivityGoal: { tableName: 'activity_goals' },
        apdActivityGoalObjective: { tableName: 'activity_goal_objectives' },
        apdActivityExpense: { tableName: 'activity_expenses' },
        apdActivityExpenseEntry: { tableName: 'activity_expense_entries' },
        apdActivitySchedule: { tableName: 'activity_schedule' }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      activity.apdActivity.apd,
      'function',
      'creates a apd relationship for the activity model'
    );

    setupTests.type(
      activity.apdActivity.goals,
      'function',
      'creates a goals relationship for the activity model'
    );

    setupTests.type(
      activity.apdActivity.approaches,
      'function',
      'creates an approaches relationship for the activity model'
    );

    setupTests.type(
      activity.apdActivity.expenses,
      'function',
      'creates a expenses relationship for the activity model'
    );

    setupTests.type(
      activity.apdActivity.schedule,
      'function',
      'creates a schedule relationship for the activity model'
    );

    setupTests.type(
      activity.apdActivityGoal.activity,
      'function',
      'creates a activity relationship for the goal model'
    );

    setupTests.type(
      activity.apdActivityGoal.objectives,
      'function',
      'creates a objectives relationship for the goal model'
    );

    setupTests.type(
      activity.apdActivityGoalObjective.goal,
      'function',
      'creates a goal relationship for the objective model'
    );

    setupTests.type(
      activity.apdActivityApproach.activity,
      'function',
      'creates a activity relationship for the approach model'
    );

    setupTests.type(
      activity.apdActivityExpense.activity,
      'function',
      'creates a activity relationship for the expense model'
    );

    setupTests.type(
      activity.apdActivityExpense.entries,
      'function',
      'creates a expense entry relationship for the expense model'
    );

    setupTests.type(
      activity.apdActivityExpenseEntry.expense,
      'function',
      'creates an expense relationship for the expense entry model'
    );
  });

  activityModelTests.test(
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

  activityModelTests.test(
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

  activityModelTests.test(
    'activity model sets up goals relationship',
    async apdTests => {
      const self = {
        belongsTo: sinon.stub().returns('frood')
      };

      const output = activity.apdActivityGoal.activity.bind(self)();

      apdTests.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to activity'
      );
      apdTests.equal(output, 'frood', 'returns the expected value');
    }
  );

  activityModelTests.test(
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

  activityModelTests.test(
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
            'invalid-name',
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
            'invalid-name',
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
              'invalid-name',
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
            'name-exists',
            'rejects with the expected message'
          );
        }
      });
    }
  );

  activityModelTests.test(
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

  activityModelTests.test(
    'activity model overrides toJSON method',
    async apdTests => {
      const self = {
        get: sinon.stub(),
        related: sinon.stub()
      };
      self.get.withArgs('id').returns('eye-dee');
      self.get.withArgs('name').returns('Jerome Lee');
      self.get.withArgs('description').returns('cool CMS person');

      self.related.withArgs('goals').returns('goooooaaaaals');
      self.related.withArgs('approaches').returns('quietly from the left');

      const output = activity.apdActivity.toJSON.bind(self)();

      apdTests.match(
        output,
        {
          id: 'eye-dee',
          name: 'Jerome Lee',
          description: 'cool CMS person',
          goals: 'goooooaaaaals',
          approaches: 'quietly from the left'
        },
        'gives us back the right JSON-ified object'
      );
    }
  );

  activityModelTests.test(
    'goal model sets up activity relationship',
    async apdTests => {
      const self = {
        belongsTo: sinon.stub().returns('frood')
      };

      const output = activity.apdActivityGoal.activity.bind(self)();

      apdTests.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to activity'
      );
      apdTests.equal(output, 'frood', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'goal model sets up objectives relationship',
    async apdTests => {
      const self = {
        hasMany: sinon.stub().returns('flippity')
      };

      const output = activity.apdActivityGoal.objectives.bind(self)();

      apdTests.ok(
        self.hasMany.calledWith('apdActivityGoalObjective'),
        'sets up the relationship mapping to objectives'
      );
      apdTests.equal(output, 'flippity', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'goal model overrides toJSON method',
    async apdTests => {
      const self = {
        get: sinon
          .stub()
          .withArgs('description')
          .returns('to eat a whole bucket of ice cream in one sitting'),
        related: sinon
          .stub()
          .withArgs('objectives')
          .returns('twenty-seven')
      };

      const output = activity.apdActivityGoal.toJSON.bind(self)();

      apdTests.match(
        output,
        {
          description: 'to eat a whole bucket of ice cream in one sitting',
          objectives: 'twenty-seven'
        },
        'gives us back the right JSON-ified object'
      );
    }
  );

  activityModelTests.test(
    'objective model sets up goal relationship',
    async apdTests => {
      const self = {
        belongsTo: sinon.stub().returns('floppity')
      };

      const output = activity.apdActivityGoalObjective.goal.bind(self)();

      apdTests.ok(
        self.belongsTo.calledWith('apdActivityGoal'),
        'sets up the relationship mapping to goal'
      );
      apdTests.equal(output, 'floppity', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'objective model overrides toJSON method',
    async apdTests => {
      const self = {
        get: sinon
          .stub()
          .withArgs('description')
          .returns('solar flares are deadly')
      };

      const output = activity.apdActivityGoalObjective.toJSON.bind(self)();

      apdTests.equal(
        output,
        'solar flares are deadly',
        'gives us back the right JSON-ified object'
      );
    }
  );

  activityModelTests.test(
    'approach model sets up activity relationship',
    async apdTests => {
      const self = {
        belongsTo: sinon.stub().returns('hutch')
      };

      const output = activity.apdActivityApproach.activity.bind(self)();

      apdTests.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to activity'
      );
      apdTests.equal(output, 'hutch', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'expense model sets up activity relationship',
    async apdTests => {
      const self = {
        belongsTo: sinon.stub().returns('frood')
      };

      const output = activity.apdActivityExpense.activity.bind(self)();
      apdTests.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to activity'
      );
      apdTests.equal(output, 'frood', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'approach model overrides toJSON method',
    async apdTests => {
      const self = {
        get: sinon.stub()
      };

      self.get.withArgs('description').returns('going to Mars is the future');
      self.get.withArgs('alternatives').returns('staying on Earth forever');
      self.get.withArgs('explanation').returns('Mars is probably cool');

      const output = activity.apdActivityApproach.toJSON.bind(self)();

      apdTests.match(
        output,
        {
          description: 'going to Mars is the future',
          alternatives: 'staying on Earth forever',
          explanation: 'Mars is probably cool'
        },
        'gives us back the right JSON-ified object'
      );
    }
  );

  activityModelTests.test(
    'expense model sets up entries relationship',
    async apdTests => {
      const self = {
        hasMany: sinon.stub().returns('flippity')
      };

      const output = activity.apdActivityExpense.entries.bind(self)();

      apdTests.ok(
        self.hasMany.calledWith('apdActivityExpenseEntry'),
        'sets up the relationship mapping to entries'
      );
      apdTests.equal(output, 'flippity', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'expense model overrides toJSON method',
    async apdTests => {
      const self = {
        get: sinon.stub(),
        related: sinon
          .stub()
          .withArgs('entries')
          .returns('$$$')
      };
      self.get.withArgs('id').returns(1);
      self.get.withArgs('name').returns('paperclips');

      const output = activity.apdActivityExpense.toJSON.bind(self)();

      apdTests.match(
        output,
        {
          id: 1,
          name: 'paperclips',
          entries: '$$$'
        },
        'gives us back the right JSON-ified object'
      );
    }
  );

  activityModelTests.test(
    'expense entry model sets up expense relationship',
    async apdTests => {
      const self = {
        belongsTo: sinon.stub().returns('frood')
      };

      const output = activity.apdActivityExpenseEntry.expense.bind(self)();

      apdTests.ok(
        self.belongsTo.calledWith('apdActivityExpense'),
        'sets up the relationship mapping to expense'
      );
      apdTests.equal(output, 'frood', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'expense entry model overrides toJSON method',
    async apdTests => {
      const self = { get: sinon.stub() };
      self.get.withArgs('id').returns(1);
      self.get.withArgs('year').returns('2018');
      self.get.withArgs('amount').returns(1000000);
      self.get.withArgs('description').returns('need it');

      const output = activity.apdActivityExpenseEntry.toJSON.bind(self)();

      apdTests.match(
        output,
        {
          id: 1,
          year: '2018',
          amount: 1000000,
          description: 'need it'
        },
        'gives us back the right JSON-ified object'
      );
    }
  );

  activityModelTests.test('activity schedule model', async scheduleTests => {
    scheduleTests.test('setup', async setupTests => {
      setupTests.type(
        activity.apdActivitySchedule.activity,
        'function',
        'creates an activity relationship for the schedule model'
      );
    });

    scheduleTests.test(
      'sets up activity relationship',
      async relationshipTest => {
        const self = {
          belongsTo: sinon.stub().returns('zaphod')
        };

        const output = activity.apdActivitySchedule.activity.bind(self)();

        relationshipTest.ok(
          self.belongsTo.calledWith('apdActivity'),
          'sets up the relationship mapping to activity'
        );
        relationshipTest.equal(output, 'zaphod', 'returns the expected value');
      }
    );

    scheduleTests.test('overrides toJSON method', async jsonTests => {
      const self = { get: sinon.stub() };
      self.get.withArgs('id').returns('zaphod');
      self.get.withArgs('actual_end').returns('beeblebrox');
      self.get.withArgs('actual_start').returns('is');
      self.get.withArgs('milestone').returns('one');
      self.get.withArgs('planned_end').returns('real');
      self.get.withArgs('planned_start').returns('cool');
      self.get.withArgs('status').returns('frood');

      const output = activity.apdActivitySchedule.toJSON.bind(self)();

      jsonTests.match(output, {
        actualEnd: 'beeblebrox',
        actualStart: 'is',
        milestone: 'one',
        plannedEnd: 'real',
        plannedStart: 'cool',
        status: 'frood'
      });
    });
  });
});
