module.exports = {
  apdActivityCostAllocation: {
    tableName: 'activity_cost_allocation',

    activity() {
      return this.belongsTo('apdActivity');
    },

    toJSON() {
      return {
        year: this.get('year'),
        federalPercent: this.get('federal_percent'),
        statePercent: this.get('state_percent'),
        otherAmount: this.get('other_amount')
      };
    },

    static: {
      updateableFields: [
        'year',
        'federalPercent',
        'statePercent',
        'otherAmount'
      ]
    }
  }
};
