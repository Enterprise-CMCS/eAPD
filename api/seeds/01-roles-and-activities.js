const setupActivities = async activitiesTable => {
  await activitiesTable.insert({ id: 1, name: 'view-all-apds' });
  await activitiesTable.insert({ id: 2, name: 'comment-on-apd' });
  await activitiesTable.insert({ id: 3, name: 'send-apd-to-state' });
  await activitiesTable.insert({ id: 4, name: 'view-own-apds' });
  await activitiesTable.insert({ id: 5, name: 'create-apd' });
  await activitiesTable.insert({ id: 6, name: 'view-roles' });
  await activitiesTable.insert({ id: 7, name: 'create-roles' });
  await activitiesTable.insert({ id: 8, name: 'edit-roles' });
};

const setupRoles = async rolesTable => {
  await rolesTable.insert({ id: 1, name: 'admin' });
  await rolesTable.insert({ id: 2, name: 'cms-reviewer' });
  await rolesTable.insert({ id: 3, name: 'state-submitter' });
};

const setupMappings = async mappingTable => {
  // Admins
  await mappingTable.insert({ role_id: 1, activity_id: 1 });
  await mappingTable.insert({ role_id: 1, activity_id: 2 });
  await mappingTable.insert({ role_id: 1, activity_id: 3 });
  await mappingTable.insert({ role_id: 1, activity_id: 4 });
  await mappingTable.insert({ role_id: 1, activity_id: 5 });
  await mappingTable.insert({ role_id: 1, activity_id: 6 });
  await mappingTable.insert({ role_id: 1, activity_id: 7 });
  await mappingTable.insert({ role_id: 1, activity_id: 8 });

  // CMS reviewers
  await mappingTable.insert({ role_id: 2, activity_id: 1 });
  await mappingTable.insert({ role_id: 2, activity_id: 2 });
  await mappingTable.insert({ role_id: 2, activity_id: 3 });

  // State submitters
  await mappingTable.insert({ role_id: 3, activity_id: 4 });
  await mappingTable.insert({ role_id: 3, activity_id: 5 });
};

exports.seed = async knex => {
  await setupActivities(knex('auth_activities'));
  await setupRoles(knex('auth_roles'));
  await setupMappings(knex('auth_role_activity_mapping'));
};
