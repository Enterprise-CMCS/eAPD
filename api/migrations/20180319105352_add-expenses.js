exports.up = async knex => {
  await knex.schema.createTable('activity_expenses', table => {
    table.increments('id');
    table.string('name', 64).unique();

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_expense_entries', table => {
    table.increments('id');
    table.string('year', 4);
    table.decimal('amount', 10, 2);
    table.text('description');

    table.integer('expense_id');
    table.foreign('expense_id').references('activity_expenses.id');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('activity_expense_entries');
  await knex.schema.dropTable('activity_expenses');
};
