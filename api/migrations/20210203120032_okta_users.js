
exports.up = async knex =>
  knex.schema.createTable('okta_users', table => {
    table.increments('id');
    table.text('metadata');
  });

exports.down = async knex =>
  knex.schema.dropTable('okta_users');
