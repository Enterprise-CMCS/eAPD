const tap = require('tap');
const sinon = require('sinon');

const { apdIncentivePayment: incentive } = require('./apdIncentivePayment')();

tap.test('apd incentive payments data model', async tests => {
  tests.test('setup', async test => {
    test.match(
      incentive,
      {
        tableName: 'apd_incentive_payments',
        apd: Function,
        format: Function,
        toJSON: Function,
        static: {
          updateableFields: ['q1', 'q2', 'q3', 'q4', 'year']
        }
      },
      'get the expected model definitions'
    );
  });

  tests.test('sets up apd relationship', async test => {
    const self = {
      belongsTo: sinon.stub().returns('baz')
    };

    const output = incentive.apd.bind(self)();

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
      q1: {
        ehPayment: 1,
        ehCount: 2,
        epPayment: 3,
        epCount: 4
      },
      q2: {
        ehPayment: 10,
        ehCount: 20,
        epPayment: 30,
        epCount: 40
      },
      q3: {
        ehPayment: 100,
        ehCount: 200,
        epPayment: 300,
        epCount: 400
      },
      q4: {
        ehPayment: 1000,
        ehCount: 2000,
        epPayment: 3000,
        epCount: 4000
      },
      otherStuff: 'deleted'
    };

    const output = incentive.format(attributes);

    test.same(output, {
      year: 1066,
      apd_id: 'bob',
      q1_eh_payment: 1,
      q1_eh_count: 2,
      q1_ep_payment: 3,
      q1_ep_count: 4,
      q2_eh_payment: 10,
      q2_eh_count: 20,
      q2_ep_payment: 30,
      q2_ep_count: 40,
      q3_eh_payment: 100,
      q3_eh_count: 200,
      q3_ep_payment: 300,
      q3_ep_count: 400,
      q4_eh_payment: 1000,
      q4_eh_count: 2000,
      q4_ep_payment: 3000,
      q4_ep_count: 4000
    });
  });

  tests.test('overrides toJSON method', async test => {
    const self = { get: sinon.stub(), related: sinon.stub() };
    self.get.returns('--- unknown field ---');
    self.get.withArgs('q1_eh_payment').returns('1');
    self.get.withArgs('q1_eh_count').returns(2);
    self.get.withArgs('q1_ep_payment').returns('3');
    self.get.withArgs('q1_ep_count').returns(4);
    self.get.withArgs('q2_eh_payment').returns('10');
    self.get.withArgs('q2_eh_count').returns(20);
    self.get.withArgs('q2_ep_payment').returns('30');
    self.get.withArgs('q2_ep_count').returns(40);
    self.get.withArgs('q3_eh_payment').returns('100');
    self.get.withArgs('q3_eh_count').returns(200);
    self.get.withArgs('q3_ep_payment').returns('300');
    self.get.withArgs('q3_ep_count').returns(400);
    self.get.withArgs('q4_eh_payment').returns('1000');
    self.get.withArgs('q4_eh_count').returns(2000);
    self.get.withArgs('q4_ep_payment').returns('3000');
    self.get.withArgs('q4_ep_count').returns(4000);
    self.get.withArgs('year').returns('year');

    const output = incentive.toJSON.bind(self)();

    test.same(output, {
      q1: {
        ehPayment: 1,
        ehCount: 2,
        epPayment: 3,
        epCount: 4
      },
      q2: {
        ehPayment: 10,
        ehCount: 20,
        epPayment: 30,
        epCount: 40
      },
      q3: {
        ehPayment: 100,
        ehCount: 200,
        epPayment: 300,
        epCount: 400
      },
      q4: {
        ehPayment: 1000,
        ehCount: 2000,
        epPayment: 3000,
        epCount: 4000
      },
      year: 'year'
    });
  });
});
