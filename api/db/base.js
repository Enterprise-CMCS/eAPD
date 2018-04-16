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

const defaultSyncChildren = async (
  // The raw data that was sent into the parent, from which child
  // objects will be synchronized
  data,
  // Objects mapping data fields to child data models.  The keys
  // this object are expected field names on the raw data, while
  // the values are the corresponding model names.
  childModels,
  // An object describing all known models.  Keys are model names,
  // values are model objects.
  allModels,
  // An object describing how to relate children back to the parent.
  // Should be something that can be passed to where, and used to
  // populate new objects.  E.g., { apd_id: 7 }
  foreignKey,
  // Transaction object, if this is being executed in a transaction
  // (and in this base model, it always is, so 🤷‍♂️)
  transacting,
  // The name of the parent model.  Only used for logging.
  modelName
) =>
  Promise.all(
    Object.keys(childModels).map(async fieldName => {
      if (!data[fieldName]) {
        return true;
      }

      logger.silly(
        `${modelName} | synchornize ${fieldName} with ${
          childModels[fieldName]
        } model`
      );
      const Model = allModels[childModels[fieldName]];
      return Model.synchronize(data[fieldName], foreignKey, transacting);
    })
  );

// These properties are added to model instances.
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

    // Because we're overwriting destroy for all models based on our
    // base class, be defensive about these custom properties.
    const childModels = (this.static || {}).owns || {};

    await Promise.all(
      // The values on this object are the names of the models that
      // this object has a "has many" relationship with.
      Object.values(childModels).map(async model => {
        // Limit our search to the objects with a foreign key relating
        // to this object.
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
        // save() takes up to 4 arguments.  The last one is "options",
        // and it's the one that contains the transacting property.
        // We should pass that along to validators in case they need
        // to run any queries - they should do it within the transaction.
        await this.validate(args[args.length - 1] || {});
      } catch (e) {
        logger.error(`${this.modelName()} | validation error`);
        logger.error(null, e);
        throw new ValidationError(e.message);
      }
    }
    logger.silly(`${this.modelName()} | saving`);
    return orm.Model.prototype.save.apply(this, args);
  },

  async synchronize(rawData, syncChildren = defaultSyncChildren) {
    logger.silly(`${this.modelName()} | synchronizing instance`);
    logger.silly(null, rawData);

    const newData = this.pickUpdateable(rawData);

    await orm.transaction(async transacting => {
      logger.silly(`${this.modelName()} | synchronizing children`);

      // Be defenseive!
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

// These proeprties are added to model classes.
const classExtension = (orm, models) => ({
  pickUpdateable(raw) {
    return pick(raw, this.updateableFields);
  },

  models,

  async synchronize(
    rawData,
    // parentID defines how to relate this model to its parent,
    // something like: { apd_id: 7 }
    parentID = {},
    transacting,
    syncChildren = defaultSyncChildren
  ) {
    logger.silly(`${this.modelName} | synchronizing all`);
    logger.silly(null, parentID);
    logger.silly(null, rawData);

    const dataArray = Array.isArray(rawData) ? rawData : [rawData];

    // Anything defined in the model metadata under the "static"
    // property ends up getting attached directly to the model
    // class.  "this" is a reference to a model class, so we
    // don't have to access things through the "static" proeprty.
    const childModels = this.owns || {};

    const all = await this.where(parentID).fetchAll({ transacting });

    // Delete any models that belong to the parent and are not
    // represented in the new sync data.  This cascades and
    // deletes children as well.
    const ids = dataArray.filter(d => d.id).map(d => +d.id);
    const deleting = all
      .filter(row => !ids.includes(row.get('id')))
      .map(row => row.destroy({ transacting }));

    // Wait for deletions before proceeding.  This is because in some
    // cases, uniqueness checks can fail otherwise.  For example, if
    // I'm adding a new activity named "Bob" and also deleting an
    // existing activity named "Bob", it should succeed; however, if
    // the existing activity is not deleted first, validation on the
    // new activity will fail.  So...  let's just wait.
    await Promise.all(deleting);

    // TODO [GW] Should we add an "order" to all of the tables that
    // represent lists in their parent tables?  Instead of relying
    // on IDs.  Currently there's no way to re-order things except
    // to delete and re-add them in the order you want them.  It
    // would be pretty trivial to dynamically add an "order" property
    // based on an item's array index here, and then make all of those
    // things automatically sort by order on fetch.

    const saving = [];
    const synchronizing = dataArray.filter(d => d.id).map(async raw => {
      const existing = all.find(row => row.get('id') === raw.id);
      if (existing) {
        logger.silly(`${this.modelName} | updating id=${raw.id}`);

        existing.set(this.pickUpdateable(raw));
        saving.push(existing.save(null, { transacting }));

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
    dataArray.filter(d => !d.id).map(async raw => {
      // Chain these promises so they execute in the same
      // order as the array.  This way the IDs are also in
      // order, and we can sort things by ID.
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

    // Wait for the updates, inserts, and child
    // synchronizations to finish, then we're done.
    await Promise.all(saving);
    await inserting;
    await Promise.all(synchronizing);
  }
});

module.exports = (orm, models) =>
  orm.Model.extend(instanceExtension(orm, models), classExtension(orm, models));

// Expose for testing
module.exports.defaultSyncChildren = defaultSyncChildren;
