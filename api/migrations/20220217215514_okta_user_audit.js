/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex =>
  knex.schema.createTable('okta_user_audit', table => {
    table.string('user_id').notNullable().comment('id of the user in the okta');
    table
      .string('state_id')
      .notNullable()
      .comment('id of the state the user logged into');
    table
      .integer('role_id')
      .comment('id of the role the user has for the state');
    table
      .string('affiliation_status')
      .notNullable()
      .comment('status of the affiliation');
    table
      .timestamp('logged_in_at')
      .defaultTo(knex.fn.now())
      .comment('date the user logged in');

    table.foreign('user_id').references('okta_users.user_id');
    table.foreign('state_id').references('states.id');
    table.foreigh('role_id').references('auth_roles.id');

    table.unique(['user_id', 'state_id', 'role_id', 'logged_in_at']);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => knex.schema.dropTable('okta_user_audit');
