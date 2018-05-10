module.exports = () => ({
  apd: {
    tableName: 'apds',

    activities() {
      return this.hasMany('apdActivity');
    },

    state() {
      return this.belongsTo('state');
    },

    format(attributes) {
      const out = { ...attributes };
      [
        ['programOverview', 'program_overview'],
        ['narrativeHIE', 'narrative_hie'],
        ['narrativeHIT', 'narrative_hit'],
        ['narrativeMMIS', 'narrative_mmis']
      ].forEach(([a, b]) => {
        delete out[a];
        if (attributes[a] !== undefined) {
          out[b] = attributes[a];
        }
      });
      return out;
    },

    toJSON() {
      return {
        id: this.get('id'),
        state: this.get('state_id'),
        status: this.get('status'),
        period: this.get('period'),
        programOverview: this.get('program_overview'),
        narrativeHIE: this.get('narrative_hie'),
        narrativeHIT: this.get('narrative_hit'),
        narrativeMMIS: this.get('narrative_mmis'),
        activities: this.related('activities').toJSON()
      };
    },

    static: {
      updateableFields: [
        'status',
        'period',
        'programOverview',
        'narrativeHIE',
        'narrativeHIT',
        'narrativeMMIS'
      ],
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
