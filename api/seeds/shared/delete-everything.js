// These need to be deleted in a particular order to handle
// relationships between them, otherwise we get a key
// constraint violation.
exports.seed = async knex =>
  Promise.all([
    // These tables don't reference any other tables, so
    // they can be cleared out right off the bat.
    knex('apd_versions').del(),
    knex('auth_role_activity_mapping').del(),
    knex('auth_sessions').del()
  ])
    .then(() =>
      Promise.all([
        // These tables reference the previous ones, so
        // now that those are empty, these can be
        // emptied as well.
        knex('auth_activities').del(),
        knex('files').del(),
        knex('users').del()
      ])
    )
    .then(() =>
      Promise.all([
        // And so on and so on
        knex('auth_roles').del()
      ])
    )
    .then(() => knex('apds').del())
    .then(() => knex('states').del());
