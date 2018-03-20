const tap = require('tap');
const sinon = require('sinon');

const expense = require('./expense')();

tap.test('expense data model', async expenseModelTests => {
  expenseModelTests.test('setup', async setupTests => {
    setupTests.match(
      expense,
      { expense: { tableName: 'expenses' } },
      'get the expected model definitions'
    );

    setupTests.type(
      expense.expense.entries,
      'function',
      'creates an activity expenses relationship for the expense model'
    );
  });

  expenseModelTests.test(
    'expense model sets up activity expenses relationship',
    async activitiesTests => {
      const self = {
        hasMany: sinon.stub().returns('florp')
      };

      const output = expense.expense.entries.bind(self)();

      activitiesTests.ok(
        self.hasMany.calledWith('apdActivityExpense'),
        'sets up the relationship mapping to activity expenses'
      );
      activitiesTests.equal(output, 'florp', 'returns the expected value');
    }
  );
});
