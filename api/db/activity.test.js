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
        apdActivityCostAllocation: { tableName: 'activity_cost_allocations' },
        apdActivityExpense: { tableName: 'activity_expenses' },
        apdActivityExpenseEntry: { tableName: 'activity_expense_entries' }
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
      activity.apdActivity.costAllocations,
      'function',
      'creates a cost allocation relationship for the activity model'
    );

    setupTests.type(
      activity.apdActivity.expenses,
      'function',
      'creates a expenses relationship for the activity model'
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
      activity.apdActivityCostAllocation.activity,
      'function',
      'creates a activity relationship for the cost allocation model'
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
});
