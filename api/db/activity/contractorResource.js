const moment = require('moment');

const getDate = date => (date ? moment(date).format('YYYY-MM-DD') : null);

module.exports = {
  apdActivityContractorResource: {
    tableName: 'activity_contractor_resources',

    activity() {
      return this.belongsTo('apdActivity');
    },

    files() {
      return this.belongsToMany(
        'file',
        'activity_contractor_files',
        'activity_contractor_resource_id',
        'file_id'
      );
    },

    hourlyData() {
      return this.hasMany(
        'apdActivityContractorResourceHourly',
        'contractor_resource_id'
      );
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
        description: this.get('description'),
        end: getDate(this.get('end')),
        files: this.related('files'),
        hourlyData: this.related('hourlyData'),
        id: this.get('id'),
        name: this.get('name'),
        start: getDate(this.get('start')),
        totalCost: this.get('totalCost'),
        useHourly: this.get('useHourly'),
        years: this.related('years')
      };
    },

    static: {
      updateableFields: [
        'name',
        'description',
        'end',
        'start',
        'totalCost',
        'useHourly'
      ],
      owns: {
        years: 'apdActivityContractorResourceCost',
        hourlyData: 'apdActivityContractorResourceHourly'
      },
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
  },

  apdActivityContractorResourceHourly: {
    tableName: 'activity_contractor_resources_hourly',

    contractorResource() {
      return this.belongsTo(
        'apdActivityContractorResource',
        'contractor_resource_id'
      );
    },

    toJSON() {
      return {
        id: this.get('id'),
        year: this.get('year'),
        hours: +this.get('hours'),
        rate: +this.get('rate')
      };
    },

    static: {
      updateableFields: ['year', 'hours', 'rate']
    }
  }
};
