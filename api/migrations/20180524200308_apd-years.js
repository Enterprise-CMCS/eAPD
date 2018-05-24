exports.up = async knex => {
  await knex.schema.alterTable('apds', table => {
    table.json('years');
  });
};

exports.down = async () => {};
