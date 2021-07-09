const logger = require('../logger')('db/users');
const { oktaClient } = require('../auth/oktaAuth');
const knex = require('./knex');
const {
  getRolesAndActivities: actualGetRolesAndActivities,
  getUserAffiliatedStates: actualGetUserAffiliatedStates,
  isAdminForState: actualIsAdminForState
} = require('./auth');
const { getStateById: actualGetStateById } = require('./states');
const { createOrUpdateOktaUser, getOktaUser } = require('./oktaUsers');

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

const actualGetRole = async (affiliation, {
                         getRolesAndActivities = actualGetRolesAndActivities,
                         isAdminForState = actualIsAdminForState
                       } = {}
) => {

  let roleId = affiliation.role_id;
  const roles = (await getRolesAndActivities()) || [];
  const isAdmin = await isAdminForState(affiliation.user_id, affiliation.state_id);

  if (isAdmin) {
    const adminRole = roles.find(r => r.name === 'eAPD State Admin');
    roleId = adminRole.id;
  }

  return roles.find(r => r.id === roleId)
};

const actualGetAffiliationsByUserId = (id, { db = knex } = {}) => {
  return db.select('*').from('auth_affiliations').where({ user_id: id });
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
    getUserAffiliatedStates = actualGetUserAffiliatedStates,
    getStateById = actualGetStateById,
    getSelectedStateIdByUserId = actualGetSelectedStateIdByUserId,
    getAffiliationsByUserId = actualGetAffiliationsByUserId,
    getRole = actualGetRole
  } = {}
) => {
  if (user) {
    const populatedUser = user;
    populatedUser.states = (await getUserAffiliatedStates(user.id)) || [];
    populatedUser.affiliations = (await getAffiliationsByUserId(user.id)) || [];
    const permissions = populatedUser.affiliations.map(async affiliation => {
      const role = await getRole(affiliation);
      return {[affiliation.state_id]: role.activities}
    })
    populatedUser.permissions = await Promise.all(permissions)
    // grab the selected affiliation
    const selectedStateId = await getSelectedStateIdByUserId(user.id);
    logger.info({ selectedStateId, uid: user.id });
    const affiliations = (await getAffiliationsByUserId(user.id)) || [];

    let affiliation;
    if (selectedStateId) {
      affiliation = affiliations.find(a => a.state_id === selectedStateId);
    } else {
      // grab the first affiliation if none selected
      affiliation = affiliations.find(Boolean);
    }
    if (affiliation) {
      const role = await getRole(affiliation);

      populatedUser.state =
        affiliation.state_id &&
        (await getStateById(affiliation.state_id));
      populatedUser.role = role && role.name;
      populatedUser.activities = (role && role.activities) || [];
    }
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
  checkOkta,
  {
    clean = true,
    client = oktaClient,
    populate = populateUser,
    additionalValues,
    db
  } = {}
) => {
  let oktaUser;
  if (checkOkta) {
    oktaUser = await client.getUser(id);
    if (oktaUser) {
      await createOrUpdateOktaUser(oktaUser.id, oktaUser.profile.email);
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
  populateUser,
  sanitizeUser,
  actualGetRole
};
