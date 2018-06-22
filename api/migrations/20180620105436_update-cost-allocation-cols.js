exports.up = async knex => {
  await knex.schema.alterTable('activity_cost_allocation', table => {
    table.renameColumn('federal', 'federal_percent');
    table.renameColumn('state', 'state_percent');
    table.renameColumn('other', 'other_amount');
  });
};

exports.down = async () => {};
