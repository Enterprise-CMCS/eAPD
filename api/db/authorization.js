const logger = require('../logger')('db authorization model');

module.exports = () => ({
  activity: {
    tableName: 'auth_activities',
    roles() {
      return this.belongsToMany(
        'role',
        'auth_role_activity_mapping',
        'activity_id',
        'role_id'
      );
    }
  },

  role: {
    tableName: 'auth_roles',
    activities() {
      return this.belongsToMany(
        'activity',
        'auth_role_activity_mapping',
        'role_id',
        'activity_id'
      );
    },

    async getActivities() {
      logger.silly('getting role activities');
      if (!this.relations.activities) {
        logger.silly('role activities are not loaded yet... loading them');
        await this.load('activities');
      }

      return this.related('activities').pluck('name');
    },

    async validate({ transacting, activities = [] } = {}) {
      logger.silly('validating role model');
      const ActivityModel = this.related('activities').model;

      if (this.hasChanged('name')) {
        const name = this.attributes.name;

        if (typeof name !== 'string' || name.length < 1) {
          logger.verbose('name is not a string or is empty');
          throw new Error('missing-name');
        }

        if (await this.where({ name }).fetch()) {
          logger.verbose('another role already has this name');
          throw new Error('duplicate-name');
        }
      }
      logger.silly('role name is valid and unique');

      if (!Array.isArray(activities)) {
        logger.verbose('role activities is not an array');
        throw new Error('invalid-activities');
      }
      logger.silly('role activities is an array');

      if (activities.filter(id => typeof id !== 'number').length > 0) {
        logger.verbose('role activities are not all numbers');
        throw new Error('invalid-activities');
      }
      logger.silly('all role activities are numbers');

      const validActivities = await ActivityModel.fetchAll({
        columns: ['id'],
        transacting
      });

      const validIDs = validActivities.map(activity => activity.get('id'));
      if (activities.some(activityID => !validIDs.includes(activityID))) {
        logger.verbose('one or more activitiy IDs are invalid');
        throw new Error('invalid-activities');
      }
      logger.silly('all role activities refer to real activities');
      logger.silly('model is valid');
    }
  }
});
