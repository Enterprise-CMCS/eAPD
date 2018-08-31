// These need to be deleted in a particular order to handle
// relationships between them, otherwise we get a key
// constraint violation.
exports.seed = async knex =>
  Promise.all([
    // These tables don't reference any other tables, so
    // they can be cleared out right off the bat.
    knex('activity_contractor_files').del(),
    knex('activity_contractor_resources_hourly').del(),
    knex('activity_files').del(),
    knex('activity_contractor_resources_yearly').del(),
    knex('activity_cost_allocation').del(),
    knex('activity_expense_entries').del(),
    knex('activity_goals').del(),
    knex('activity_state_personnel_yearly').del(),
    knex('activity_schedule').del(),
    knex('activity_state_personnel_yearly').del(),
    knex('activity_quarterly_ffp').del(),
    knex('apd_incentive_payments').del(),
    knex('apd_key_personnel').del(),
    knex('apd_previous_activity_expenses').del(),
    knex('apd_versions').del(),
    knex('auth_role_activity_mapping').del()
  ])
    .then(() =>
      Promise.all([
        // These tables reference the previous ones, so
        // now that those are empty, these can be
        // emptied as well.
        knex('activity_contractor_resources').del(),
        knex('activity_expenses').del(),
        knex('activity_state_peronnel').del(),
        knex('auth_activities').del(),
        knex('files').del(),
        knex('users').del()
      ])
    )
    .then(() =>
      Promise.all([
        // And so on and so on
        knex('activities').del(),
        knex('auth_roles').del()
      ])
    )
    .then(() => knex('apds').del())
    .then(() => knex('states').del());
