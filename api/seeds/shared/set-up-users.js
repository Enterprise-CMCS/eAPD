const logger = require('../../logger')('user seeder');
const { states } = require('../../util/states');

const formatOktaUser = oktaResult => {
  const {
    email,
    displayName,
    secondEmail,
    primaryPhone,
    mobilePhone,
    login
  } = oktaResult.profile;
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
  await knex('auth_affiliations').del();
  await knex('state_admin_certifications').del();
  await knex('state_admin_certifications_audit').del();
  await knex('okta_users').del();
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
      username: stateAdmin.profile.login
    });
    // Let them be a staffer in Maryland too
    oktaAffiliations.push({
      user_id: stateAdmin.id,
      state_id: 'md',
      role_id: stateStaffRoleId,
      status: 'approved',
      username: stateAdmin.profile.login
    });
    // Add a valid certification and this user will remain an admin
    stateCertifications.push({
      uploadedBy: fedAdmin.id,
      uploadedOn: new Date(),
      ffy: 2021,
      state: 'ak',
      name: `${stateAdmin.profile.firstName} ${stateAdmin.profile.lastName}`,
      email: stateAdmin.profile.primaryPhone,
      phone: stateAdmin.profile.email,
      certifiedByName: 'Test SMD',
      certifiedByTitle: 'State Medicaid Director',
      certifiedByEmail: 'testsmd@fake.com',
      certifiedBySignature: 'Test SMD',
      fileUrl: '12345', // Todo: Update this to have a valid fileUrl
      affiliationId: null
    });

    oktaUsers.push(formatOktaUser(stateAdmin));
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
  return { oktaAffiliations, stateCertifications, oktaUsers };
};

module.exports = {
  createUsersToAdd
};
