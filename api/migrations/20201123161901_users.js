exports.up = async knex => {
  await knex.schema.createTable('users', table => {
    table.comment('stores users');
    table
      .string('uid')
      .notNullable()
      .comment('id of user');
    table.unique('uid');
    table
      .string('state_id', 2)
      .notNullable()
      .comment('two-letter abbreviation of US state');
    table
      .foreign('state_id')
      .references('id')
      .inTable('states');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('users');
};
