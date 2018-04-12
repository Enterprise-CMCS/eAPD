const logger = require('../../logger')('db activity model');

module.exports = {
  apdActivity: {
    tableName: 'activities',

    apd() {
      return this.belongsTo('apd');
    },

    goals() {
      return this.hasMany('apdActivityGoal');
    },

    approaches() {
      return this.hasMany('apdActivityApproach');
    },

    expenses() {
      return this.hasMany('apdActivityExpense');
    },

    schedule() {
      return this.hasMany('apdActivitySchedule');
    },

    static: {
      updateableFields: ['name', 'description'],
      owns: {
        goals: 'apdActivityGoal',
        approaches: 'apdActivityApproach',
        expenses: 'apdActivityExpense',
        schedule: 'apdActivitySchedule'
      },
      foreignKey: 'activity_id',
      withRelated: [
        'approaches',
        'goals',
        'goals.objectives',
        'expenses',
        'expenses.entries',
        'schedule'
      ]
    },

    async validate({ transacting } = {}) {
      logger.silly('validating');

      if (this.hasChanged('name')) {
        const name = this.attributes.name;

        if (typeof name !== 'string' || name.length < 1) {
          logger.verbose('name is not a string or is empty');
          throw new Error('activity-name-invalid');
        }

        const hasName = await this.where({ name }).fetchAll({ transacting });
        if (hasName.length) {
          logger.verbose('another activity already has this name');
          throw new Error('activity-name-exists');
        }
      }
    },

    toJSON() {
      return {
        id: this.get('id'),
        name: this.get('name'),
        description: this.get('description'),
        goals: this.related('goals'),
        approaches: this.related('approaches'),
        expenses: this.related('expenses'),
        schedule: this.related('schedule')
      };
    }
  }
};
