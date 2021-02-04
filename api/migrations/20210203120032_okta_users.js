
exports.up = async knex =>
  knex.schema.createTable('okta_users', table => {
    table.increments('id');
    table.string('user_id');
    table
      .string('email')
      .unique('email')
      .notNullable();
    table.text('metadata');
  });

exports.down = async knex =>
  knex.schema.dropTable('okta_users');
