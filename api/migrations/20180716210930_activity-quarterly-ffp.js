exports.up = async knex =>
  knex.schema.createTable('activity_quarterly_ffp', table => {
    table.increments();
    table.integer('activity_id');
    table.integer('year');
    table.decimal('q1_combined', 12, 2);
    table.decimal('q1_contractors', 12, 2);
    table.decimal('q1_state', 12, 2);
    table.decimal('q2_combined', 12, 2);
    table.decimal('q2_contractors', 12, 2);
    table.decimal('q2_state', 12, 2);
    table.decimal('q3_combined', 12, 2);
    table.decimal('q3_contractors', 12, 2);
    table.decimal('q3_state', 12, 2);
    table.decimal('q4_combined', 12, 2);
    table.decimal('q4_contractors', 12, 2);
    table.decimal('q4_state', 12, 2);

    table.foreign('activity_id').references('activities.id');
  });

exports.down = async () => {};
