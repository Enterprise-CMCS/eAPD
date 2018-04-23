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

    format: attr => ({
      id: attr.id,
      apd_id: attr.apd_id,
      name: attr.name,
      description: attr.description,
      other_funding_sources_description: attr.otherFundingSources
        ? attr.otherFundingSources.description
        : '',
      other_funding_sources_amount: attr.otherFundingSources
        ? attr.otherFundingSources.amount
        : 0
    }),

    static: {
      updateableFields: ['name', 'description', 'otherFundingSources'],
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
        'schedule',
        'statePersonnel',
        'statePersonnel.years'
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
        statePersonnel: this.related('statePersonnel'),
        otherFundingSources: {
          description: this.get('other_funding_sources_description'),
          amount: this.get('other_funding_sources_amount')
        }
      };
    }
  }
};
