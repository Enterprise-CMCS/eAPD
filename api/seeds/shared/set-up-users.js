const moment = require('moment')
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
  const { id: requestedRoleId } =
    (await oktaClient.getUser('requestedrole')) || {};
  const { id: deniedRoleId } = (await oktaClient.getUser('deniedrole')) || {};
  const { id: revokedRoleId } = (await oktaClient.getUser('revokedrole')) || {};

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

  logger.info('Setting up affiliations and certifications to add');
  const oktaAffiliations = [];
  const stateCertifications = []

  if (regularUserId) {
    oktaAffiliations.push({
      user_id: regularUserId,
      state_id: 'ak',
      role_id: stateAdminRoleId,
      status: 'approved',
      updated_by: 'seeds'
    });
    // Add an expired certification and this user will be downgraded to "regular user"
    stateCertifications.push({
      uid: regularUserId,
      state: 'ak',
      certificationDate: moment().subtract(400, 'days'),
      certificationExpiration: moment().subtract(35, 'days'),
      certifiedBy: 'seeds'
    })
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
    // Add a valid certification and this user will remain an admin
    stateCertifications.push({
      uid: stateAdminId,
      state: 'ak',
      certificationDate: moment().subtract(40, 'days'),
      certificationExpiration: moment().add(325, 'days'),
      certifiedBy: 'seeds'
    })
  }
  if (stateStaffId) {
    oktaAffiliations.push({
      user_id: stateStaffId,
      state_id: 'ak',
      role_id: stateStaffRoleId,
      status: 'approved',
      updated_by: 'seeds'
    });
    // Add an invalid certification and this user will remain an staff member
    stateCertifications.push({
      uid: stateStaffId,
      state: 'ak',
      certificationDate: moment().subtract(400, 'days'),
      certificationExpiration: moment().subtract(35, 'days'),
      certifiedBy: 'seeds'
    })
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

  if (requestedRoleId) {
    oktaAffiliations.push({
      user_id: requestedRoleId,
      state_id: 'ak',
      status: 'requested'
    });
  }
  if (deniedRoleId) {
    oktaAffiliations.push({
      user_id: deniedRoleId,
      state_id: 'ak',
      status: 'denied'
    });
  }
  if (revokedRoleId) {
    oktaAffiliations.push({
      user_id: revokedRoleId,
      state_id: 'ak',
      status: 'revoked'
    });
  }
  return [oktaAffiliations, stateCertifications];
};

module.exports = {
  createUsersToAdd
};
