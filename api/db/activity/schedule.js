const moment = require('moment');

const getDate = date => (date ? moment(date).format('YYYY-MM-DD') : null);

module.exports = {
  apdActivitySchedule: {
    tableName: 'activity_schedule',

    activity() {
      return this.belongsTo('apdActivity');
    },

    // In addition to switching from camel case to
    // snake case, we also convert to date objects
    // since we don't know what might have been put
    // here from the outside.  (E.g., the API takes
    // JSON, so dates will come in as strings.)
    format(attributes) {
      return {
        id: attributes.id,
        activity_id: attributes.activity_id,
        actual_end: attributes.actualEnd,
        actual_start: attributes.actualStart,
        milestone: attributes.milestone,
        planned_end: attributes.plannedEnd,
        planned_start: attributes.plannedStart,
        status: attributes.status
      };
    },

    async validate() {
      [
        ['actualEnd', 'actual-end-date'],
        ['actualStart', 'actual-end-date'],
        ['plannedEnd', 'planned-end-date'],
        ['plannedStart', 'planned-start-date']
      ].forEach(([attribute, name]) => {
        if (this.attributes[attribute]) {
          // true to enforce strict parsing
          const date = moment(this.attributes[attribute], 'YYYY-MM-DD', true);
          if (!date.isValid()) {
            throw new Error(`${name}-invalid`);
          }

          // convert to JS date object
          this.attributes[attribute] = date.toDate();
        }
      });
    },

    toJSON() {
      return {
        id: this.get('id'),
        actualEnd: getDate(this.get('actual_end')),
        actualStart: getDate(this.get('actual_start')),
        milestone: this.get('milestone'),
        plannedEnd: getDate(this.get('planned_end')),
        plannedStart: getDate(this.get('planned_start')),
        status: this.get('status')
      };
    },

    static: {
      updateableFields: [
        'actualEnd',
        'actualStart',
        'milestone',
        'plannedEnd',
        'plannedStart',
        'status'
      ]
    }
  }
};
