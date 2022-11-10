const { hitech } = require('./01-hitech');
const { hitechNoActivities } = require('./02-hitechNoActivities');
const { mmis } = require('./03-mmis');
const { mmisNoActivities } = require('./04-mmisNoActivities');

const data = [
  {
    stateId: 'ak',
    status: 'draft',
    ...hitech
  },
  {
    stateId: 'ak',
    status: 'draft',
    ...hitechNoActivities
  },
  {
    stateId: 'ak',
    status: 'draft',
    ...mmis
  },
  {
    stateId: 'ak',
    status: 'draft',
    ...mmisNoActivities
  }
];

module.exports = {
  data,
  hitech,
  hitechNoActivities,
  mmis,
  mmisNoActivities
};
