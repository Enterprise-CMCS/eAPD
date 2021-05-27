const { addDays, format, subDays } = require('date-fns');
const logger = require('../../logger')('user seeder');
const { states } = require('../../util/states');

const PostgresDateFormat = 'yyyy-MM-dd HH:mm:ss';

const createUsersToAdd = async (knex, oktaClient) => {
  await knex('auth_affiliations').del();
  await knex('state_admin_certifications').del();
  await knex('state_admin_certifications_audit').del();
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

  logger.info('Setting up affiliations and certifications to add');
  const oktaAffiliations = [];
  const stateCertifications = [];

  if (sysAdminId) {
    oktaAffiliations.concat(
      states.map(state => ({
        user_id: sysAdminId,
        state_id: state.id,
        role_id: sysAdminRoleId,
        status: 'approved',
        updated_by: 'seeds',
        username: 'sysadmin'
      }))
    );
  }
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
      username: regularUserId,
      state: 'ak',
      certificationDate: format(subDays(new Date(), 400), PostgresDateFormat),
      certificationExpiration: format(
        subDays(new Date(), 35),
        PostgresDateFormat
      ),
      certifiedBy: 'seeds'
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
    // Add a valid certification and this user will remain an admin
    stateCertifications.push({
      username: stateAdminId,
      state: 'ak',
      certificationDate: format(subDays(new Date(), 40), PostgresDateFormat),
      certificationExpiration: format(
        addDays(new Date(), 325),
        PostgresDateFormat
      ),
      certifiedBy: 'seeds'
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
    // Add an invalid certification and this user will remain an staff member
    stateCertifications.push({
      username: stateStaffId,
      state: 'ak',
      certificationDate: format(subDays(new Date(), 400), PostgresDateFormat),
      certificationExpiration: format(
        subDays(new Date(), 35),
        PostgresDateFormat
      ),
      certifiedBy: 'seeds'
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
  return { oktaAffiliations, stateCertifications };
};

module.exports = {
  createUsersToAdd
};
