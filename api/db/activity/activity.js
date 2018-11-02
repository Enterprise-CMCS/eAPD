const moment = require('moment');
const logger = require('../../logger')('db activity model');

const getDate = date => (date ? moment(date).format('YYYY-MM-DD') : null);

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

    files() {
      return this.belongsToMany(
        'file',
        'activity_files',
        'activity_id',
        'file_id'
      );
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

    quarterlyFFP() {
      return this.hasMany('apdActivityQuarterlyFFP');
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
        'alternatives',
        'costAllocationNarrative',
        'description',
        'fundingSource',
        'name',
        'plannedEndDate',
        'plannedStartDate',
        'standardsAndConditions',
        'summary'
      ],
      owns: {
        goals: 'apdActivityGoal',
        contractorResources: 'apdActivityContractorResource',
        expenses: 'apdActivityExpense',
        schedule: 'apdActivitySchedule',
        statePersonnel: 'apdActivityStatePersonnel',
        costAllocation: 'apdActivityCostAllocation',
        quarterlyFFP: 'apdActivityQuarterlyFFP'
      },
      foreignKey: 'activity_id',
      withRelated: [
        'contractorResources',
        'contractorResources.files',
        'contractorResources.hourlyData',
        'contractorResources.years',
        'goals',
        'expenses',
        'expenses.entries',
        'files',
        'schedule',
        'statePersonnel',
        'statePersonnel.years',
        'costAllocation',
        'quarterlyFFP'
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

        const hasName = await this.where({
          apd_id: this.attributes.apd_id,
          name
        }).fetchAll({ transacting });
        if (hasName.length) {
          logger.verbose('another activity already has this name');
          throw new Error('activity-name-exists');
        }
      }

      [
        ['plannedEndDate', 'planned-end-date'],
        ['plannedStartDate', 'planned-start-date']
      ].forEach(([prop, errName]) => {
        if (this.attributes[prop]) {
          // true to enforce strict parsing
          const date = moment(this.attributes[prop], 'YYYY-MM-DD', true);
          if (!date.isValid()) {
            throw new Error(`activity-${errName}`);
          }

          // convert to JS date object
          this.attributes[prop] = date.toDate();
        } else {
          // if the date is some kind of falsey, delete it from the
          // attributes so we don't save it at all
          delete this.attributes[prop];
        }
      });
    },

    toJSON() {
      return {
        id: this.get('id'),
        alternatives: this.get('alternatives'),
        contractorResources: this.related('contractorResources'),
        costAllocation: this.related('costAllocation'),
        costAllocationNarrative: {
          methodology: this.get('cost_allocation_methodology'),
          otherSources: this.get('other_funding_sources_description')
        },
        description: this.get('description'),
        expenses: this.related('expenses'),
        files: this.related('files'),
        fundingSource: this.get('funding_source'),
        goals: this.related('goals'),
        name: this.get('name'),
        plannedEndDate: getDate(this.get('planned_end_date')),
        plannedStartDate: getDate(this.get('planned_start_date')),
        schedule: this.related('schedule'),
        standardsAndConditions: this.get('standards_and_conditions'),
        statePersonnel: this.related('statePersonnel'),
        summary: this.get('summary'),
        quarterlyFFP: this.related('quarterlyFFP')
      };
    }
  }
};
