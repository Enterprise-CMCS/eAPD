const defaultKnex = require('knex');
const defaultBookshelf = require('bookshelf');
const defaultConfig = require('../knexfile');

const user = require('./user');
const authorization = require('./authorization');

const exportedModels = {};

const setup = (
  knex = defaultKnex,
  bookshelf = defaultBookshelf,
  config = defaultConfig,
  models = [user, authorization]
) => {
  const db = knex(config[process.env.NODE_ENV]);

  const orm = bookshelf(db);
  orm.plugin('registry');

  models.forEach(modelObjects => {
    Object.keys(modelObjects).forEach(modelName => {
      const model = orm.Model.extend(modelObjects[modelName]);
      orm.model(modelName, model);
      exportedModels[modelName] = model;
    });
  });
};

module.exports = {
  setup,
  models: exportedModels
};
