const logger = require('../../logger')('user seeder');
const { states } = require('../../util/states');

const createUsersToAdd = async (knex, oktaClient) => {
  await knex('auth_affiliations').del();

  logger.info('Retrieving user ids from Okta');
  const { id: regularUserId } = (await oktaClient.getUser('em@il.com')) || {};
  const { id: sysAdminId } = (await oktaClient.getUser('sysadmin')) || {};
  const { id: fedAdminId } = (await oktaClient.getUser('fedadmin')) || {};
  const { id: stateAdminId } = (await oktaClient.getUser('stateadmin')) || {};
  const { id: stateStaffId } = (await oktaClient.getUser('statestaff')) || {};
  const { id: stateContractorId } =
    (await oktaClient.getUser('statecontractor')) || {};
  const { id: requestedRoleId } =
    (await oktaClient.getUser('requestedrole')) || {};
  const { id: deniedRoleId } = (await oktaClient.getUser('deniedrole')) || {};
  const { id: revokedRoleId } = (await oktaClient.getUser('revokedrole')) || {};

  logger.info('Retrieving role ids from database');
  const sysAdminRoleId = await knex('auth_roles')
    .where({ name: 'eAPD System Admin' })
    .first()
    .then(role => role.id);
  const fedAdminRoleId = await knex('auth_roles')
    .where({ name: 'eAPD Federal Admin' })
    .first()
    .then(role => role.id);
  const stateAdminRoleId = await knex('auth_roles')
    .where({ name: 'eAPD State Admin' })
    .first()
    .then(role => role.id);
  const stateStaffRoleId = await knex('auth_roles')
    .where({ name: 'eAPD State Staff' })
    .first()
    .then(role => role.id);
  const stateContractorRoleId = await knex('auth_roles')
    .where({ name: 'eAPD State Contractor' })
    .first()
    .then(role => role.id);

  logger.info('Setting up affiliations to add');
  const oktaAffiliations = states.map(state => ({
    user_id: sysAdminId,
    state_id: state.id,
    role_id: sysAdminRoleId,
    status: 'approved',
    updated_by: 'seeds',
    username: 'sysadmin'
  }));

  oktaAffiliations.push({
    user_id: regularUserId || '',
    state_id: 'ak',
    role_id: stateAdminRoleId,
    status: 'approved',
    updated_by: 'seeds',
    username: 'em@il.com'
  });

  oktaAffiliations.push({
    user_id: fedAdminId || '',
    state_id: 'ak',
    role_id: fedAdminRoleId,
    status: 'approved',
    updated_by: 'seeds',
    username: 'fedadmin'
  });

  oktaAffiliations.push({
    user_id: stateAdminId || '',
    state_id: 'ak',
    role_id: stateAdminRoleId,
    status: 'approved',
    updated_by: 'seeds',
    username: 'stateadmin'
  });

  oktaAffiliations.push({
    user_id: stateStaffId || '',
    state_id: 'ak',
    role_id: stateStaffRoleId,
    status: 'approved',
    updated_by: 'seeds',
    username: 'statestaff'
  });

  oktaAffiliations.push({
    user_id: stateContractorId || '',
    state_id: 'ak',
    role_id: stateContractorRoleId,
    status: 'approved',
    updated_by: 'seeds',
    username: 'statecontractor'
  });

  oktaAffiliations.push({
    user_id: requestedRoleId || '',
    state_id: 'ak',
    status: 'requested',
    username: 'requestedrole'
  });

  oktaAffiliations.push({
    user_id: deniedRoleId || '',
    state_id: 'ak',
    status: 'denied',
    username: 'deniedrole'
  });

  oktaAffiliations.push({
    user_id: revokedRoleId || '',
    state_id: 'ak',
    status: 'revoked',
    username: 'revokedrole'
  });

  return oktaAffiliations;
};

module.exports = {
  createUsersToAdd
};
