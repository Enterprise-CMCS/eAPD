const tap = require('tap');
const sinon = require('sinon');

const expenseEntry = require('./expenseEntry').apdActivityExpenseEntry;

tap.test('expense entry data model', async expenseEntryModelTests => {
  expenseEntryModelTests.test('setup', async setupTests => {
    setupTests.match(
      expenseEntry,
      {
        tableName: 'activity_expense_entries',
        static: {
          updateableFields: ['year', 'amount']
        }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      expenseEntry.expense,
      'function',
      'creates an expense relationship'
    );
  });

  expenseEntryModelTests.test(
    'expense entry model sets up expense relationship',
    async relationTest => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = expenseEntry.expense.bind(self)();

      relationTest.ok(
        self.belongsTo.calledWith('apdActivityExpense', 'expense_id'),
        'sets up the relationship mapping to an expense'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  expenseEntryModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub() };
    self.get.withArgs('id').returns('Sharks');
    self.get.withArgs('year').returns('drown');
    self.get.withArgs('amount').returns('if immobile');

    const output = expenseEntry.toJSON.bind(self)();

    jsonTests.match(output, {
      id: 'Sharks',
      year: 'drown',
      amount: 'if immobile'
    });
  });
});
