exports.up = async knex => {
  await knex.schema.dropTable('auth_sessions');
  await knex.schema.dropTable('apd_versions');

  // remove fields from users table
  await knex.schema.table('users', table => {
    table.dropColumn('id');
    table.dropColumn('email');
    table.dropColumn('password');
    table.dropColumn('auth_role');
    table.dropColumn('name');
    table.dropColumn('position');
    table.dropColumn('phone');
    table.dropColumn('failed_logons');
    table.dropColumn('locked_until');
  });

  // add uid to users
  await knex.schema.table('users', table => {
    table
      .string('uid')
      .notNullable()
      .defaultTo('not set')
      .comment('id of user from authentication service');
    table.unique('uid');
  });
};

exports.down = async knex => {
  // remove uid from users
  await knex.schema.table('users', table => {
    table.dropColumn('uid');
  });

  // add fields to users table
  await knex.schema.table('users', table => {
    table.increments();
    table.text('email');
    table.string('password', 60).comment('hashed password');
    table.string('auth_role', 64).comment('the name of the role this user has');
    table.text('name').comment('the users name');
    table.text('position');
    table.string('phone', 10);
    table.unique('email');
    table
      .json('failed_logons')
      .comment('information about consecutive failed logons');
    table
      .bigInteger('locked_until')
      .unsigned()
      .comment('the timestamp of when this account will be unlocked');
  });

  // add auth_sessions
  await knex.schema.createTable('auth_sessions', table => {
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

  // add apd_versions
  await knex.schema.createTable('apd_versions', table => {
    table.comment(
      'submitted versions of APDs (essentially archival, but not records)'
    );
    table.increments();
    table.integer('apd_id').comment('the id of the original, non-archived APD');
    table
      .json('content')
      .comment(
        'the full content of the original APD at time of submission, along with any extra budget tables appended at submission'
      );
    table
      .timestamp('created')
      .defaultsTo(knex.fn.now())
      .comment('timestamp of when the APD was submitted');
    table.integer('user_id').comment('id of the user that submitted the APD');

    table.foreign('apd_id').references('apds.id');
    table.foreign('user_id').references('users.id');
  });
};
