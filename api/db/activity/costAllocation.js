module.exports = {
  apdActivityCostAllocation: {
    tableName: 'activity_cost_allocation',

    activity() {
      return this.belongsTo('apdActivity');
    },

    toJSON() {
      return {
        id: this.get('id'),
        entity: this.get('entity'),
        percent_of_cost: this.get('percent_of_cost')
      };
    },

    static: {
      updateableFields: ['entity', 'percent_of_cost']
    }
  }
};
