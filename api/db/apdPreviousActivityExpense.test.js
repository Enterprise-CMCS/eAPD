const tap = require('tap');
const sinon = require('sinon');

const {
  apdPreviousActivityExpense: expense
} = require('./apdPreviousActivityExpense')();

tap.test('apd previous activity expense data model', async tests => {
  tests.test('setup', async test => {
    test.match(
      expense,
      {
        tableName: 'apd_previous_activity_expenses',
        apd: Function,
        format: Function,
        toJSON: Function,
        static: {
          updateableFields: ['hithie', 'mmis', 'year']
        }
      },
      'get the expected model definitions'
    );
  });

  tests.test('sets up apd relationship', async test => {
    const self = {
      belongsTo: sinon.stub().returns('baz')
    };

    const output = expense.apd.bind(self)();

    test.ok(
      self.belongsTo.calledWith('apd'),
      'sets up the relationship mapping to an apd'
    );
    test.equal(output, 'baz', 'returns the expected value');
  });

  tests.test('formats data into database columns', async test => {
    const attributes = {
      year: 1066,
      apd_id: 'bob',
      hithie: {
        federalActual: 1,
        totalApproved: 2,
        someJunk: 'goes away'
      },
      mmis: {
        '90': {
          federalActual: 10,
          totalApproved: 20
        },
        '75': {
          federalActual: 100,
          totalApproved: 200
        },
        '50': {
          federalActual: 1000,
          totalApproved: 2000
        },
        this: 'neither'
      },
      otherStuff: 'deleted'
    };

    const output = expense.format(attributes);

    test.same(output, {
      year: 1066,
      apd_id: 'bob',
      hithie_federal_actual: 1,
      hithie_total_approved: 2,
      mmis90_federal_actual: 10,
      mmis90_total_approved: 20,
      mmis75_federal_actual: 100,
      mmis75_total_approved: 200,
      mmis50_federal_actual: 1000,
      mmis50_total_approved: 2000
    });
  });

  tests.test('overrides toJSON method', async test => {
    const self = { get: sinon.stub(), related: sinon.stub() };
    self.get.returns('--- unknown field ---');
    self.get.withArgs('hithie_federal_actual').returns('100');
    self.get.withArgs('hithie_total_approved').returns('200');
    self.get.withArgs('mmis90_federal_actual').returns('300');
    self.get.withArgs('mmis90_total_approved').returns('400');
    self.get.withArgs('mmis75_federal_actual').returns('1000');
    self.get.withArgs('mmis75_total_approved').returns('2000');
    self.get.withArgs('mmis50_federal_actual').returns('3000');
    self.get.withArgs('mmis50_total_approved').returns('4000');
    self.get.withArgs('year').returns('year');

    const output = expense.toJSON.bind(self)();

    test.same(output, {
      hithie: { federalActual: 100, totalApproved: 200 },
      mmis: {
        90: { federalActual: 300, totalApproved: 400 },
        75: { federalActual: 1000, totalApproved: 2000 },
        50: { federalActual: 3000, totalApproved: 4000 }
      },
      year: 'year'
    });
  });
});
