exports.up = async knex => {
  // add uid to users
  await knex.schema.table('users', table => {
    table.string('uid').comment('id of user from authentication service');
  });
};

exports.down = async knex => {
  // remove uid from users
  await knex.schema.table('users', table => {
    table.dropColumn('uid');
  });
};
