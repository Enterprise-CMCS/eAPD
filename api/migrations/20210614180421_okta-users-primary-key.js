exports.up = async knex => {
  await knex.schema.table('okta_users', table => {
    table.primary('user_id');
  });
};

exports.down = async knex => {
  await knex.schema.table('okta_users', table => {
    table.dropPrimary();
  });
};
