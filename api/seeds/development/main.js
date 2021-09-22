const truncate = require('../shared/delete-everything');
const roles = require('../shared/roles-and-activities');
const states = require('../shared/states');
const apds = require('./apds');
const state = require('./state');
const users = require('./base-users');
const {getStateAdminCertifications} = require('../../db/certifications')

exports.seed = async knex => {
  // Don't seed this data if we're not in a development environment.
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Call specific seeds from here.
  await truncate.seed(knex);
  await roles.seed(knex);
  await states.seed(knex);
  await apds.seed(knex);
  await state.seed(knex);
  await users.seed(knex);

};
