const tap = require('tap');
const sinon = require('sinon');

const db = require('./index');

tap.test('database layer index', async dbTests => {
  dbTests.test('the ORM is setup correctly', async ormTests => {
    const knexObject = {};
    const bookshelfObject = {};

    const knex = sinon.stub().returns(knexObject);
    const bookshelf = sinon.stub().returns(bookshelfObject);
    const config = { test: {} };
    const models = {
      one: sinon.stub().returns('one'),
      two: sinon.stub().returns('two')
    };

    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';
    db.setup(knex, bookshelf, config, models);
    process.env.NODE_ENV = env;

    ormTests.ok(knex.calledWith(config.test), 'knex is configured');
    ormTests.ok(bookshelf.calledWith(knexObject), 'bookshelf is configured');

    ormTests.ok(
      models.one.calledWith(bookshelfObject),
      'models are configured'
    );
    ormTests.ok(
      models.two.calledWith(bookshelfObject),
      'models are configured'
    );

    ormTests.equal(
      db.models.one,
      'one',
      'the db index exports the configured models'
    );
    ormTests.equal(
      db.models.two,
      'two',
      'the db index exports the configured models'
    );
  });
});
