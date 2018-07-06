exports.up = async knex => {
  await knex.schema.alterTable('apd_previous_activity_expenses', table => {
    table.decimal('mmis_federal90_approved', 12, 2);
    table.decimal('mmis_federal90_actual', 12, 2);
    table.decimal('mmis_federal75_approved', 12, 2);
    table.decimal('mmis_federal75_actual', 12, 2);
    table.decimal('mmis_federal50_approved', 12, 2);
    table.decimal('mmis_federal50_actual', 12, 2);
    table.decimal('mmis_state10_approved', 12, 2);
    table.decimal('mmis_state10_actual', 12, 2);
    table.decimal('mmis_state25_approved', 12, 2);
    table.decimal('mmis_state25_actual', 12, 2);
    table.decimal('mmis_state50_approved', 12, 2);
    table.decimal('mmis_state50_actual', 12, 2);
  });
};

exports.down = async () => {};
