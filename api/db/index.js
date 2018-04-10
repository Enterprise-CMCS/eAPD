const logger = require('../logger')('db index');
const defaultKnex = require('knex');
const defaultBookshelf = require('bookshelf');
const pick = require('lodash.pick');
const defaultConfig = require('../knexfile');

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
  models = [user(), authorization(), state(), apd(), apdActivity()]
) => {
  logger.silly(
    `setting up models using [${process.env.NODE_ENV}] configuration`
  );
  const db = knex(config[process.env.NODE_ENV]);

  const orm = bookshelf(db);
  orm.plugin('registry');

  const BaseModel = orm.Model.extend(
    {
      pickUpdateable(raw) {
        return pick(raw, this.modelName);
      },

      models: exportedModels,

      async validate() {
        return true;
      },

      async save(...args) {
        await this.validate();
        await orm.Model.prototype.save.apply(this, ...args);
      },

      async update(rawData) {
        const newData = this.pickUpdateable(rawData);

        await orm.transaction(async transaction => {
          this.set(newData);
          await this.save({ transacting: transaction });

          const childModels = this.static.owns;
          await Promise.all(
            Object.keys(childModels).map(async fieldName => {
              if (rawData[fieldName]) {
                const Model = this.models[childModels[fieldName]];
                return Model.synchronize(
                  rawData[fieldName],
                  {
                    [this.static.foreignKey]: this.get('id')
                  },
                  transaction
                );
              }
              return true;
            })
          );
        });
      }
    },
    {
      pickUpdateable(raw) {
        return pick(raw, this.updateableFields);
      },

      models: exportedModels,

      async synchronize(rawData, parentID = {}, transaction) {
        const dataArray = Array.isArray(rawData) ? rawData : [rawData];
        const childModels = this.owns || {};

        const updating = dataArray.filter(d => d.id).map(async raw => {
          const existing = await this.where({
            id: raw.id,
            ...parentID
          }).fetch();
          if (existing) {
            existing.set(this.pickUpdateable(raw));
            existing.save({ transacting: transaction });

            return Promise.all(
              Object.keys(childModels).map(async fieldName => {
                if (raw[fieldName]) {
                  const Model = this.models[childModels[fieldName]];
                  return Model.synchronize(
                    raw[fieldName],
                    {
                      [this.foreignKey]: existing.get('id')
                    },
                    transaction
                  );
                }
                return true;
              })
            );
          }
          return false;
        });

        let inserting = Promise.resolve();
        const synchronizing = [];
        dataArray.filter(d => !d.id).map(async raw => {
          inserting = inserting.then(async () => {
            const insert = this.forge({
              ...this.pickUpdateable(raw),
              ...parentID
            });
            await insert.save({ transacting: transaction });
            raw.id = insert.get('id');

            synchronizing.push(
              Promise.all(
                Object.keys(childModels).map(async fieldName => {
                  if (raw[fieldName]) {
                    const Model = this.models[childModels[fieldName]];
                    return Model.synchronize(
                      raw[fieldName],
                      {
                        [this.foreignKey]: insert.get('id')
                      },
                      transaction
                    );
                  }
                  return true;
                })
              )
            );
          });
        });

        await Promise.all(updating);
        await inserting;
        await Promise.all(synchronizing);

        const ids = dataArray.map(d => +d.id);
        const all = await this.fetchAll();
        await Promise.all(
          all
            .filter(row => !ids.includes(row.get('id')))
            .map(row => row.destroy())
        );
      }
    }
  );

  models.forEach(modelObjects => {
    Object.keys(modelObjects).forEach(modelName => {
      logger.silly(`loading model [${modelName}]`);

      const modelObj = modelObjects[modelName];
      let staticProps = { modelName };
      if (modelObj.static) {
        staticProps = { modelName, ...modelObj.static };
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
