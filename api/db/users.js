const { oktaClient } = require('../auth/oktaAuth');
const knex = require('./knex');
const {
  getRoles: actualGetRoles,
  getUserAffiliatedStates: actualGetUserAffiliatedStates,
  getUserPermissionsForStates: actualGetUserPermissionsForStates
} = require('./auth');
const { getStateById: actualGetStateById } = require('./states');

const sanitizeUser = user => ({
  activities: user.activities,
  hasLoggedIn: user.hasLoggedIn,
  id: user.id,
  name: user.displayName,
  permissions: user.permissions,
  phone: user.primaryPhone,
  role: user.role,
  roles: user.auth_roles,
  state: user.state,
  states: user.states,
  username: user.login,
});

const actualGetAffiliationsByUserId = (id, { db = knex } = {}) => {
  return db
    .select('*')
    .from('auth_affiliations')
    .where({ user_id: id });
}

const populateUser = async (user, {
  getUserPermissionsForStates = actualGetUserPermissionsForStates,
  getUserAffiliatedStates = actualGetUserAffiliatedStates,
  getAffiliationsByUserId = actualGetAffiliationsByUserId,
  getStateById = actualGetStateById,
  getRoles = actualGetRoles
} = {}) => {
  if (user) {
    const populatedUser = user;
    populatedUser.permissions = await getUserPermissionsForStates(user.id);
    populatedUser.states = await getUserAffiliatedStates(user.id);
    populatedUser.affiliations = await getAffiliationsByUserId(user.id);

    // maintain state, role, and activities fields for the user

    // grab the first affiliation
    const affiliation = populatedUser.affiliations.find(Boolean);
    const roles = await getRoles();
    const role = affiliation && roles.find(role => role.id === affiliation.roleId);

    populatedUser.state = affiliation && affiliation.stateId && await getStateById(affiliation.stateId);
    populatedUser.role = role && role.name;
    populatedUser.activities = (role && role.activities) || [];

    return populatedUser;
  }
  return user;
};

const getAllUsers = async ({
  clean = true,
  client = oktaClient,
  populate = populateUser
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
  {
    clean = true,
    client = oktaClient,
    populate = populateUser,
    additionalValues
  } = {}
) => {
  const oktaUser = await client.getUser(id);

  if (oktaUser && oktaUser.status === 'ACTIVE') {
    const { profile } = oktaUser;
    const user = await populate({ id, ...profile, ...additionalValues });
    return user && clean ? sanitizeUser(user) : user;
  }
  return null;
};

module.exports = {
  getAllUsers,
  getUserByID,
  populateUser,
  sanitizeUser
};
