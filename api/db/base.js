const logger = require('../logger')('db base model');

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

// These properties are added to model instances.
const instanceExtension = (orm, models) => ({
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
  }
});

// These proeprties are added to model classes.
const classExtension = (orm, models) => ({
  models
});

module.exports = (orm, models) =>
  orm.Model.extend(instanceExtension(orm, models), classExtension(orm, models));
