const logger = require('../logger')('user db');
const {
  userApplicationProfileUrl,
  oktaClient,
  callOktaEndpoint
} = require('../auth/oktaAuth');
const knex = require('./knex');

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

const updateUserApplicationProfile = async (
  id,
  updateValues,
  { client = oktaClient } = {}
) => {
  return client
    .getUser(id)
    .then(oktaUser => {
      let error;
      if (updateValues.affiliations) {
        error = 'Do not use this method to update affiliations';
        // eslint-disable-next-line no-param-reassign
        delete updateValues.affiliations;
      }
      // eslint-disable-next-line no-param-reassign
      oktaUser.userprofile = {
        ...oktaUser.userprofile,
        ...updateValues
      };
      return oktaUser
        .update()
        .then(() => {
          return { user: oktaUser, error };
        })
        .catch(() => {
          return { error: `User ${oktaUser.displayName} could not be updated` };
        });
    })
    .catch(err => {
      logger.error(err);
      return { error: `Could not find ${id}` };
    });
};

const userGroups = async (id, { client = callOktaEndpoint } = {}) => {
  return client(`/api/v1/users/${id}/groups`)
    .then(groups => groups)
    .catch(err => {
      logger.error(err);
      return [];
    });
};

const addUserToGroup = async (
  userId,
  groupId,
  { client = oktaClient, getGroups = userGroups } = {}
) => {
  return client
    .getUser(userId)
    .then(oktaUser => {
      return oktaUser
        .addToGroup(groupId)
        .then(async () => {
          const groups = await getGroups(userId);
          return {
            groups
          };
        })
        .catch(() => {
          return {
            error: `User ${oktaUser.displayName} could not be added to group`
          };
        });
    })
    .catch(err => {
      logger.error(err);
      return { error: `Could not find ${userId}` };
    });
};

const userApplicationProfile = async (
  id,
  { client = callOktaEndpoint, applicationUrl = userApplicationProfileUrl } = {}
) => {
  return client(applicationUrl(id))
    .then(response => response)
    .catch(err => {
      logger.error(err);
      return {};
    });
};

const populateUser = async (
  user,
  {
    db = knex,
    getGroups = userGroups,
    getApplicationProfile = userApplicationProfile
  } = {}
) => {
  if (user) {
    const populatedUser = user;

    // If there isn't a user.groups value try to retrive them
    const groups = user.groups || (await getGroups(user.id));

    if (groups && groups.length) {
      const authRole = await db('auth_roles').whereIn(
        ['name', 'isActive'],
        groups.map(group => [group, true])
      );

      if (authRole && authRole.length) {
        populatedUser.auth_roles = authRole.map(role => role.name);

        const roleIds = authRole.map(role => role.id);
        const authActivityIDs = authRole
          ? await db('auth_role_activity_mapping')
              .whereIn('role_id', roleIds)
              .select('activity_id')
          : [];

        const authActivityNames = await db('auth_activities')
          .whereIn(
            'id',
            // eslint-disable-next-line camelcase
            authActivityIDs.map(({ activity_id }) => activity_id)
          )
          .select('name');

        populatedUser.activities = authActivityNames.map(({ name }) => name);
      } else {
        populatedUser.auth_roles = [];
        populatedUser.activities = [];
      }
      delete populatedUser.groups;
    } else {
      populatedUser.auth_roles = [];
      populatedUser.activities = [];
    }

    if (!user.affiliations || !user.hasLoggedIn) {
      const { affiliations, hasLoggedIn } = await getApplicationProfile(
        user.id
      );
      populatedUser.affiliations = affiliations;
      populatedUser.hasLoggedIn = hasLoggedIn;
    }
    if (populatedUser.affiliations && populatedUser.affiliations.length) {
      const normalized = populatedUser.affiliations.map(affiliation =>
        affiliation.toLowerCase()
      );
      if (normalized.length) {
        populatedUser.state = await db('states')
          .whereIn('id', normalized)
          .select('id', 'name')
          .first(); // TODO: Handle having multiple affiliations
      }
    } else {
      populatedUser.state = {};
    }
    delete populatedUser.affiliations;

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
  updateUserApplicationProfile,
  addUserToGroup,
  userGroups,
  userApplicationProfile,
  populateUser,
  sanitizeUser
};
