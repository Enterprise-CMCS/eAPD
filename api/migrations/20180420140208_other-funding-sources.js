exports.up = async knex =>
  knex.schema.alterTable('activities', table => {
    table.text('other_funding_sources_description');
    table.decimal('other_funding_sources_amount', 12, 2);
  });

exports.down = async () => {};
