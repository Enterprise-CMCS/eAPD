exports.up = async knex => {
  await knex.schema.alterTable('activities', table => {
    table.integer('other_funding_sources_amount').alter();
  });

  await knex.schema.alterTable('activity_contractor_resources', table => {
    table.integer('totalCost').alter();
  });
  await knex.schema.alterTable(
    'activity_contractor_resources_yearly',
    table => {
      table.integer('cost').alter();
    }
  );
  await knex.schema.alterTable('activity_cost_allocation', table => {
    table.integer('other_amount').alter();
  });
  await knex.schema.alterTable('activity_expense_entries', table => {
    table.integer('amount').alter();
  });
  await knex.schema.alterTable('activity_state_personnel_yearly', table => {
    table.integer('cost').alter();
  });

  await knex.schema.alterTable('apd_incentive_payments', table => {
    table.integer('q1_eh_payment').alter();
    table.integer('q2_eh_payment').alter();
    table.integer('q3_eh_payment').alter();
    table.integer('q4_eh_payment').alter();
    table.integer('q1_ep_payment').alter();
    table.integer('q2_ep_payment').alter();
    table.integer('q3_ep_payment').alter();
    table.integer('q4_ep_payment').alter();
  });

  await knex.schema.alterTable('apd_key_personnel_yearly', table => {
    table.integer('cost').alter();
  });

  await knex.schema.alterTable('apd_previous_activity_expenses', table => {
    table.integer('hithie_total_approved').alter();
    table.integer('hithie_federal_actual').alter();
    table.integer('mmis90_total_approved').alter();
    table.integer('mmis90_federal_actual').alter();
    table.integer('mmis75_total_approved').alter();
    table.integer('mmis75_federal_actual').alter();
    table.integer('mmis50_total_approved').alter();
    table.integer('mmis50_federal_actual').alter();
  });
};

exports.down = async () => {};
