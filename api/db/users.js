const logger = require('../logger')('user db');
const {
  userApplicationProfileUrl,
  oktaClient,
  callOktaEndpoint
} = require('../auth/oktaAuth');
const knex = require('./knex');
const {
  getRoles,
  getUserAffiliatedStates,
  getUserPermissionsForStates
} = require('./auth');

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

const populateUser = async (user) => {
  if (user) {
    const populatedUser = user;
    populatedUser.permissions = await getUserPermissionsForStates(user.id);
    populatedUser.states = await getUserAffiliatedStates(user.id);
    populatedUser.affiliations = await knex.select('*').from('auth_affiliations').where({ user_id: user.id });

    // maintain state, role, and activities fields for the user
    const affiliation = await knex
      .select({
        stateId: 'state_id',
        roleId: 'role_id',
        userId: 'user_id'
      })
      .from('auth_affiliations')
      .where({
        user_id: user.id,
        status: 'approved'
      })
      .first();

    const roles = await getRoles();
    const role = affiliation && roles.find(role => role.id === affiliation.roleId);

    populatedUser.state = affiliation && affiliation.stateId && await knex.select('*').from('states').where({ id: affiliation.stateId }).first();
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
