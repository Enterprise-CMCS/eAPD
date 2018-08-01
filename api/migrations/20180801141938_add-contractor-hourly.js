exports.up = async knex => {
  await knex.schema.alterTable('activity_contractor_resources', table => {
    table.boolean('useHourly').defaultTo(false);
  });

  await knex.schema.createTable(
    'activity_contractor_resources_hourly',
    table => {
      table.increments();
      table.integer('contractor_resource_id');
      table.integer('year');
      table.decimal('hours', 15, 2);
      table.decimal('rate', 15, 2);

      table
        .foreign('contractor_resource_id')
        .references('activity_contractor_resources.id');
    }
  );
};

exports.down = async () => {};
