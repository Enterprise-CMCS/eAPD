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
      updateableFields: ['status', 'period'],
      foreignKey: 'apd_id',
      owns: { activities: 'apdActivity' },
      withRelated: [
        { activities: query => query.orderBy('id') },
        'activities.approaches',
        'activities.contractorResources',
        'activities.contractorResources.years',
        'activities.goals',
        'activities.goals.objectives',
        'activities.expenses',
        'activities.expenses.entries',
        'activities.schedule',
        'activities.statePersonnel',
        'activities.statePersonnel.years'
      ]
    }
  }
});
