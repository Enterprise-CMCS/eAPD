import { getAllActiveRoles, getAllActivities } from '../../db/roles.js';

const seed = async knex => {
  await knex('auth_roles').insert({ isActive: true, name: 'eAPD Tester' });
  const [{ id: adminRoleId }] = await getAllActiveRoles(['eAPD Tester'], {
    db: knex
  });

  const activities = await getAllActivities();

  const adminActivities = activities.map(activity => ({
    role_id: adminRoleId,
    activity_id: activity.id
  }));

  await knex('auth_role_activity_mapping').insert(adminActivities);

  await knex('auth_roles').insert({
    isActive: true,
    name: 'eAPD No Permissions'
  });
  const [{ id: noPermissionsId }] = await getAllActiveRoles(
    ['eAPD No Permissions'],
    {
      db: knex
    }
  );
  await knex('auth_activities').insert({ name: 'no-activities' });
  const { id: noActivitiesId } = await knex('auth_activities')
    .select('id')
    .where({ name: 'no-activities' })
    .first();

  await knex('auth_role_activity_mapping').insert({
    role_id: noPermissionsId,
    activity_id: noActivitiesId
  });
};

export default seed;
