const activity = require('./activity');
const approach = require('./approach');
const expense = require('./expense');
const expenseEntry = require('./expenseEntry');
const goal = require('./goal');
const goalObjective = require('./goalObjective');
const schedule = require('./schedule');

module.exports = () => ({
  ...activity,
  ...approach,
  ...expense,
  ...expenseEntry,
  ...goal,
  ...goalObjective,
  ...schedule
});
