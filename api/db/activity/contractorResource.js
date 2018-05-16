const moment = require('moment');

module.exports = {
  apdActivityContractorResource: {
    tableName: 'activity_contractor_resources',

    activity() {
      return this.belongsTo('apdActivity');
    },

    years() {
      return this.hasMany(
        'apdActivityContractorResourceCost',
        'contractor_resource_id'
      );
    },

    async validate() {
      [['end', 'end-date'], ['start', 'start-date']].forEach(
        ([attribute, name]) => {
          if (this.attributes[attribute]) {
            // true to enforce strict parsing
            const date = moment(this.attributes[attribute], 'YYYY-MM-DD', true);
            if (!date.isValid()) {
              throw new Error(`${name}-invalid`);
            }

            // convert to JS date object
            this.attributes[attribute] = date.toDate();
          }
        }
      );
    },

    toJSON() {
      return {
        id: this.get('id'),
        name: this.get('name'),
        description: this.get('description'),
        start: moment(this.get('start')).format('YYYY-MM-DD'),
        end: moment(this.get('end')).format('YYYY-MM-DD'),
        years: this.related('years')
      };
    },

    static: {
      updateableFields: ['name', 'description', 'start', 'end'],
      owns: { years: 'apdActivityContractorResourceCost' },
      foreignKey: 'contractor_resource_id'
    }
  },

  apdActivityContractorResourceCost: {
    tableName: 'activity_contractor_resources_yearly',

    contractorResource() {
      return this.belongsTo(
        'apdActivityContractorResource',
        'contractor_resource_id'
      );
    },

    async validate() {
      if (this.attributes.year < 2010 || this.attributes.year > 3000) {
        throw new Error('year-out-of-range');
      }
    },

    toJSON() {
      return {
        id: this.get('id'),
        cost: this.get('cost'),
        year: this.get('year')
      };
    },

    static: {
      updateableFields: ['year', 'cost']
    }
  }
};
