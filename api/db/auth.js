/* eslint-disable camelcase */
const knex = require('./knex');

const createAuthRole = async (name, activityIDs, { db = knex } = {}) => {
  const transaction = await db.transaction();

  const roleID = await transaction('auth_roles')
    .insert({ name })
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

const getAuthRoles = async ({ db = knex } = {}) => {
  const roles = await db('auth_roles').select();
  await Promise.all(
    roles.map(async role => {
      const activityIDs = (
        await db('auth_role_activity_mapping')
          .where('role_id', role.id)
          // eslint-disable-next-line camelcase
          .select('activity_id')
      ).map(({ activity_id }) => activity_id);

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

const updateAuthRole = async (id, name, activities, { db = knex } = {}) => {
  const transaction = await db.transaction();
  if (name) {
    await transaction('auth_roles')
      .where('id', id)
      .update({ name });
  }

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
  getAuthRoles,
  updateAuthRole
};
