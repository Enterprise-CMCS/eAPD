exports.up = async knex => {
  await knex.schema.createTable('affiliations', table => {
    table.comment('stores a user role for a particular US state');
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
      .integer('role_id')
      .unsigned()
      .notNullable()
      .comment('role of user');
    table
      .foreign('role_id')
      .references('id')
      .inTable('auth_roles');
    table
      .string('created_by')
      .notNullable()
      .comment('id of user who created the record');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'state_id'])
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('affiliations');
};
