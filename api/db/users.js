const isPast = require('date-fns/isPast');
const { oktaClient } = require('../auth/oktaAuth');
const knex = require('./knex');
const {
  getUserAffiliatedStates: actualGetUserAffiliatedStates,
  getAffiliationByState: actualGetAffiliationsByState,
  getUserPermissionsForStates: actualGetUserPermissionsForStates,
  getRolesAndActivities: actualGetRolesAndActivities,
  auditUserLogin: actualAuditUserLogin,
  getAuthRoleByName: actualGetAuthRoleByName
} = require('./auth');
const {
  updateAuthAffiliation: actualUpdateAuthAffiliation
} = require('./affiliations');
const { getStateById: actualGetStateById } = require('./states');
const { createOrUpdateOktaUser, getOktaUser } = require('./oktaUsers');

const sanitizeUser = user => ({
  activities: user.activities,
  affiliation: user.affiliation,
  id: user.id,
  name: user.displayName,
  permissions: user.permissions,
  phone: user.primaryPhone,
  role: user.role,
  state: user.state,
  states: user.states,
  username: user.login
});

/**
 *
 * @param {*} user
 * @param {*} stateId
 * @param {*} param2
 * @returns
 */
const userLoggedIntoState = async (
  { name, states, displayName, affiliation } = {},
  stateId = null,
  { auditUserLogin = actualAuditUserLogin } = {}
) => {
  if (affiliation && (stateId || Object.keys(states).length === 1)) {
    // we should only record the user logging in if they have specified a state
    // or if they are only affiliated with one state
    await auditUserLogin({
      ...affiliation,
      name: name || displayName
    });
  }
};

/**
 * Populates a user with their role and permissions for the state passed in
 * if no state is passed in it will use the first state the user is affiliated
 * with. If the affiliation is expired, it will update it to revoke the user's
 * access to the state. The audit table will also be updated to show that the
 * user has logged into the state.
 *
 * @param {*} user object retrieved from jwt
 * @param {*} stateId state id to populate user permissions for
 * @returns user object with permissions for the state
 */
const populateUserRole = async (
  user,
  stateId = null,
  {
    getUserAffiliatedStates = actualGetUserAffiliatedStates,
    getAffiliationByState = actualGetAffiliationsByState,
    updateAuthAffiliation = actualUpdateAuthAffiliation,
    getRolesAndActivities = actualGetRolesAndActivities,
    getStateById = actualGetStateById,
    getUserPermissionsForStates = actualGetUserPermissionsForStates,
    getAuthRoleByName = actualGetAuthRoleByName
  } = {}
) => {
  if (user) {
    let affiliation = {};
    let role = '';
    let state = {};
    const states = (await getUserAffiliatedStates(user.id)) || {};
    if (Object.keys(states).length) {
      const selectedState = stateId || Object.keys(states)[0];
      affiliation = await getAffiliationByState(user.id, selectedState);
      if (affiliation) {
        const { id: stateAdminId = 0 } = await getAuthRoleByName(
          'eAPD State Admin'
        );
        if (
          affiliation.status === 'approved' &&
          affiliation.role_id === stateAdminId &&
          isPast(new Date(affiliation.expires_at))
        ) {
          await updateAuthAffiliation({
            affiliationId: affiliation.id,
            newRoleId: -1,
            newStatus: 'revoked',
            changedBy: 'system',
            stateId: affiliation.state_id,
            ffy: null
          });

          affiliation.role_id = null;
          affiliation.status = 'revoked';
        }

        const roles = (await getRolesAndActivities()) || [];
        role = affiliation && roles.find(r => r.id === affiliation.role_id);
        state = (await getStateById(selectedState)) || {};
        const permissions = (await getUserPermissionsForStates(user.id)) || [];
        return {
          ...user,
          state,
          states,
          role: role && role.name,
          affiliation,
          activities: permissions[selectedState],
          permissions: [{ [selectedState]: permissions[selectedState] }]
        };
      }
    }
    return {
      ...user,
      state,
      states,
      role,
      affiliation,
      activities: [],
      permissions: []
    };
  }
  return null;
};

const getAllUsers = async ({
  clean = true,
  client = oktaClient,
  populate = populateUserRole
} = {}) => {
  const users = await client.listUsers();

  const full = await Promise.all(users.map(user => populate(user)));

  if (clean) {
    return full.map(sanitizeUser);
  }
  return full;
};

const getUserByID = async (
  id,
  checkOkta,
  {
    clean = true,
    client = oktaClient,
    populate = populateUserRole,
    additionalValues,
    db = knex
  } = {}
) => {
  let oktaUser;
  if (checkOkta) {
    oktaUser = await client.getUser(id);
    if (oktaUser) {
      const {
        id: oktaId,
        profile: {
          email,
          displayName,
          secondEmail,
          primaryPhone,
          mobilePhone,
          login,
          ...metadata
        }
      } = oktaUser;
      await createOrUpdateOktaUser(oktaId, {
        email,
        displayName,
        secondEmail,
        primaryPhone,
        mobilePhone,
        login,
        metadata
      });
    }
  } else {
    oktaUser = await getOktaUser(id, { db });
    if (oktaUser) {
      // since we are not talking to Okta here, assume they are active since they are in the DB,
      // maybe we need to store this though
      oktaUser.status = 'ACTIVE';
    }
  }
  if (oktaUser && oktaUser.status === 'ACTIVE') {
    const user = await populate({
      id,
      ...oktaUser.profile,
      ...additionalValues
    });
    return user && clean ? sanitizeUser(user) : user;
  }
  return null;
};

module.exports = {
  getAllUsers,
  getUserByID,
  populateUserRole,
  sanitizeUser,
  userLoggedIntoState
};