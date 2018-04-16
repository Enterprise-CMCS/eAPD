const tap = require('tap');
const sinon = require('sinon');

const expense = require('./expense').apdActivityExpense;

tap.test('expense data model', async expenseModelTests => {
  expenseModelTests.test('setup', async setupTests => {
    setupTests.match(
      expense,
      {
        tableName: 'activity_expenses',
        static: {
          updateableFields: ['name'],
          owns: { entries: 'apdActivityExpenseEntry' },
          foreignKey: 'expense_id'
        }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      expense.activity,
      'function',
      'creates an activity relationship'
    );

    setupTests.type(
      expense.entries,
      'function',
      'creates an expense entries relationship'
    );
  });

  expenseModelTests.test(
    'expense model sets up activity relationship',
    async relationTest => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = expense.activity.bind(self)();

      relationTest.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to an activity'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  expenseModelTests.test(
    'expense model sets up entries relationship',
    async relationTest => {
      const self = {
        hasMany: sinon.stub().returns('baz')
      };

      const output = expense.entries.bind(self)();

      relationTest.ok(
        self.hasMany.calledWith('apdActivityExpenseEntry', 'expense_id'),
        'sets up the relationship mapping to entries'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  expenseModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub(), related: sinon.stub() };
    self.get.withArgs('id').returns('Jerome Lee');
    self.get.withArgs('name').returns('at');
    self.related.withArgs('entries').returns('CMS');

    const output = expense.toJSON.bind(self)();

    jsonTests.match(output, {
      id: 'Jerome Lee',
      name: 'at',
      entries: 'CMS'
    });
  });
});
