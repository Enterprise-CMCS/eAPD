exports.up = async knex => {
  await knex.schema.createTable('apd_previous_activity_expenses', table => {
    table.increments();
    table.integer('apd_id');
    table.integer('year');
    table.decimal('hie_federal_approved', 12, 2);
    table.decimal('hie_federal_actual', 12, 2);
    table.decimal('hie_state_approved', 12, 2);
    table.decimal('hie_state_actual', 12, 2);
    table.decimal('hit_federal_approved', 12, 2);
    table.decimal('hit_federal_actual', 12, 2);
    table.decimal('hit_state_approved', 12, 2);
    table.decimal('hit_state_actual', 12, 2);

    table.foreign('apd_id').references('apds.id');
  });

  await knex.schema.alterTable('apds', table => {
    table.text('previous_activity_summary');
  });
};

exports.down = async () => {};
