module.exports = () => ({
  apd: {
    tableName: 'apds',

    activities() {
      return this.hasMany('apdActivity');
    },

    keyPersonnel() {
      return this.hasMany('apdKeyPersonnel');
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

      if (attributes.years) {
        out.years = JSON.stringify(attributes.years);
      }

      return out;
    },

    toJSON() {
      return {
        id: this.get('id'),
        activities: this.related('activities').toJSON(),
        keyPersonnel: this.related('keyPersonnel').toJSON(),
        narrativeHIE: this.get('narrative_hie'),
        narrativeHIT: this.get('narrative_hit'),
        narrativeMMIS: this.get('narrative_mmis'),
        period: this.get('period'),
        programOverview: this.get('program_overview'),
        state: this.get('state_id'),
        status: this.get('status'),
        years: this.get('years')
      };
    },

    static: {
      updateableFields: [
        'status',
        'period',
        'programOverview',
        'narrativeHIE',
        'narrativeHIT',
        'narrativeMMIS',
        'years'
      ],
      foreignKey: 'apd_id',
      owns: { activities: 'apdActivity', keyPersonnel: 'apdKeyPersonnel' },
      withRelated: [
        { activities: query => query.orderBy('id') },
        'activities.contractorResources',
        'activities.contractorResources.years',
        'activities.goals',
        'activities.expenses',
        'activities.expenses.entries',
        'activities.schedule',
        'activities.statePersonnel',
        'activities.statePersonnel.years',
        'keyPersonnel',
        'keyPersonnel.years'
      ]
    }
  }
});
