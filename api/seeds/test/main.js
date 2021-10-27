const truncate = require('../shared/delete-everything');
const states = require('../shared/states');

const apds = require('./apds');
const files = require('./files');
const roles = require('./roles');
const testStates = require('./states');
const affiliations = require('./affiliations');
const certifications = require('./certifications');

exports.seed = async knex => {
  // Don't seed this data if we're not in a test environment.
  if (process.env.NODE_ENV !== 'test') {
    return;
  }

  // Call specific seeds from here.
  await truncate.seed(knex);
  await states.seed(knex);
  
  await apds.seed(knex);
  await files.seed(knex);
  await roles.seed(knex);
  await testStates.seed(knex);
  await affiliations.seed(knex);
  await certifications.seed(knex);
};
