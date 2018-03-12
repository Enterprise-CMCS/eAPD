const isEqual = require('lodash.isequal');

const logger = require('../logger')('db state model');

module.exports = () => ({
  state: {
    tableName: 'states',

    apds() {
      return this.hasMany('apd');
    },

    async validate(model = this) {
      logger.silly('validating state data model');

      if (model.hasChanged('medicaid_office')) {
        logger.silly('medicaid_office changed; making sure data shape is good');

        const office = model.attributes.medicaid_office;
        const hasProperFields = isEqual(Object.keys(office).sort(), [
          'address',
          'city',
          'zip'
        ]);

        if (!hasProperFields) {
          logger.verbose(`office is invalid [${office}]`);
          throw new Error('invalid-office');
        }

        logger.silly('office is valid');
      }

      logger.silly('model is valid!');
    }
  }
});
