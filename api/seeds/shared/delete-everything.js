exports.seed = async (knex) => {
  // has a foreign key relationship on auth_roles and states
  await knex('users').del();

  // has a foreign key relationship on auth_roles and auth_activities
  await knex('auth_role_activity_mapping').del();

  await knex('auth_roles').del();
  await knex('auth_activities').del();

  await knex('states').del();
};
