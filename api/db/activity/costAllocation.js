module.exports = {
  apdActivityCostAllocation: {
    tableName: 'activity_cost_allocation',

    activity() {
      return this.belongsTo('apdActivity');
    },

    format(attrs) {
      return {
        year: attrs.year,
        federal_percent: attrs.federalPercent,
        state_percent: attrs.statePercent,
        other_amount: attrs.otherAmount,
        activity_id: attrs.activity_id
      };
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
