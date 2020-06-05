const knex = require('./knex');

const createAuthRole = async (
  name,
  isActive,
  activityIDs,
  { db = knex } = {}
) => {
  const transaction = await db.transaction();

  const roleID = await transaction('auth_roles')
    .insert({ name, isActive })
    .returning('id');

  await transaction('auth_role_activity_mapping').insert(
    activityIDs.map(activityID => ({
      role_id: roleID[0],
      activity_id: activityID
    }))
  );

  await transaction.commit();

  return roleID[0];
};

const deleteAuthRole = async (roleID, { db = knex } = {}) => {
  const transaction = await db.transaction();

  await transaction('auth_role_activity_mapping')
    .where('role_id', roleID)
    .delete();

  await transaction('auth_roles')
    .where('id', roleID)
    .delete();

  await transaction.commit();
};

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

const updateAuthRole = async (
  id,
  name,
  isActive,
  activities,
  { db = knex } = {}
) => {
  const transaction = await db.transaction();

  // if either name or isActive is undefined it will be ignored by the update
  await transaction('auth_roles')
    .where('id', id)
    .update({ name, isActive });

  await transaction('auth_role_activity_mapping')
    .where('role_id', id)
    .delete();

  await transaction('auth_role_activity_mapping').insert(
    activities.map(activity => ({
      role_id: id,
      activity_id: activity
    }))
  );

  await transaction.commit();
};

module.exports = {
  createAuthRole,
  deleteAuthRole,
  getAuthActivities,
  getAuthActivitiesByIDs,
  getAuthRoleByID,
  getAuthRoleByName,
  getActiveAuthRoles,
  updateAuthRole
};
