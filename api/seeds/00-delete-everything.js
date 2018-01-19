exports.seed = knex =>
  // has a foreign key relationship on auth_roles
  knex('users')
    .del()

    // has a foreign key relationship on auth_roles and auth_activities
    .then(() => knex('auth_role_activity_mapping').del())

    .then(() => knex('auth_roles').del())
    .then(() => knex('auth_activities').del());
