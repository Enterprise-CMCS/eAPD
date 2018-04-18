exports.up = async knex => {
  await knex.schema.createTable('activity_state_peronnel', table => {
    table.increments('id');
    table.text('title');
    table.text('description');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_state_personnel_yearly', table => {
    table.increments('id');
    table.integer('year');
    table.decimal('cost', 15, 2);
    table.decimal('fte', 3, 2);

    table.integer('personnel_id');
    table.foreign('personnel_id').references('activity_state_peronnel.id');
  });

  await knex.schema.createTable('activity_contractor_resources', table => {
    table.increments('id');
    table.text('name');
    table.text('description');
    table.date('start');
    table.date('end');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable(
    'activity_contractor_resources_yearly',
    table => {
      table.increments('id');
      table.integer('year');
      table.decimal('cost', 15, 2);

      table.integer('contractor_resource_id');
      table
        .foreign('contractor_resource_id')
        .references('activity_contractor_resources.id');
    }
  );
};

exports.down = async knex => {
  await knex.schema.dropTable('activity_contractor_resources_yearly');
  await knex.schema.dropTable('activity_contractor_resources');
  await knex.schema.dropTable('activity_state_personnel_yearly');
  await knex.schema.dropTable('activity_state_peronnel');
};
