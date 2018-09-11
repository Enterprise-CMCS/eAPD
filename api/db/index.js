const logger = require('../logger')('db index');
const defaultKnex = require('knex');
const defaultBookshelf = require('bookshelf');
const defaultConfig = require('../knexfile');

const defaultBase = require('./base');
const user = require('./user');
const authorization = require('./authorization');
const state = require('./state');
const apd = require('./apd');
const apdIncentivePayment = require('./apdIncentivePayment');
const apdKeyPersonnel = require('./apdKeyPersonnel');
const apdVersion = require('./apdVersion');
const previousActivityExpense = require('./apdPreviousActivityExpense');
const apdActivity = require('./activity');
const file = require('./file');

const exportedModels = {};

let knexObject;

const setup = (
  knex = defaultKnex,
  bookshelf = defaultBookshelf,
  config = defaultConfig,
  baseModel = defaultBase,
  models = [
    user(),
    authorization(),
    state(),
    apd(),
    apdIncentivePayment(),
    apdKeyPersonnel(),
    apdVersion(),
    previousActivityExpense(),
    apdActivity(),
    file()
  ]
) => {
  logger.silly(
    `setting up models using [${process.env.NODE_ENV}] configuration`
  );
  knexObject = knex(config[process.env.NODE_ENV]);

  // Get bookshelf instance with our knex config, then
  // load the "registry" plugin - lets us map model
  // names to actual models to get rid of ciruclar
  // dependency graphs
  const orm = bookshelf(knexObject);
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
  models: exportedModels,
  raw: (...args) => (knexObject ? knexObject(...args) : null),
  setup
};
