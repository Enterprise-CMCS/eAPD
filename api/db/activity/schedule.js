const moment = require('moment');

const getDate = date => (date ? moment(date).format('YYYY-MM-DD') : null);

module.exports = {
  apdActivitySchedule: {
    tableName: 'activity_schedule',

    activity() {
      return this.belongsTo('apdActivity');
    },

    format(attributes) {
      return {
        id: attributes.id,
        activity_id: attributes.activity_id,
        end_date: attributes.endDate,
        milestone: attributes.milestone,
        status: attributes.status
      };
    },

    async validate() {
      if (this.attributes.endDate) {
        // true to enforce strict parsing
        const date = moment(this.attributes.endDate, 'YYYY-MM-DD', true);
        if (!date.isValid()) {
          throw new Error(`end-date-invalid`);
        }

        // convert to JS date object
        this.attributes.endDate = date.toDate();
      } else {
        // if the date is some kind of falsey, delete it from the
        // attributes so we don't save it at all
        delete this.attributes.endDate;
      }
    },

    toJSON() {
      return {
        id: this.get('id'),
        endDate: getDate(this.get('end_date')),
        milestone: this.get('milestone'),
        status: this.get('status')
      };
    },

    static: {
      updateableFields: ['endDate', 'milestone', 'status']
    }
  }
};
