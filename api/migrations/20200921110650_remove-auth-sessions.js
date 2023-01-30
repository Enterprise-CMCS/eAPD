export const up = async knex => {
  knex.schema.dropTable('auth_sessions');
};

export const down = async knex => {
  knex.schema.createTable('auth_sessions', table => {
    table.comment('authentication sessions');
    table
      .string('session_id', 64)
      .comment('randomly-generated session ID')
      .notNullable();
    table
      .integer('user_id')
      .notNullable()
      .comment('user that owns the session');
    table
      .bigInteger('expiration')
      .unsigned()
      .notNullable()
      .comment('when the session expires');

    table.foreign('user_id').references('users.id');
  });
};
