exports.up = async knex =>
  knex.schema.alterTable('apds', table => {
    table.json('federal_citations');
  });

exports.down = async () => {};
