const logger = require('../../logger')('user seeder');

const createUsersToAdd = async (knex, oktaClient) => {
  await knex('auth_affiliations').del();

  logger.info('Retrieving user ids from Okta');
  const { id: regularUserId } = (await oktaClient.getUser('em@il.com')) || {};
  const { id: fedAdminId } = (await oktaClient.getUser('fedadmin')) || {};
  const { id: stateAdminId } = (await oktaClient.getUser('stateadmin')) || {};
  const { id: stateStaffId } = (await oktaClient.getUser('statestaff')) || {};
  const { id: stateContractorId } =
    (await oktaClient.getUser('statecontractor')) || {};

  logger.info('Retrieving role ids from database');
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
  const oktaAffiliations = [];
  if (regularUserId) {
    oktaAffiliations.push({
      user_id: regularUserId,
      state_id: 'ak',
      role_id: stateAdminRoleId,
      status: 'approved',
      updated_by: 'seeds'
    });
  }
  if (fedAdminId) {
    oktaAffiliations.push({
      user_id: fedAdminId,
      state_id: 'ak',
      role_id: fedAdminRoleId,
      status: 'approved',
      updated_by: 'seeds'
    });
  }
  if (stateAdminId) {
    oktaAffiliations.push({
      user_id: stateAdminId,
      state_id: 'ak',
      role_id: stateAdminRoleId,
      status: 'approved',
      updated_by: 'seeds'
    });
  }
  if (stateStaffId) {
    oktaAffiliations.push({
      user_id: stateStaffId,
      state_id: 'ak',
      role_id: stateStaffRoleId,
      status: 'approved',
      updated_by: 'seeds'
    });
  }
  if (stateContractorId) {
    oktaAffiliations.push({
      user_id: stateContractorId,
      state_id: 'ak',
      role_id: stateContractorRoleId,
      status: 'approved',
      updated_by: 'seeds'
    });
  }
  return oktaAffiliations;
};

module.exports = {
  createUsersToAdd
};
