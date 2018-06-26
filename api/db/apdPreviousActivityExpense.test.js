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
          updateableFields: ['hie', 'hit', 'year']
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
      hie: {
        federalActual: 1,
        federalApproved: 2,
        stateActual: 3,
        stateApproved: 4
      },
      hit: {
        federalActual: 10,
        federalApproved: 20,
        stateActual: 30,
        stateApproved: 40
      },
      otherStuff: 'deleted'
    };

    const output = expense.format(attributes);

    test.same(output, {
      year: 1066,
      apd_id: 'bob',
      hie_federal_actual: 1,
      hie_federal_approved: 2,
      hie_state_actual: 3,
      hie_state_approved: 4,
      hit_federal_actual: 10,
      hit_federal_approved: 20,
      hit_state_actual: 30,
      hit_state_approved: 40
    });
  });

  tests.test('overrides toJSON method', async test => {
    const self = { get: sinon.stub(), related: sinon.stub() };
    self.get.returns('--- unknown field ---');
    self.get.withArgs('hie_federal_actual').returns('100');
    self.get.withArgs('hie_federal_approved').returns('200');
    self.get.withArgs('hie_state_actual').returns('300');
    self.get.withArgs('hie_state_approved').returns('400');
    self.get.withArgs('hit_federal_actual').returns('1000');
    self.get.withArgs('hit_federal_approved').returns('2000');
    self.get.withArgs('hit_state_actual').returns('3000');
    self.get.withArgs('hit_state_approved').returns('4000');
    self.get.withArgs('year').returns('year');

    const output = expense.toJSON.bind(self)();

    test.same(output, {
      hie: {
        federalActual: 100,
        federalApproved: 200,
        stateActual: 300,
        stateApproved: 400
      },
      hit: {
        federalActual: 1000,
        federalApproved: 2000,
        stateActual: 3000,
        stateApproved: 4000
      },
      year: 'year'
    });
  });
});
