const tap = require('tap');
const sinon = require('sinon');

const db = require('./index');

tap.test('database layer index', async dbTests => {
  dbTests.test('the ORM is setup correctly', async ormTests => {
    const knexObject = {};
    const bookshelfObject = {
      plugin: sinon.spy(),
      model: sinon.stub()
    };

    bookshelfObject.model.withArgs('one').returns(1);
    bookshelfObject.model.withArgs('two').returns(2);
    bookshelfObject.model.withArgs('three').returns(3);

    const knex = sinon.stub().returns(knexObject);
    const bookshelf = sinon.stub().returns(bookshelfObject);
    const config = { test: {} };

    const baseModel = { extend: sinon.stub() };
    const baseConstructor = sinon.stub().returns(baseModel);
    baseModel.extend
      .withArgs({ name: 'modelDefinitionOne', static: { props: 'are here' } })
      .returns(1);
    baseModel.extend.withArgs('modelDefinitionTwo').returns(2);
    baseModel.extend.withArgs('modelDefinitionThree').returns(3);

    const models = [
      { one: { name: 'modelDefinitionOne', static: { props: 'are here' } } },
      { two: 'modelDefinitionTwo', three: 'modelDefinitionThree' }
    ];

    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';
    db.setup(knex, bookshelf, config, baseConstructor, models);
    process.env.NODE_ENV = env;

    ormTests.ok(knex.calledWith(config.test), 'knex is configured');
    ormTests.ok(bookshelf.calledWith(knexObject), 'bookshelf is configured');
    ormTests.ok(
      bookshelfObject.plugin.calledWith('registry'),
      'bookshelf registry is enabled'
    );

    ormTests.ok(
      baseModel.extend.calledWith(
        { name: 'modelDefinitionOne', static: { props: 'are here' } },
        { props: 'are here', modelName: 'one' }
      ),
      'model object created from first model definition'
    );
    ormTests.ok(
      baseModel.extend.calledWith('modelDefinitionTwo', { modelName: 'two' }),
      'model object created from second model definition'
    );
    ormTests.ok(
      baseModel.extend.calledWith('modelDefinitionThree', {
        modelName: 'three'
      }),
      'model object created from third model definition'
    );

    ormTests.ok(
      bookshelfObject.model.calledWith('one', 1),
      'first model is registered in the registry'
    );
    ormTests.ok(
      bookshelfObject.model.calledWith('two', 2),
      'second model is registered in the registry'
    );
    ormTests.ok(
      bookshelfObject.model.calledWith('three', 3),
      'third model is registered in the registry'
    );

    ormTests.equal(db.models.one, 1, 'the db index exports the first model');
    ormTests.equal(db.models.two, 2, 'the db index exports the first model');
    ormTests.equal(db.models.three, 3, 'the db index exports the first model');
  });
});
