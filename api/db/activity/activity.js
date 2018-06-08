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

    costAllocation() {
      return this.hasMany('apdActivityCostAllocation');
    },

    format: attr =>
      Object.keys(attr).reduce((builtUp, field) => {
        const out = { ...builtUp };
        const value = attr[field];
        const outField = field.replace(/([A-Z])/g, m => `_${m.toLowerCase()}`);

        if (field === 'costAllocationNarrative') {
          if (value.methodology) {
            out.cost_allocation_methodology = value.methodology;
          }
          if (value.otherSources) {
            out.other_funding_sources_description = value.otherSources;
          }
        } else if (
          // stringify the standardsAndConditions field,
          // but only if it's not null; if null, stringify
          // returns the string 'null', which is invalid JSON and will
          // cause Postgres to throw
          field === 'standardsAndConditions' &&
          value
        ) {
          out[outField] = JSON.stringify(value);
        } else {
          out[outField] = value;
        }

        return out;
      }, {}),

    static: {
      updateableFields: [
        'name',
        'summary',
        'description',
        'alternatives',
        'costAllocationNarrative',
        'standardsAndConditions',
        'fundingSource'
      ],
      owns: {
        goals: 'apdActivityGoal',
        contractorResources: 'apdActivityContractorResource',
        expenses: 'apdActivityExpense',
        schedule: 'apdActivitySchedule',
        statePersonnel: 'apdActivityStatePersonnel',
        costAllocation: 'apdActivityCostAllocation'
      },
      foreignKey: 'activity_id',
      withRelated: [
        'contractorResources',
        'contractorResources.years',
        'goals',
        'expenses',
        'expenses.entries',
        'schedule',
        'statePersonnel',
        'statePersonnel.years',
        'costAllocation'
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
        summary: this.get('summary'),
        description: this.get('description'),
        alternatives: this.get('alternatives'),
        goals: this.related('goals'),
        contractorResources: this.related('contractorResources'),
        expenses: this.related('expenses'),
        schedule: this.related('schedule'),
        statePersonnel: this.related('statePersonnel'),
        costAllocationNarrative: {
          methodology: this.get('cost_allocation_methodology'),
          otherSources: this.get('other_funding_sources_description')
        },
        costAllocation: this.related('costAllocation'),
        standardsAndConditions: this.get('standards_and_conditions'),
        fundingSource: this.get('funding_source')
      };
    }
  }
};
