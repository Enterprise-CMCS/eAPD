exports.up = async knex =>
  knex.schema.createTable('apd_incentive_payments', table => {
    table.increments();
    table.integer('apd_id');
    table.integer('year');
    table.decimal('q1_eh_payment', 12, 2);
    table.decimal('q2_eh_payment', 12, 2);
    table.decimal('q3_eh_payment', 12, 2);
    table.decimal('q4_eh_payment', 12, 2);
    table.integer('q1_eh_count');
    table.integer('q2_eh_count');
    table.integer('q3_eh_count');
    table.integer('q4_eh_count');
    table.decimal('q1_ep_payment', 12, 2);
    table.decimal('q2_ep_payment', 12, 2);
    table.decimal('q3_ep_payment', 12, 2);
    table.decimal('q4_ep_payment', 12, 2);
    table.integer('q1_ep_count');
    table.integer('q2_ep_count');
    table.integer('q3_ep_count');
    table.integer('q4_ep_count');

    table.foreign('apd_id').references('apds.id');
  });
exports.down = async () => {};
