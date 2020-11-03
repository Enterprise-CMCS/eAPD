const logger = require('../logger')('user db');
const {
  userApplicationProfileUrl,
  oktaClient,
  callOktaEndpoint
} = require('../auth/oktaAuth');
const knex = require('./knex');
const {
  getUserAffiliatedStates,
  getUserPermissionsForStates
} = require('./auth');

const sanitizeUser = user => ({
  activities: user.activities,
  id: user.id,
  name: user.displayName,
  phone: user.primaryPhone,
  roles: user.auth_roles,
  username: user.login,
  state: user.state,
  hasLoggedIn: user.hasLoggedIn
});

const populateUser = async (user) => {
  if (user) {
    const populatedUser = user;
    populatedUser.permissions = await getUserPermissionsForStates(user.id);
    populatedUser.states = await getUserAffiliatedStates(user.id);
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
