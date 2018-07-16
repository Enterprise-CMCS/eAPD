module.exports = {
  apdActivityQuarterlyFFP: {
    tableName: 'activity_quarterly_ffp',

    activity() {
      return this.belongsTo('apdActivity');
    },

    format(attributes) {
      const out = {
        activity_id: attributes.activity_id,
        year: attributes.year
      };

      [1, 2, 3, 4].forEach(q => {
        const qq = `q${q}`;
        if (attributes[qq]) {
          out[`${qq}_combined`] = +attributes[qq].combined;
          out[`${qq}_contractors`] = +attributes[qq].contractors;
          out[`${qq}_state`] = +attributes[qq].state;
        }
      });

      return out;
    },

    async validate() {
      if (!this.attributes.year) {
        throw new Error('invalid-activity-quarterly-ffp');
      }
    },

    toJSON() {
      return {
        q1: {
          combined: +this.get('q1_combined'),
          contractors: +this.get('q1_contractors'),
          state: +this.get('q1_state')
        },
        q2: {
          combined: +this.get('q2_combined'),
          contractors: +this.get('q2_contractors'),
          state: +this.get('q2_state')
        },
        q3: {
          combined: +this.get('q3_combined'),
          contractors: +this.get('q3_contractors'),
          state: +this.get('q3_state')
        },
        q4: {
          combined: +this.get('q4_combined'),
          contractors: +this.get('q4_contractors'),
          state: +this.get('q4_state')
        },
        year: this.get('year')
      };
    },

    static: {
      updateableFields: ['q1', 'q2', 'q3', 'q4', 'year']
    }
  }
};
