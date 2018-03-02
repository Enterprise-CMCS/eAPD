const logger = require('../logger')('db index');
const defaultKnex = require('knex');
const defaultBookshelf = require('bookshelf');
const defaultConfig = require('../knexfile');

const user = require('./user');
const authorization = require('./authorization');
const state = require('./state');

const exportedModels = {};

const setup = (
  knex = defaultKnex,
  bookshelf = defaultBookshelf,
  config = defaultConfig,
  models = [user(), authorization(), state()]
) => {
  logger.silly(
    `setting up models using [${process.env.NODE_ENV}] configuration`
  );
  const db = knex(config[process.env.NODE_ENV]);

  const orm = bookshelf(db);
  orm.plugin('registry');

  models.forEach(modelObjects => {
    Object.keys(modelObjects).forEach(modelName => {
      logger.silly(`loading model [${modelName}]`);
      const model = orm.Model.extend(modelObjects[modelName]);
      logger.silly(`registering model [${modelName}]`);
      orm.model(modelName, model);
      exportedModels[modelName] = model;
    });
  });
};

module.exports = {
  setup,
  models: exportedModels
};
