exports.seed = knex => {
  const rolesTable = knex('auth_roles');
  const activitiesTable = knex('auth_activities');
  const mappingTable = knex('auth_role_activity_mapping');

  return (
    mappingTable
      .del()
      .then(() => rolesTable.del())
      .then(() => activitiesTable.del())

      .then(() => rolesTable.insert({ id: 1, name: 'admin' }))
      .then(() => rolesTable.insert({ id: 2, name: 'cms-reviewer' }))
      .then(() => rolesTable.insert({ id: 3, name: 'state-submitter' }))

      .then(() => activitiesTable.insert({ id: 1, name: 'view-all-apds' }))
      .then(() => activitiesTable.insert({ id: 2, name: 'comment-on-apd' }))
      .then(() => activitiesTable.insert({ id: 3, name: 'send-apd-to-state' }))
      .then(() => activitiesTable.insert({ id: 4, name: 'view-own-apds' }))
      .then(() => activitiesTable.insert({ id: 5, name: 'create-apd' }))

      // Admins
      .then(() => mappingTable.insert({ role_id: 1, activity_id: 1 }))
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
      .then(() => mappingTable.insert({ role_id: 3, activity_id: 5 }))
  );
};
