exports.up = async knex => {
  await knex.schema.createTable('approaches', table => {
    table.increments('id');
    table.text('description');
    table.text('alternatives');
    table.text('explanation');
    table.integer('activity_id');

    table.foreign('activity_id').references('activities.id');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('approaches');
};
