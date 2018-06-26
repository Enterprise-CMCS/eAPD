module.exports = () => ({
  apdPreviousActivityExpense: {
    tableName: 'apd_previous_activity_expenses',

    apd() {
      return this.belongsTo('apd');
    },

    format(attributes) {
      const out = { year: attributes.year, apd_id: attributes.apd_id };
      if (attributes.hie) {
        out.hie_federal_actual = attributes.hie.federalActual || 0;
        out.hie_federal_approved = attributes.hie.federalApproved || 0;
        out.hie_state_actual = attributes.hie.stateActual || 0;
        out.hie_state_approved = attributes.hie.stateApproved || 0;
      }
      if (attributes.hit) {
        out.hit_federal_actual = attributes.hit.federalActual || 0;
        out.hit_federal_approved = attributes.hit.federalApproved || 0;
        out.hit_state_actual = attributes.hit.stateActual || 0;
        out.hit_state_approved = attributes.hit.stateApproved || 0;
      }

      return out;
    },

    toJSON() {
      return {
        hie: {
          federalActual: +this.get('hie_federal_actual'),
          federalApproved: +this.get('hie_federal_approved'),
          stateActual: +this.get('hie_state_actual'),
          stateApproved: +this.get('hie_state_approved')
        },
        hit: {
          federalActual: +this.get('hit_federal_actual'),
          federalApproved: +this.get('hit_federal_approved'),
          stateActual: +this.get('hit_state_actual'),
          stateApproved: +this.get('hit_state_approved')
        },
        year: `${this.get('year')}`
      };
    },

    static: {
      updateableFields: ['hie', 'hit', 'year']
    }
  }
});
