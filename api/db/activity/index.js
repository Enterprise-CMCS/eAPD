const activity = require('./activity');
const contractorResource = require('./contractorResource');
const costAllocation = require('./costAllocation');
const expense = require('./expense');
const expenseEntry = require('./expenseEntry');
const goal = require('./goal');
const schedule = require('./schedule');
const statePersonnel = require('./statePersonnel');
const quarterlyFFP = require('./quarterlyFFP');

// Just rolls up activity models into one object
// so db/index only has to load this one thing
module.exports = () => ({
  ...activity,
  ...contractorResource,
  ...costAllocation,
  ...expense,
  ...expenseEntry,
  ...goal,
  ...schedule,
  ...statePersonnel,
  ...quarterlyFFP
});
