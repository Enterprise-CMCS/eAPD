const tap = require('tap');
const sinon = require('sinon');

const db = require('../db');

tap.test('database object module', (dbTest) => {
  const knex = sinon.stub().returns({
    env1: 'environment 1',
    env2: 'environment 2'
  });

  process.env.NODE_ENV = 'env2';
  const result = db(knex, { config: true });

  dbTest.ok(knex.calledOnce, 'knex is configured');
  dbTest.ok(knex.calledWith({ config: true }), 'knex is configured with the passed value');
  dbTest.same(result, 'environment 2', 'returns the expected object based on env');

  dbTest.done();
});
