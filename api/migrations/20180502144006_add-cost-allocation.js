exports.up = async knex => {
  await knex.schema.alterTable('activities', table => {
    table.text('cost_allocation_methodology');
  });

  await knex.schema.createTable('activity_cost_allocation', table => {
    table.increments('id');
    table.string('entity', 64);
    table.decimal('percent_of_cost', 12, 2);

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('activity_cost_allocation');
};
