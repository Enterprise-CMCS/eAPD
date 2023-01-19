// These need to be deleted in a particular order to handle
// relationships between them, otherwise we get a key
// constraint violation.
const seed = async knex =>
  Promise.all([
    // These tables don't reference any other tables, so
    // they can be cleared out right off the bat.
    knex('auth_role_activity_mapping').del()
  ])
    .then(() =>
      Promise.all([
        // These tables reference the previous ones, so
        // now that those are empty, these can be
        // emptied as well.
        knex('auth_activities').del(),
        knex('apd_events').del(),
        knex('apd_files').del(),
        knex('users').del(),
        knex('state_admin_certifications_audit').del(),
        knex('okta_user_audit').del()
      ])
    )
    .then(() => knex('okta_users').del())
    .then(() => knex('state_admin_certifications').del())
    .then(() => knex('auth_affiliations').del())
    .then(() => knex('auth_roles').del())
    .then(() => knex('apds').del())
    .then(() => knex('states').del());

export default seed;
