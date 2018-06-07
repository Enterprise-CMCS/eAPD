exports.up = async knex => {
  await knex.schema.dropTable('activity_cost_allocation');

  await knex.schema.createTable('activity_cost_allocation', table => {
    table.increments('id');

    table.decimal('federal', 12, 2);
    table.decimal('state', 12, 2);
    table.decimal('other', 12, 2);
    table.integer('year', 4);

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });
};

exports.down = async () => {};
