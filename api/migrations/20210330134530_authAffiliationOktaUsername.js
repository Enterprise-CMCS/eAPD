
exports.up = async (knex) => {
  await knex.schema.table('users', table => {
    table.string('username').comment('username of user from authentication service');
  });

  await knex.schema.table('auth_affiliations', table => {
    table.string('username').comment('username of user from authentication service');
  });
};

exports.down = async (knex) => {
  // remove uid from users
  await knex.schema.table('users', table => {
    table.dropColumn('username');
  });
  // remove uid from users
  await knex.schema.table('auth_affiliations', table => {
    table.dropColumn('username');
  });
};
