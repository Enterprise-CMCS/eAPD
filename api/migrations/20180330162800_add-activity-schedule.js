exports.up = async knex => {
  await knex.schema.createTable('activity_schedule', table => {
    table.increments('id');
    table.date('actual_end');
    table.date('actual_start');
    table.text('milestone');
    table.date('planned_end');
    table.date('planned_start');
    table.text('status');
    table.integer('activity_id');

    table.foreign('activity_id').references('activities.id');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('activity_schedule');
};
