module.exports = () => ({
  apdIncentivePayment: {
    tableName: 'apd_incentive_payments',

    apd() {
      return this.belongsTo('apd');
    },

    format(attributes) {
      const out = { year: attributes.year, apd_id: attributes.apd_id };

      ['q1', 'q2', 'q3', 'q4'].forEach(q => {
        if (attributes[q]) {
          [
            ['ehPayment', 'eh_payment'],
            ['ehCount', 'eh_count'],
            ['epPayment', 'ep_payment'],
            ['epCount', 'ep_count']
          ].forEach(([camel, snake]) => {
            if (attributes[q][camel] !== undefined) {
              out[`${q}_${snake}`] = attributes[q][camel];
            }
          });
        }
      });

      return out;
    },

    toJSON() {
      return {
        q1: {
          ehPayment: +this.get('q1_eh_payment'),
          ehCount: this.get('q1_eh_count'),
          epPayment: +this.get('q1_ep_payment'),
          epCount: this.get('q1_ep_count')
        },
        q2: {
          ehPayment: +this.get('q2_eh_payment'),
          ehCount: this.get('q2_eh_count'),
          epPayment: +this.get('q2_ep_payment'),
          epCount: this.get('q2_ep_count')
        },
        q3: {
          ehPayment: +this.get('q3_eh_payment'),
          ehCount: this.get('q3_eh_count'),
          epPayment: +this.get('q3_ep_payment'),
          epCount: this.get('q3_ep_count')
        },
        q4: {
          ehPayment: +this.get('q4_eh_payment'),
          ehCount: this.get('q4_eh_count'),
          epPayment: +this.get('q4_ep_payment'),
          epCount: this.get('q4_ep_count')
        },
        year: `${this.get('year')}`
      };
    },

    static: {
      updateableFields: ['q1', 'q2', 'q3', 'q4', 'year']
    }
  }
});
