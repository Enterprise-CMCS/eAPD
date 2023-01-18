export const up = async knex => {
  // Gotta drop these in the right order due to key constraints
  await Promise.all([
    knex.schema.dropTable('activity_contractor_files'),
    knex.schema.dropTable('activity_contractor_resources_hourly'),
    knex.schema.dropTable('activity_files'),
    knex.schema.dropTable('activity_contractor_resources_yearly'),
    knex.schema.dropTable('activity_cost_allocation'),
    knex.schema.dropTable('activity_expense_entries'),
    knex.schema.dropTable('activity_goals'),
    knex.schema.dropTable('activity_schedule'),
    knex.schema.dropTable('activity_state_personnel_yearly'),
    knex.schema.dropTable('activity_quarterly_ffp'),
    knex.schema.dropTable('apd_incentive_payments'),
    knex.schema.dropTable('apd_key_personnel_yearly'),
    knex.schema.dropTable('apd_previous_activity_expenses')
  ]);

  await Promise.all([
    knex.schema.dropTable('activity_contractor_resources'),
    knex.schema.dropTable('activity_expenses'),
    knex.schema.dropTable('activity_state_personnel'),
    knex.schema.dropTable('apd_key_personnel')
  ]);

  await knex.schema.dropTable('activities');

  await knex.schema.alterTable('apds', table => {
    table.dropColumns(
      'federal_citations',
      'medicaid_director_name',
      'medicaid_director_email',
      'medicaid_director_phone',
      'medicaid_office_address1',
      'medicaid_office_address2',
      'medicaid_office_city',
      'medicaid_office_state',
      'medicaid_office_zip',
      'narrative_hie',
      'narrative_hit',
      'narrative_mmis',
      'previous_activity_summary',
      'program_overview'
    );
  });

  await knex.schema.alterTable('states', table => {
    table.dropColumns('state_pocs');
  });
};

export const down = async () => {};
