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
        actual_end: new Date(attributes.actualEnd),
        actual_start: new Date(attributes.actualStart),
        milestone: attributes.milestone,
        planned_end: new Date(attributes.plannedEnd),
        planned_start: new Date(attributes.plannedStart),
        status: attributes.status
      };
    },

    parse(attributes) {
      return {
        id: attributes.id,
        activity_id: attributes.activity_id,
        actualEnd: attributes.actual_end,
        actualStart: attributes.actual_start,
        milestone: attributes.milestone,
        plannedEnd: attributes.planned_end,
        plannedStart: attributes.planned_start,
        status: attributes.status
      };
    },

    toJSON() {
      return {
        id: this.get('id'),
        actualEnd: this.get('actualEnd'),
        actualStart: this.get('actualStart'),
        milestone: this.get('milestone'),
        plannedEnd: this.get('plannedEnd'),
        plannedStart: this.get('plannedStart'),
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
