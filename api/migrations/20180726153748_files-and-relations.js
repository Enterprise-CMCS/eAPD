exports.up = async knex => {
  await knex.schema.createTable('files', table => {
    table.increments();
    table.text('key');
    table.integer('size');
    table.json('metadata');
  });

  await knex.schema.createTable('activity_contractor_files', table => {
    table.integer('file_id');
    table.integer('activity_contractor_resource_id');

    table.foreign('file_id').references('files.id');
    table
      .foreign('activity_contractor_resource_id')
      .references('activity_contractor_resources.id');
  });

  await knex.schema.createTable('activity_files', table => {
    table.integer('file_id');
    table.integer('activity_id');

    table.foreign('file_id').references('files.id');
    table.foreign('activity_id').references('activities.id');
  });
};

exports.down = async () => {};
