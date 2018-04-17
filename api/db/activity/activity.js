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

    contractorResources() {
      return this.hasMany('apdActivityContractorResource');
    },

    expenses() {
      return this.hasMany('apdActivityExpense');
    },

    schedule() {
      return this.hasMany('apdActivitySchedule');
    },

    statePersonnel() {
      return this.hasMany('apdActivityStatePersonnel');
    },

    static: {
      updateableFields: ['name', 'description'],
      owns: {
        goals: 'apdActivityGoal',
        approaches: 'apdActivityApproach',
        contractorResources: 'apdActivityContractorResource',
        expenses: 'apdActivityExpense',
        schedule: 'apdActivitySchedule',
        statePersonnel: 'apdActivityStatePersonnel'
      },
      foreignKey: 'activity_id',
      withRelated: [
        'approaches',
        'contractorResources',
        'contractorResources.years',
        'goals',
        'goals.objectives',
        'expenses',
        'expenses.entries',
        'personnel',
        'personnel.years',
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
        contractorResources: this.related('contractorResources'),
        expenses: this.related('expenses'),
        schedule: this.related('schedule'),
        statePersonnel: this.related('statePersonnel')
      };
    }
  }
};
