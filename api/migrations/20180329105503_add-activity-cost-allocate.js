exports.up = async knex => {
  await knex.schema.createTable('activity_cost_allocations', table => {
    table.increments('id');
    table.string('name', 128);
    table.integer('share');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('activity_cost_allocations');
};
