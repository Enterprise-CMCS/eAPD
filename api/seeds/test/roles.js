exports.seed = async knex => {
  // For testing, put in our hard-coded stuff so we know what IDs to expect.
  await knex('auth_activities').insert({ id: 1001, name: 'view-roles' });
  await knex('auth_activities').insert({ id: 1002, name: 'create-roles' });
  await knex('auth_activities').insert({ id: 1003, name: 'edit-roles' });
  await knex('auth_activities').insert({ id: 1004, name: 'delete-roles' });
  await knex('auth_activities').insert({ id: 1005, name: 'view-users' });
  await knex('auth_activities').insert({ id: 1006, name: 'add-users' });
  await knex('auth_activities').insert({ id: 1007, name: 'view-activities' });
  await knex('auth_activities').insert({ id: 1008, name: 'edit-users' });
  await knex('auth_activities').insert({ id: 1009, name: 'view-state' });
  await knex('auth_activities').insert({ id: 1010, name: 'edit-state' });
  await knex('auth_activities').insert({ id: 1011, name: 'delete-users' });

  await knex('auth_roles').insert({ id: 1001, name: 'admin' });
  await knex('auth_roles').insert({ id: 1002, name: 'cms-reviewer' });
  await knex('auth_roles').insert({ id: 1003, name: 'state-submitter' });

  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1001
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1002
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1003
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1004
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1005
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1006
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1007
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1008
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1009
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1010
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1001,
    activity_id: 1011
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1002,
    activity_id: 1003
  });
};
