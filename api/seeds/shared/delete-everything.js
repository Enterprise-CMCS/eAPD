exports.seed = async knex => {
  // These need to be deleted in a particular order to handle
  // relationships between them, otherwise we get a key
  // constraint violation.
  await knex('activity_contractor_files').del();
  await knex('activity_files').del();
  await knex('files').del();

  await knex('activity_contractor_resources_yearly').del();
  await knex('activity_contractor_resources').del();

  await knex('activity_cost_allocation').del();

  await knex('activity_expense_entries').del();
  await knex('activity_expenses').del();

  await knex('activity_goals').del();

  await knex('apd_incentive_payments').del();

  await knex('apd_points_of_contact').del();

  await knex('activity_approaches').del();
  await knex('activity_state_personnel_yearly').del();
  await knex('activity_state_peronnel').del();

  await knex('activity_schedule').del();

  await knex('activities').del();

  await knex('apd_previous_activity_expenses').del();

  await knex('apd_versions').del();
  await knex('apds').del();

  await knex('users').del();

  await knex('auth_role_activity_mapping').del();
  await knex('auth_activities').del();
  await knex('auth_roles').del();

  await knex('states').del();
};
