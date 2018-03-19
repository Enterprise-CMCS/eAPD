exports.up = async knex => {
  await knex.schema.createTable('expenses', table => {
    table.increments('id');
    table.string('name', 64).unique();
  });

  await knex.schema.createTable('activity_expenses', table => {
    table.string('year', 4);
    table.decimal('amount', 10, 2);
    table.text('description');

    table.integer('expense_id');
    table.integer('activity_id');

    table.index(['expense_id', 'activity_id']);

    table.foreign('expense_id').references('expenses.id');
    table.foreign('activity_id').references('activities.id');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('activity_expenses');
  await knex.schema.dropTable('expenses');
};
