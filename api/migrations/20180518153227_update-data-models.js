exports.up = async knex => {
  await knex.schema.alterTable('activities', table => {
    table.text('summary');
    table.text('alternatives');
    table.text('cost_allocation_methodology');
    table.json('types');
  });
};

exports.down = async () => {};
