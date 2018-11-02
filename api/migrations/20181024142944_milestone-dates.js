exports.up = async knex =>
  Promise.all([
    knex.schema.alterTable('activities', table => {
      table
        .date('planned_end_date')
        .comment('the date this activity is planned to begin');
      table
        .date('planned_start_date')
        .comment('the date this activity is planned to be complete');
    }),
    knex.schema.alterTable('activity_schedule', table => {
      table.dropColumns('actual_end', 'actual_start', 'planned_start');
      table
        .renameColumn('planned_end', 'end_date')
        .comment('the date this milestone is planned to be met');
    })
  ]);

exports.down = async () => {};
