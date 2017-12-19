const tap = require('tap');
const sinon = require('sinon');

const db = require('../db');

tap.test('database object module', (dbTest) => {
  const knex = sinon.stub().returns({
    thisIs: 'a database'
  });

  const nodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'env2';
  const result = db(knex, { env1: 'environemtn 1', env2: 'environment 2' });

  dbTest.ok(knex.calledOnce, 'knex is configured');
  dbTest.ok(knex.calledWith('environment 2'), 'knex is configured with the passed value');
  dbTest.same(result, { thisIs: 'a database' }, 'returns the expected object based on env');

  process.env.NODE_ENV = nodeEnv;
  dbTest.done();
});
