const logger = require('../logger')('db user model');

module.exports = {
  user: {
    tableName: 'users',

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
    }
  }
};
