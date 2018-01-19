const setupActivities = activitiesTable =>
  activitiesTable
    .insert({ id: 1, name: 'view-all-apds' })
    .then(() => activitiesTable.insert({ id: 2, name: 'comment-on-apd' }))
    .then(() => activitiesTable.insert({ id: 3, name: 'send-apd-to-state' }))
    .then(() => activitiesTable.insert({ id: 4, name: 'view-own-apds' }))
    .then(() => activitiesTable.insert({ id: 5, name: 'create-apd' }));

const setupRoles = rolesTable =>
  rolesTable
    .insert({ id: 1, name: 'admin' })
    .then(() => rolesTable.insert({ id: 2, name: 'cms-reviewer' }))
    .then(() => rolesTable.insert({ id: 3, name: 'state-submitter' }));

const setupMappings = mappingTable =>
  // Admins
  mappingTable
    .insert({ role_id: 1, activity_id: 1 })
    .then(() => mappingTable.insert({ role_id: 1, activity_id: 2 }))
    .then(() => mappingTable.insert({ role_id: 1, activity_id: 3 }))
    .then(() => mappingTable.insert({ role_id: 1, activity_id: 4 }))
    .then(() => mappingTable.insert({ role_id: 1, activity_id: 5 }))
    // CMS reviewers
    .then(() => mappingTable.insert({ role_id: 2, activity_id: 1 }))
    .then(() => mappingTable.insert({ role_id: 2, activity_id: 2 }))
    .then(() => mappingTable.insert({ role_id: 2, activity_id: 3 }))
    // State submitters
    .then(() => mappingTable.insert({ role_id: 3, activity_id: 4 }))
    .then(() => mappingTable.insert({ role_id: 3, activity_id: 5 }));

exports.seed = knex =>
  setupActivities(knex('auth_activities'))
    .then(() => setupRoles(knex('auth_roles')))
    .then(() => setupMappings(knex('auth_role_activity_mapping')));
