exports.up = async knex =>
  knex.schema.createTable('okta_users', table => {
    table.string('user_id').unique('user_id').notNullable();
    table.string('email').unique('email').notNullable();
    table.text('metadata');
  });

exports.down = async knex => knex.schema.dropTable('okta_users');
