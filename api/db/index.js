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
  models = { user, authorization }
) => {
  const db = knex(config[process.env.NODE_ENV]);
  const orm = bookshelf(db);

  Object.keys(models).forEach(modelName => {
    exportedModels[modelName] = models[modelName](orm);
  });
};

module.exports = {
  setup,
  models: exportedModels
};
