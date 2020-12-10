const truncate = require('./shared/delete-everything');
const states = require('./shared/states');

const apds = require('./test/apds');
const files = require('./test/files');
const roles = require('./test/roles');
const testStates = require('./test/states');
const affiliations = require('./test/affiliations');

exports.seed = async knex => {
  // Don't seed this data if we're not in a test environment.
  if (process.env.NODE_ENV !== 'test') {
    return;
  }

  // Call specific seeds from here.
  await truncate.seed(knex);
  await roles.seed(knex);
  await states.seed(knex);
  await apds.seed(knex);
  await files.seed(knex);
  await testStates.seed(knex);
  await affiliations.seed(knex);

  // user: em@il.com from okta
  // uid: 00u4nbo8e9BoctLWI297
  const emailAffiliation = {
    user_id: '00u4nbo8e9BoctLWI297',
    state_id: 'fl',
    role_id: await knex('auth_roles')
      .where({ name: 'eAPD State Admin' })
      .first()
      .then(role => role.id),
    status: 'approved',
    updated_by: 'seeds'
  };
  await knex('auth_affiliations').insert(emailAffiliation);
};
