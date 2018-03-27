exports.seed = async knex => {
  // has a foreign key relationship on auth_roles and states
  await knex('users').del();

  // has a foreign key relationship on auth_roles and auth_activities
  await knex('auth_role_activity_mapping').del();

  await knex('auth_roles').del();
  await knex('auth_activities').del();

  // have cascading foreign key relationships, so make sure we
  // delete them in the right order
  await knex('activity_goal_objectives').del();
  await knex('activity_goals').del();
  await knex('activity_approaches').del();
  await knex('activities').del();

  await knex('apds').del();
  await knex('states').del();
};
