exports.seed = async knex => {
  // For testing, throw out the standard stuff and put in our
  // hard-coded stuff so we know what IDs to expect.
  await knex('auth_role_activity_mapping').del();
  await knex('auth_roles').del();
  await knex('auth_activities').del();

  await knex('auth_activities').insert({ id: 1, name: 'view-roles' });
  await knex('auth_activities').insert({ id: 2, name: 'create-roles' });
  await knex('auth_activities').insert({ id: 3, name: 'edit-roles' });
  await knex('auth_activities').insert({ id: 4, name: 'delete-roles' });
  await knex('auth_activities').insert({ id: 5, name: 'view-users' });
  await knex('auth_activities').insert({ id: 6, name: 'add-users' });

  await knex('auth_roles').insert({ id: 1, name: 'admin' });
  await knex('auth_roles').insert({ id: 2, name: 'cms-reviewer' });
  await knex('auth_roles').insert({ id: 3, name: 'state-submitter' });

  await knex('auth_role_activity_mapping').insert({
    role_id: 1,
    activity_id: 1
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1,
    activity_id: 2
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1,
    activity_id: 3
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1,
    activity_id: 4
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1,
    activity_id: 5
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1,
    activity_id: 6
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 2,
    activity_id: 3
  });
};
