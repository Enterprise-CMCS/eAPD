const truncate = require('./shared/delete-everything');
const roles = require('./shared/roles-and-activities');
const states = require('./shared/states');
const apds = require('./development/apds');
const state = require('./development/state');

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

  // user: em@il.com from okta
  // uid: 00u4nbo8e9BoctLWI297
  const emailAffiliation = {
    user_id: '00u4nbo8e9BoctLWI297',
    state_id: 'ak',
    role_id: await knex('auth_roles').where({ name: 'eAPD State Admin' }).first().then(role => role.id),
    status: 'approved',
    updated_by: 'seeds'
  };
  await knex('auth_affiliations').insert(emailAffiliation);
};
