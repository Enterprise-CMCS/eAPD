const { format } = require('date-fns');
const knex = require('./knex');


const getAuthActivities = async ({ db = knex } = {}) =>
  db('auth_activities').select();

const getAuthActivitiesByIDs = async (ids, { db = knex } = {}) =>
  db('auth_activities')
    .whereIn('id', ids)
    .select();

const getAuthRoleByID = async (roleID, { db = knex } = {}) =>
  db('auth_roles')
    .where('id', roleID)
    .first();

const getAuthRoleByName = async (roleName, { db = knex } = {}) =>
  db('auth_roles')
    .where('name', roleName)
    .first();

const getActiveAuthRoles = async ({ db = knex } = {}) => {
  const roles = await db('auth_roles')
    .where('isActive', true)
    .select();
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
        await db('auth_activities')
          .whereIn('id', activityIDs)
          .select('name')
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
const getRolesAndActivities = async ({ db = knex } = {}) =>
  db
    .select({
      id: 'roles.id',
      name: 'roles.name',
      activities: db.raw('array_agg(activities.name)'),
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
const getUserAffiliatedStates = async (userId, { db = knex } = {}) =>
  db
    .select('state_id')
    .from('auth_affiliations')
    .where('user_id', userId)
    .then(rows => rows.map(row => row.state_id));

/**
 * Retrieves a user's permissions per state
 * @async
 * @function
 * @returns {Object} { stateId: activities }
 */
const getUserPermissionsForStates = async (userId, { db = knex } = {}) => {
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

const isAdminForState = async (userId, stateId, {db = knex} = {}) => {
  const results = await db('auth_affiliations')
    .select('auth_affiliations.state_id')
    .join('state_admin_certifications', function joinFunc() {
      this.on(function joinOnFunc() {
        this.on('state_admin_certifications.username', '=', 'auth_affiliations.user_id')
        this.andOn('state_admin_certifications.state', '=', 'auth_affiliations.state_id')
      })
    })
    .where('auth_affiliations.user_id', userId)
    // only care about approved affiliations here.
    .where('auth_affiliations.status', 'approved')
    .where('state_admin_certifications.certificationExpiration', '>', format( new Date(), 'yyyy-MM-dd'))
    .where('auth_affiliations.state_id', stateId)

    return results.length > 0
}


module.exports = {
  getAuthActivities,
  getAuthActivitiesByIDs,
  getAuthRoleByID,
  getAuthRoleByName,
  getActiveAuthRoles,
  getRolesAndActivities,
  getUserAffiliatedStates,
  getUserPermissionsForStates,
  isAdminForState
};
