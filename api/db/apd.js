module.exports = () => ({
  apd: {
    tableName: 'apds',

    activities() {
      return this.hasMany('apdActivity');
    },

    state() {
      return this.belongsTo('state');
    },

    static: {
      withRelated: [
        'activities',
        'activities.approaches',
        'activities.goals',
        'activities.goals.objectives',
        'activities.expenses',
        'activities.expenses.entries',
        'activities.schedule'
      ]
    }
  }
});
