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
          updateableFields: ['hie', 'hit', 'mmis', 'year']
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
        stateApproved: 4,
        someJunk: 'goes away'
      },
      hit: {
        federalActual: 10,
        federalApproved: 20,
        stateActual: 30,
        stateApproved: 40,
        thisWillNot: 'survive'
      },
      mmis: {
        federal90Actual: 100,
        federal90Approved: 200,
        state10Actual: 300,
        state10Approved: 400,
        federal75Actual: 500,
        federal75Approved: 600,
        state25Actual: 700,
        state25Approved: 800,
        federal50Actual: 900,
        federal50Approved: 901,
        state50Actual: 902,
        state50Approved: 903,
        this: 'neither'
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
      hit_state_approved: 40,
      mmis_federal90_actual: 100,
      mmis_federal90_approved: 200,
      mmis_state10_actual: 300,
      mmis_state10_approved: 400,
      mmis_federal75_actual: 500,
      mmis_federal75_approved: 600,
      mmis_state25_actual: 700,
      mmis_state25_approved: 800,
      mmis_federal50_actual: 900,
      mmis_federal50_approved: 901,
      mmis_state50_actual: 902,
      mmis_state50_approved: 903
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
    self.get.withArgs('mmis_federal90_actual').returns('10');
    self.get.withArgs('mmis_federal90_approved').returns('20');
    self.get.withArgs('mmis_state10_actual').returns('30');
    self.get.withArgs('mmis_state10_approved').returns('40');
    self.get.withArgs('mmis_federal75_actual').returns('50');
    self.get.withArgs('mmis_federal75_approved').returns('60');
    self.get.withArgs('mmis_state25_actual').returns('70');
    self.get.withArgs('mmis_state25_approved').returns('80');
    self.get.withArgs('mmis_federal50_actual').returns('90');
    self.get.withArgs('mmis_federal50_approved').returns('91');
    self.get.withArgs('mmis_state50_actual').returns('92');
    self.get.withArgs('mmis_state50_approved').returns('93');
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
      mmis: {
        federal90Actual: 10,
        federal90Approved: 20,
        state10Actual: 30,
        state10Approved: 40,
        federal75Actual: 50,
        federal75Approved: 60,
        state25Actual: 70,
        state25Approved: 80,
        federal50Actual: 90,
        federal50Approved: 91,
        state50Actual: 92,
        state50Approved: 93
      },
      year: 'year'
    });
  });
});
