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
      if (Number.isNaN(Date.parse(this.attributes.start))) {
        throw new Error('start-date-invalid');
      }
      if (Number.isNaN(Date.parse(this.attributes.end))) {
        throw new Error('end-date-invalid');
      }

      // Once we've validated the dates, go ahead and convert them
      this.attributes.start = new Date(this.attributes.start);
      this.attributes.end = new Date(this.attributes.end);
    },

    toJSON() {
      return {
        id: this.get('id'),
        name: this.get('name'),
        description: this.get('description'),
        start: this.get('start'),
        end: this.get('end'),
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
