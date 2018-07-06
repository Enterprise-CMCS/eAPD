exports.up = async knex => {
  await knex.schema.alterTable('apd_previous_activity_expenses', table => {
    table.decimal('mmis_federal_approved', 12, 2);
    table.decimal('mmis_federal_actual', 12, 2);
    table.decimal('mmis_state_approved', 12, 2);
    table.decimal('mmis_state_actual', 12, 2);
  });
};

exports.down = async () => {};
