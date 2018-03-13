exports.up = async knex => {
  await knex.schema.createTable('activity_goals', table => {
    table.increments('id');
    table.text('description');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_goal_objectives', table => {
    table.increments('id');
    table.text('description');

    table.integer('activity_goal_id');
    table.foreign('activity_goal_id').references('activity_goals.id');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('activity_goal_objectives');
  await knex.schema.dropTable('activity_goals');
};
