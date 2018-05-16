exports.up = async knex => {
  await knex.schema.alterTable('activity_expenses', table => {
    table.text('description');
    table.text('category');
    table.dropColumn('name');
  });

  await knex.schema.alterTable('activity_expense_entries', table => {
    table.dropColumn('description');
  });
};

exports.down = async () => {};
