const logger = require('../logger')('db/users');
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
  affiliations: user.affiliations,
  id: user.id,
  name: user.displayName,
  permissions: user.permissions,
  phone: user.primaryPhone,
  role: user.role,
  roles: user.auth_roles,
  state: user.state,
  states: user.states,
  username: user.login
});

const actualGetAffiliationsByUserId = (id, { db = knex } = {}) => {
  return db
    .select('*')
    .from('auth_affiliations')
    .where({ user_id: id });
};

const actualGetSelectedStateIdByUserId = (id, { db = knex } = {}) => {
  return db
    .select('state_id')
    .from('users')
    .where({ uid: id })
    .first()
    .then(result => (result ? result.state_id : undefined));
};

const populateUser = async (
  user,
  {
    getUserPermissionsForStates = actualGetUserPermissionsForStates,
    getUserAffiliatedStates = actualGetUserAffiliatedStates,
    getStateById = actualGetStateById,
    getRoles = actualGetRoles,
    getSelectedStateIdByUserId = actualGetSelectedStateIdByUserId,
    getAffiliationsByUserId = actualGetAffiliationsByUserId
  } = {}
) => {
  if (user) {
    const populatedUser = user;
    populatedUser.permissions = await getUserPermissionsForStates(user.id);
    populatedUser.states = await getUserAffiliatedStates(user.id);
    populatedUser.affiliations = await getAffiliationsByUserId(user.id);

    // grab the selected affiliation
    const selectedStateId = await getSelectedStateIdByUserId(user.id);
    logger.info({ selectedStateId, uid: user.id });
    const affiliations = await getAffiliationsByUserId(user.id);

    let affiliation;
    if (selectedStateId) {
      affiliation = affiliations.find(a => a.state_id === selectedStateId);
    } else {
      // grab the first affiliation if none selected
      affiliation = affiliations.find(Boolean);
    }

    const roles = await getRoles();
    const role = affiliation && roles.find(r => r.id === affiliation.role_id);

    populatedUser.state =
      affiliation &&
      affiliation.state_id &&
      (await getStateById(affiliation.state_id));
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
