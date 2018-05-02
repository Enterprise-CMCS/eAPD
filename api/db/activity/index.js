const activity = require('./activity');
const approach = require('./approach');
const contractorResource = require('./contractorResource');
const costAllocation = require('./costAllocation');
const expense = require('./expense');
const expenseEntry = require('./expenseEntry');
const goal = require('./goal');
const goalObjective = require('./goalObjective');
const schedule = require('./schedule');
const statePersonnel = require('./statePersonnel');

module.exports = () => ({
  ...activity,
  ...approach,
  ...contractorResource,
  ...costAllocation,
  ...expense,
  ...expenseEntry,
  ...goal,
  ...goalObjective,
  ...schedule,
  ...statePersonnel
});
