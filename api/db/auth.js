import isPast from 'date-fns/isPast';
import knex from './knex';

export const getAuthActivities = async ({ db = knex } = {}) =>
  db('auth_activities').select();

export const getAuthActivitiesByIDs = async (ids, { db = knex } = {}) =>
  db('auth_activities').whereIn('id', ids).select();

export const getAuthRoleByID = async (roleID, { db = knex } = {}) =>
  db('auth_roles').where('id', roleID).first();

export const getAuthRoleByName = async (roleName, { db = knex } = {}) =>
  db('auth_roles').where('name', roleName).first();

export const getActiveAuthRoles = async ({ db = knex } = {}) => {
  const roles = await db('auth_roles').where('isActive', true).select();
  await Promise.all(
    roles.map(async role => {
      const activityIDs = (
        await db('auth_role_activity_mapping')
          .where('role_id', role.id)
          // eslint-disable-next-line camelcase
          .select('activity_id')
      )
        // eslint-disable-next-line camelcase
        .map(({ activity_id }) => activity_id);

      const activities = (
        await db('auth_activities').whereIn('id', activityIDs).select('name')
      ).map(({ name }) => name);

      // eslint-disable-next-line no-param-reassign
      role.activities = activities;
    })
  );
  return roles;
};

/**
 * Retrieves active roles and associated activity names
 * @async
 * @function
 * @returns {Object} { id, name, activities: [] }
 */
export const getRolesAndActivities = async ({ db = knex } = {}) =>
  db
    .select({
      id: 'roles.id',
      name: 'roles.name',
      activities: db.raw('array_agg(activities.name)')
    })
    .from({ rolesActivities: 'auth_role_activity_mapping' })
    .join(
      { activities: 'auth_activities' },
      'activities.id',
      'rolesActivities.activity_id'
    )
    .join({ roles: 'auth_roles' }, 'roles.id', 'rolesActivities.role_id')
    .where('roles.isActive', true)
    .groupBy('roles.id');

/**
 * Retrieves a user's affiliated states
 * @async
 * @function
 * @returns {Array} state ids
 */
export const getUserAffiliatedStates = async (userId, { db = knex } = {}) =>
  db
    .select('state_id', 'status')
    .from('auth_affiliations')
    .where('user_id', userId)
    .then(rows =>
      rows.reduce((states, row) => {
        // eslint-disable-next-line no-param-reassign
        states[row.state_id] = row.status;
        return states;
      }, {})
    );

/**
 * Retrieves all affiliations tied to a user
 * @async
 * @function
 * @returns {Array}
 */
export const getExpiredUserAffiliations = async (userId, { db = knex } = {}) =>
  db('auth_affiliations')
    .select()
    .where('user_id', userId)
    .then(rows => {
      const expiredRows = rows.filter(row => isPast(row.expires_at));
      return expiredRows;
    });

/**
 * Retrieves a single affiliation by user per state
 * @async
 * @function
 * @returns {Object}
 */
export const getAffiliationByState = async (
  userId,
  stateId,
  { db = knex } = {}
) =>
  db('auth_affiliations')
    .where('user_id', userId)
    .andWhere('state_id', stateId)
    .select()
    .first();

/**
 * Retrieves a user's permissions per state
 * @async
 * @function
 * @returns {Object} { stateId: activities }
 */
export const getUserPermissionsForStates = async (
  userId,
  { db = knex } = {}
) => {
  const roles = (await getRolesAndActivities()) || [];

  return db
    .select({
      stateId: 'state_id',
      roleId: 'role_id'
    })
    .from('auth_affiliations')
    .where('user_id', userId)
    .then(rows =>
      rows.reduce((result, row) => {
        const { stateId, roleId } = row;
        const activities = roleId
          ? roles.find(role => role.id === roleId).activities
          : [];
        return { ...result, [stateId]: activities };
      }, {})
    );
};

/**
 * Retrieves adds a log to the audit table to show that a user has logged into a state
 * @async
 * @function
 * @returns {Object}
 */
export const auditUserLogin = async (
  { user_id, username, name, state_id, role_id, status }, // eslint-disable-line camelcase
  { db = knex } = {}
) =>
  db('okta_user_audit').insert({
    user_id, // eslint-disable-line camelcase
    username,
    name,
    state_id, // eslint-disable-line camelcase
    role_id, // eslint-disable-line camelcase
    affiliation_status: status
  });
