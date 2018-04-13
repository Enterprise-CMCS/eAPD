const logger = require('../logger')('db base model');
const pick = require('lodash.pick');

class ValidationError extends Error {
  constructor(message) {
    super(message);

    this.error = { error: message };
  }

  // eslint-disable-next-line class-methods-use-this
  get statusCode() {
    return 400;
  }
}

const syncChildren = async (
  data,
  childModels,
  allModels,
  foreignKey,
  transacting,
  modelName
) =>
  Promise.all(
    Object.keys(childModels).map(async fieldName => {
      if (data[fieldName]) {
        logger.silly(
          `${modelName} | synchornize ${fieldName} with ${
            childModels[fieldName]
          } model`
        );
        const Model = allModels[childModels[fieldName]];
        return Model.synchronize(data[fieldName], foreignKey, transacting);
      }
      return true;
    })
  );

const instanceExtension = (orm, models) => ({
  pickUpdateable(raw) {
    return pick(raw, this.static.updateableFields);
  },

  models,

  modelName() {
    return this.constructor.modelName;
  },

  async destroy(...args) {
    logger.silly(
      `${this.modelName()} | deleting, id=${this.get('id')}; recursive`
    );
    const childModels = (this.static || {}).owns || {};
    await Promise.all(
      Object.values(childModels).map(async model => {
        const children = await this.models[model]
          .where({ [this.static.foreignKey]: this.get('id') })
          .fetchAll(...args);
        return Promise.all(children.map(child => child.destroy(...args)));
      })
    );

    return orm.Model.prototype.destroy.apply(this, args);
  },

  async save(...args) {
    if (this.validate) {
      try {
        await this.validate(args[1] || {});
      } catch (e) {
        logger.error(`${this.modelName()} | validation error: ${e.message} | `);
        throw new ValidationError(e.message);
      }
    }
    logger.silly(`${this.modelName()} | saving`);
    return orm.Model.prototype.save.apply(this, args);
  },

  async synchronize(rawData) {
    logger.silly(`${this.modelName()} | synchronizing instance`);
    logger.silly(null, rawData);
    const newData = this.pickUpdateable(rawData);

    await orm.transaction(async transacting => {
      logger.silly(`${this.modelName()} | synchronizing children`);
      const childModels = (this.static || {}).owns || {};
      await syncChildren(
        rawData,
        childModels,
        this.models,
        {
          [this.static.foreignKey]: this.get('id')
        },
        transacting,
        this.modelName()
      );

      this.set(newData);
      await this.save(null, { transacting });
    });
  }
});

const classExtension = (orm, models) => ({
  pickUpdateable(raw) {
    return pick(raw, this.updateableFields);
  },

  models,

  async synchronize(rawData, parentID = {}, transacting) {
    logger.silly(`${this.modelName} | synchronizing all`);
    logger.silly(null, parentID);
    logger.silly(null, rawData);

    const dataArray = Array.isArray(rawData) ? rawData : [rawData];
    const childModels = this.owns || {};

    const ids = dataArray.filter(d => d.id).map(d => +d.id);
    const all = await this.where(parentID).fetchAll({ transacting });
    const deleting = all
      .filter(row => !ids.includes(row.get('id')))
      .map(row => row.destroy({ transacting }));

    await Promise.all(deleting);

    const needsSaving = [];
    const updating = dataArray.filter(d => d.id).map(async raw => {
      const existing = all.find(row => row.get('id'));
      if (existing) {
        logger.silly(`${this.modelName} | updating id=${raw.id}`);

        existing.set(this.pickUpdateable(raw));
        needsSaving.push(existing);

        return syncChildren(
          raw,
          childModels,
          this.models,
          { [this.foreignKey]: existing.get('id') },
          transacting,
          this.modelName
        );
      }
      return false;
    });

    let inserting = Promise.resolve();
    const synchronizing = [];
    dataArray.filter(d => !d.id).map(async raw => {
      inserting = inserting.then(async () => {
        logger.silly(`${this.modelName} | inserting new`);
        logger.silly(null, raw);

        const insert = this.forge({
          ...this.pickUpdateable(raw),
          ...parentID
        });
        await insert.save(null, { transacting });

        synchronizing.push(
          syncChildren(
            raw,
            childModels,
            this.models,
            { [this.foreignKey]: insert.get('id') },
            transacting,
            this.modelName
          )
        );
      });
    });

    await Promise.all(updating);
    await Promise.all(needsSaving.map(o => o.save(null, { transacting })));
    await inserting;
    await Promise.all(synchronizing);
  }
});

module.exports = (orm, models) =>
  orm.Model.extend(instanceExtension(orm, models), classExtension(orm, models));
