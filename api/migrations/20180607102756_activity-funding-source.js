exports.up = async knex => {
  await knex.schema.alterTable('activities', table => {
    table.string('funding_source', 32);
    table.dropColumn('types');
  });
};

exports.down = async () => {};
