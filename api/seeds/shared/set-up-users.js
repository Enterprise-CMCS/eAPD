const { addYears, format } = require('date-fns');
const logger = require('../../logger')('user seeder');
const { states } = require('../../util/states');

const today = new Date();

const currentFfy = (() => {
  const year = new Date().getFullYear();

  // Federal fiscal year starts October 1,
  // but Javascript months start with 0 for
  // some reason, so October is month 9.
  if (new Date().getMonth() > 8) {
    return year + 1;
  }
  return year;
})();

const PostgresDateFormat = 'yyyy-MM-dd HH:mm:ss';

const formatOktaUser = oktaResult => {
  const { email, displayName, secondEmail, primaryPhone, mobilePhone, login } =
    oktaResult.profile;
  return {
    user_id: oktaResult.id,
    email,
    // metadata: JSON.stringify(oktaResult.profile),
    displayName,
    secondEmail,
    primaryPhone,
    mobilePhone,
    login
  };
};

const createUsersToAdd = async (knex, oktaClient) => {
  logger.info('Retrieving user ids from Okta');
  const regularUser = (await oktaClient.getUser('em@il.com')) || {};
  const sysAdmin = (await oktaClient.getUser('sysadmin')) || {};
  const fedAdmin = (await oktaClient.getUser('fedadmin')) || {};
  const stateAdmin = (await oktaClient.getUser('stateadmin')) || {};
  const stateStaff = (await oktaClient.getUser('statestaff')) || {};
  const stateContractor = (await oktaClient.getUser('statecontractor')) || {};
  const resetmfa = (await oktaClient.getUser('resetmfa')) || {};
  const requestedRole = (await oktaClient.getUser('requestedrole')) || {};
  const deniedRole = (await oktaClient.getUser('deniedrole')) || {};
  const revokedRole = (await oktaClient.getUser('revokedrole')) || {};

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
  const oktaUsers = [];

  if (sysAdmin) {
    states.forEach(state => {
      oktaAffiliations.push({
        user_id: sysAdmin.id,
        state_id: state.id,
        role_id: sysAdminRoleId,
        status: 'approved',
        expires_at: format(addYears(new Date(), 1), PostgresDateFormat),
        username: 'sysadmin'
      });
    });
    oktaUsers.push(formatOktaUser(sysAdmin));
  }
  if (regularUser) {
    oktaAffiliations.push({
      user_id: regularUser.id,
      state_id: 'ak',
      role_id: stateAdminRoleId,
      status: 'approved',
      expires_at: format(addYears(new Date(), 1), PostgresDateFormat),
      username: 'em@il.com'
    });
    oktaUsers.push(formatOktaUser(regularUser));
  }
  if (fedAdmin) {
    oktaAffiliations.push({
      user_id: fedAdmin.id,
      state_id: 'fd',
      role_id: fedAdminRoleId,
      status: 'approved',
      expires_at: format(addYears(new Date(), 1), PostgresDateFormat),
      username: fedAdmin.profile.login
    });
    oktaUsers.push(formatOktaUser(fedAdmin));
  }
  if (stateAdmin) {
    oktaAffiliations.push({
      id: 1001, // manually set id for testing
      user_id: stateAdmin.id,
      state_id: 'ak',
      role_id: stateAdminRoleId,
      status: 'approved',
      username: stateAdmin.profile.login,
      expires_at: format(
        new Date(new Date().getFullYear() + 1, '06', '30'),
        PostgresDateFormat
      )
    });
    // Let them be a staffer in Maryland too
    oktaAffiliations.push({
      user_id: stateAdmin.id,
      state_id: 'md',
      role_id: stateStaffRoleId,
      status: 'approved',
      expires_at: format(
        new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()),
        PostgresDateFormat
      ),
      username: stateAdmin.profile.login
    });
    // Add a valid certification and this user will remain an admin
    stateCertifications.push({
      id: 1002, // manually set id for testing
      ffy: currentFfy,
      name: `${stateAdmin.profile.firstName} ${stateAdmin.profile.lastName}`,
      state: 'ak',
      email: stateAdmin.profile.email,
      phone: stateAdmin.profile.primaryPhone,
      uploadedBy: fedAdmin.id,
      uploadedOn: new Date(),
      fileUrl:
        'http://localhost:8081/auth/certifications/files/eAPDSystemAccess.pdf',
      affiliationId: null,
      status: 'active'
    });

    stateCertifications.push({
      ffy: currentFfy,
      name: `${stateAdmin.profile.firstName} ${stateAdmin.profile.lastName}`,
      state: 'tn',
      email: stateAdmin.profile.email,
      phone: stateAdmin.profile.primaryPhone,
      uploadedBy: fedAdmin.id,
      uploadedOn: new Date(),
      fileUrl:
        'http://localhost:8081/auth/certifications/files/eAPDSystemAccess.pdf',
      affiliationId: null,
      status: 'active'
    });
    oktaUsers.push(formatOktaUser(stateAdmin));
  }

  if (stateStaff) {
    oktaAffiliations.push({
      user_id: stateStaff.id,
      state_id: 'ak',
      role_id: stateStaffRoleId,
      status: 'approved',
      expires_at: format(addYears(new Date(), 1), PostgresDateFormat),
      username: stateStaff.profile.login
    });
    oktaUsers.push(formatOktaUser(stateStaff));
  }
  if (stateContractor) {
    oktaAffiliations.push({
      user_id: stateContractor.id,
      state_id: 'ak',
      role_id: stateContractorRoleId,
      status: 'approved',
      expires_at: format(addYears(new Date(), 1), PostgresDateFormat),
      username: stateContractor.profile.login
    });
    oktaUsers.push(formatOktaUser(stateContractor));
  }

  if (resetmfa) {
    oktaAffiliations.push({
      user_id: resetmfa.id,
      state_id: 'ak',
      role_id: stateStaffRoleId,
      status: 'approved',
      expires_at: format(addYears(new Date(), 1), PostgresDateFormat),
      username: resetmfa.profile.login
    });
    oktaUsers.push(formatOktaUser(resetmfa));
  }

  if (requestedRole) {
    oktaAffiliations.push({
      user_id: requestedRole.id,
      state_id: 'ak',
      status: 'requested',
      expires_at: format(addYears(new Date(), 1), PostgresDateFormat),
      username: requestedRole.profile.login
    });

    oktaUsers.push(formatOktaUser(requestedRole));
  }
  if (deniedRole) {
    oktaAffiliations.push({
      user_id: deniedRole.id,
      state_id: 'ak',
      status: 'denied',
      expires_at: format(addYears(new Date(), 1), PostgresDateFormat),
      username: deniedRole.profile.login
    });
    oktaUsers.push(formatOktaUser(deniedRole));
  }
  if (revokedRole) {
    oktaAffiliations.push({
      user_id: revokedRole.id,
      state_id: 'ak',
      status: 'revoked',
      expires_at: format(addYears(new Date(), 1), PostgresDateFormat),
      username: revokedRole.profile.login
    });

    oktaUsers.push(formatOktaUser(revokedRole));
  }
  return { oktaAffiliations, stateCertifications, oktaUsers };
};

module.exports = {
  createUsersToAdd
};
