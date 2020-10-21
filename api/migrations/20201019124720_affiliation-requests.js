exports.up = async knex => {
  await knex.schema.createTable('affiliation_requests', table => {
    table.comment('stores a user request to be affiliated with a US state');
    table.increments('id');
    table
      .string('user_id')
      .notNullable()
      .comment('id of user');
    table
      .string('state_id', 2)
      .notNullable()
      .comment('two-letter abbreviation of US state');
    table
      .enum('status', ['requested', 'approved', 'denied', 'revoked'])
      .defaultTo('requested')
      .notNullable()
      .comment('status of request');
    table
      .string('updated_by')
      .comment('id of user who last changed the status of the request');
    table.timestamps(true, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('affiliation_requests');
};
