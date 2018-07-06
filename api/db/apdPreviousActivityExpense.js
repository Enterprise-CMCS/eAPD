module.exports = () => ({
  apdPreviousActivityExpense: {
    tableName: 'apd_previous_activity_expenses',

    apd() {
      return this.belongsTo('apd');
    },

    format(attributes) {
      const out = { year: attributes.year, apd_id: attributes.apd_id };

      ['hie', 'hit', 'mmis'].forEach(attr => {
        if (attributes[attr]) {
          out[`${attr}_federal_actual`] = attributes[attr].federalActual || 0;
          out[`${attr}_federal_approved`] =
            attributes[attr].federalApproved || 0;
          out[`${attr}_state_actual`] = attributes[attr].stateActual || 0;
          out[`${attr}_state_approved`] = attributes[attr].stateApproved || 0;
        }
      });

      return out;
    },

    toJSON() {
      return ['hie', 'hit', 'mmis'].reduce(
        (acc, attr) => ({
          ...acc,
          [attr]: {
            federalActual: +this.get(`${attr}_federal_actual`),
            federalApproved: +this.get(`${attr}_federal_approved`),
            stateActual: +this.get(`${attr}_state_actual`),
            stateApproved: +this.get(`${attr}_state_approved`)
          }
        }),
        {
          year: `${this.get('year')}`
        }
      );
    },

    static: {
      updateableFields: ['hie', 'hit', 'mmis', 'year']
    }
  }
});
