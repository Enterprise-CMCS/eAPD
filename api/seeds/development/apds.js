const { akAPD } = require('./01-akAPD');
const { akAPDNoActivities } = require('./02-akAPDNoActivities');

const data = [
  {
    stateId: 'ak',
    status: 'draft',
    ...akAPD
  },
  {
    stateId: 'ak',
    status: 'draft',
    ...akAPDNoActivities
  }
];

module.exports = {
  data,
  akAPD,
  akAPDNoActivities
};
