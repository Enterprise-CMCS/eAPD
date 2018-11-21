module.exports = () => ({
  apdPreviousActivityExpense: {
    tableName: 'apd_previous_activity_expenses',

    apd() {
      return this.belongsTo('apd');
    },

    format(attributes) {
      const out = {
        hithie_federal_actual: attributes.hithie.federalActual || 0,
        hithie_total_approved: attributes.hithie.totalApproved || 0,
        mmis90_federal_actual: attributes.mmis[90].federalActual || 0,
        mmis90_total_approved: attributes.mmis[90].totalApproved || 0,
        mmis75_federal_actual: attributes.mmis[75].federalActual || 0,
        mmis75_total_approved: attributes.mmis[75].totalApproved || 0,
        mmis50_federal_actual: attributes.mmis[50].federalActual || 0,
        mmis50_total_approved: attributes.mmis[50].totalApproved || 0,
        year: attributes.year,
        apd_id: attributes.apd_id
      };

      return out;
    },

    toJSON() {
      return {
        hithie: {
          federalActual: this.get('hithie_federal_actual'),
          totalApproved: this.get('hithie_total_approved')
        },
        mmis: {
          '90': {
            federalActual: this.get('mmis90_federal_actual'),
            totalApproved: this.get('mmis90_total_approved')
          },
          '75': {
            federalActual: this.get('mmis75_federal_actual'),
            totalApproved: this.get('mmis75_total_approved')
          },
          '50': {
            federalActual: this.get('mmis50_federal_actual'),
            totalApproved: this.get('mmis50_total_approved')
          }
        },
        year: `${this.get('year')}`
      };
    },

    static: {
      updateableFields: ['hithie', 'mmis', 'year']
    }
  }
});
