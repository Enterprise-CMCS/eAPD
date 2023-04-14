import { format } from 'date-fns';
import loggerFactory from '../../logger/index.js';
import states from '../../util/states.js';

const logger = loggerFactory('user seeder');

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
  const { email, displayName, login } = oktaResult.profile;
  return {
    user_id: oktaResult.id,
    email,
    displayName,
    login
  };
};

const createUsersToAdd = async (knex, oktaClient) => {
  logger.info('Retrieving user ids from Okta');

  const regularUser = (await oktaClient.getUser('em@il.com')) || {};
  const sysAdmin = (await oktaClient.getUser('sysadmin')) || {};
  const fedAdmin = (await oktaClient.getUser('fedadmin')) || {};
  const stateAdmin = (await oktaClient.getUser('stateadmin')) || {};
  const pendingAdmin = (await oktaClient.getUser('pendingadmin')) || {};
  const expiredAdmin = (await oktaClient.getUser('expiredadmin')) || {};
  const stateStaff = (await oktaClient.getUser('statestaff')) || {};
  const stateContractor = (await oktaClient.getUser('statecontractor')) || {};
  const requestedRole = (await oktaClient.getUser('requestedrole')) || {};
  const deniedRole = (await oktaClient.getUser('deniedrole')) || {};
  const revokedRole = (await oktaClient.getUser('revokedrole')) || {};
  const betaUser = (await oktaClient.getUser('betauser')) || {};
  const mfaUser = (await oktaClient.getUser('mfa@email.com')) || {};
  const resetmfa = (await oktaClient.getUser('resetmfa')) || {};

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
      username: 'em@il.com',
      expires_at: format(
        new Date(new Date().getFullYear() + 1, '06', '30'),
        PostgresDateFormat
      )
    });
    oktaUsers.push(formatOktaUser(regularUser));
  }

  if (mfaUser) {
    oktaAffiliations.push({
      user_id: mfaUser.id,
      state_id: 'ak',
      role_id: stateStaffRoleId,
      status: 'approved',
      username: 'em@il.com'
    });
    oktaUsers.push(formatOktaUser(mfaUser));
  }

  if (fedAdmin) {
    oktaAffiliations.push({
      user_id: fedAdmin.id,
      state_id: 'fd',
      role_id: fedAdminRoleId,
      status: 'approved',
      username: fedAdmin.profile.login
    });
    oktaUsers.push(formatOktaUser(fedAdmin));
  }

  if (stateAdmin) {
    oktaAffiliations.push({
      user_id: stateAdmin.id,
      state_id: 'ak',
      role_id: stateAdminRoleId,
      status: 'approved',
      username: fedAdmin.profile.login,
      expires_at: format(
        new Date(new Date().getFullYear() + 1, '06', '30'),
        PostgresDateFormat
      )
    });
    oktaUsers.push(formatOktaUser(stateAdmin));
  }

  if (expiredAdmin) {
    oktaAffiliations.push({
      user_id: expiredAdmin.id,
      state_id: 'ak',
      role_id: stateAdminRoleId,
      status: 'approved',
      username: fedAdmin.profile.login,
      expires_at: format(
        new Date(new Date().getFullYear() - 1, '06', '30'),
        PostgresDateFormat
      )
    });
    oktaUsers.push(formatOktaUser(expiredAdmin));
  }

  if (pendingAdmin) {
    oktaAffiliations.push({
      id: 1001, // manually set id for testing
      user_id: pendingAdmin.id,
      state_id: 'ak',
      role_id: stateStaffRoleId,
      status: 'approved',
      username: pendingAdmin.profile.login
    });
    // Let them be a staffer in Maryland too
    oktaAffiliations.push({
      user_id: pendingAdmin.id,
      state_id: 'md',
      role_id: stateStaffRoleId,
      status: 'approved',
      username: pendingAdmin.profile.login
    });
    // Add a valid certification and this user will remain an admin
    stateCertifications.push({
      id: 1002, // manually set id for testing
      ffy: currentFfy,
      name: `${pendingAdmin.profile.firstName} ${pendingAdmin.profile.lastName}`,
      state: 'ak',
      email: pendingAdmin.profile.email,
      uploadedBy: fedAdmin.id,
      uploadedOn: new Date(),
      fileUrl:
        'http://localhost:8081/auth/certifications/files/eAPDSystemAccess.pdf',
      affiliationId: null,
      status: 'active'
    });

    stateCertifications.push({
      ffy: currentFfy,
      name: `${pendingAdmin.profile.firstName} ${pendingAdmin.profile.lastName}`,
      state: 'tn',
      email: pendingAdmin.profile.email,
      uploadedBy: fedAdmin.id,
      uploadedOn: new Date(),
      fileUrl:
        'http://localhost:8081/auth/certifications/files/eAPDSystemAccess.pdf',
      affiliationId: null,
      status: 'active'
    });
    oktaUsers.push(formatOktaUser(pendingAdmin));
  }

  if (stateStaff) {
    oktaAffiliations.push({
      user_id: stateStaff.id,
      state_id: 'ak',
      role_id: stateStaffRoleId,
      status: 'approved',
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
      username: stateContractor.profile.login
    });
    oktaUsers.push(formatOktaUser(stateContractor));
  }

  if (requestedRole) {
    oktaAffiliations.push({
      user_id: requestedRole.id,
      state_id: 'ak',
      status: 'requested',
      username: requestedRole.profile.login
    });

    oktaUsers.push(formatOktaUser(requestedRole));
  }

  if (deniedRole) {
    oktaAffiliations.push({
      user_id: deniedRole.id,
      state_id: 'ak',
      status: 'denied',
      username: deniedRole.profile.login
    });
    oktaUsers.push(formatOktaUser(deniedRole));
  }

  if (revokedRole) {
    oktaAffiliations.push({
      user_id: revokedRole.id,
      state_id: 'ak',
      status: 'revoked',
      username: revokedRole.profile.login
    });

    oktaUsers.push(formatOktaUser(revokedRole));
  }

  if (betaUser) {
    oktaAffiliations.push({
      user_id: betaUser.id,
      state_id: 'ak',
      role_id: stateStaffRoleId,
      status: 'approved',
      username: betaUser.profile.login
    });
    oktaUsers.push(formatOktaUser(betaUser));
  }

  if (resetmfa) {
    oktaAffiliations.push({
      user_id: resetmfa.id,
      state_id: 'ak',
      role_id: stateStaffRoleId,
      status: 'approved',
      username: resetmfa.profile.login
    });
    oktaUsers.push(formatOktaUser(resetmfa));
  }

  return { oktaAffiliations, stateCertifications, oktaUsers };
};

export default createUsersToAdd;
