const { oktaClient } = require('../auth/oktaAuth');
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

  const { id: regularUserId } = (await oktaClient.getUser('em@il.com')) || {};
  const { id: fedAdminId } = (await oktaClient.getUser('fedadmin')) || {};
  const { id: stateAdminId } = (await oktaClient.getUser('stateadmin')) || {};
  const { id: stateStaffId } = (await oktaClient.getUser('statestaff')) || {};
  const { id: stateContractorId } =
    (await oktaClient.getUser('statecontractor')) || {};

  if (regularUserId) {
    const regularUserAffiliation = {
      user_id: regularUserId,
      state_id: 'ak',
      role_id: await knex('auth_roles')
        .where({ name: 'eAPD State Admin' })
        .first()
        .then(role => role.id),
      status: 'approved',
      updated_by: 'seeds'
    };
    await knex('auth_affiliations').insert(regularUserAffiliation);
  }
  if (fedAdminId) {
    const fedAdminAffiliation = {
      user_id: fedAdminId,
      state_id: 'ak',
      role_id: await knex('auth_roles')
        .where({ name: 'eAPD Federal Admin' })
        .first()
        .then(role => role.id),
      status: 'approved',
      updated_by: 'seeds'
    };
    await knex('auth_affiliations').insert(fedAdminAffiliation);
  }
  if (stateAdminId) {
    const stateAdminAffiliation = {
      user_id: stateAdminId,
      state_id: 'ak',
      role_id: await knex('auth_roles')
        .where({ name: 'eAPD State Admin' })
        .first()
        .then(role => role.id),
      status: 'approved',
      updated_by: 'seeds'
    };
    await knex('auth_affiliations').insert(stateAdminAffiliation);
  }
  if (stateStaffId) {
    const stateStaffAffiliation = {
      user_id: stateStaffId,
      state_id: 'ak',
      role_id: await knex('auth_roles')
        .where({ name: 'eAPD State Staff' })
        .first()
        .then(role => role.id),
      status: 'approved',
      updated_by: 'seeds'
    };
    await knex('auth_affiliations').insert(stateStaffAffiliation);
  }
  if (stateContractorId) {
    const stateContractorAffiliation = {
      user_id: stateContractorId,
      state_id: 'ak',
      role_id: await knex('auth_roles')
        .where({ name: 'eAPD State Contractor' })
        .first()
        .then(role => role.id),
      status: 'approved',
      updated_by: 'seeds'
    };
    await knex('auth_affiliations').insert(stateContractorAffiliation);
  }
};
