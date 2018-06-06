module.exports = {
  apdActivityCostAllocation: {
    tableName: 'activity_cost_allocation',

    activity() {
      return this.belongsTo('apdActivity');
    },

    toJSON() {
      return {
        year: this.get('year'),
        federal: this.get('federal'),
        state: this.get('state'),
        other: this.get('other')
      };
    },

    static: {
      updateableFields: ['year', 'federal', 'state', 'other']
    }
  }
};
