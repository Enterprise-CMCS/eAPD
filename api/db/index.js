const logger = require('../logger')('db index');
const defaultKnex = require('knex');
const defaultBookshelf = require('bookshelf');
const defaultConfig = require('../knexfile');

const defaultBase = require('./base');
const user = require('./user');
const authorization = require('./authorization');
const state = require('./state');
const apd = require('./apd');
const apdActivity = require('./activity');

const exportedModels = {};

const setup = (
  knex = defaultKnex,
  bookshelf = defaultBookshelf,
  config = defaultConfig,
  baseModel = defaultBase,
  models = [user(), authorization(), state(), apd(), apdActivity()]
) => {
  logger.silly(
    `setting up models using [${process.env.NODE_ENV}] configuration`
  );
  const db = knex(config[process.env.NODE_ENV]);

  // Get bookshelf instance with our knex config, then
  // load the "registry" plugin - lets us map model
  // names to actual models to get rid of ciruclar
  // dependency graphs
  const orm = bookshelf(db);
  orm.plugin('registry');

  const BaseModel = baseModel(orm, exportedModels);

  models.forEach(modelObjects => {
    // The models come to us as objects whose keys are
    // the model names and values are the model
    // descriptors.
    Object.keys(modelObjects).forEach(modelName => {
      logger.silly(`loading model [${modelName}]`);

      const modelObj = modelObjects[modelName];

      // Apply some properties to the model statically
      // so we can query them without needing an instance;
      // models can also define their own static props
      let staticProps = { modelName };
      if (modelObj.static) {
        staticProps = { ...modelObj.static, ...staticProps };
      }

      const model = BaseModel.extend(modelObjects[modelName], staticProps);
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
