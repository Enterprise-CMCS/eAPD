const logger = require('../logger')('db user model');

module.exports = {
  user: {
    tableName: 'users',

    initialize() {
      this.on('saving', this.validate);
    },

    role() {
      return this.hasOne('role', 'name', 'auth_role');
    },

    async activities() {
      logger.silly('getting user activities');
      if (!this.relations.role || !this.relations.role.activities) {
        logger.silly('user activities are not loaded yet... loading them');
        await this.load('role.activities');
      }

      return this.related('role')
        .related('activities')
        .pluck('name');
    },

    validate(model) {
      console.log('validation:');
      console.log(model.attributes);
      console.log(model.hasChanged('email'));
    },

    format(attributes) {
      const out = { ...attributes };

      if (out.phone) {
        // Remove non-number characters
        out.phone = out.phone.replace(/[^\d]/g, '');

        // If the phone number is 11 digits and begins with a 1,
        // just strip off the leading 1, it's probably a country
        // code and we don't need it since all US states and
        // territories use the same country code.
        if (out.phone.length === 11 && out.phone.startsWith('1')) {
          out.phone = out.phone.substr(1);
        }
      }

      return out;
    }
  }
};
