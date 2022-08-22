exports.up = async knex => {
  await knex.schema.table('okta_users', table => {
    table.string('displayName');
    table.string('secondEmail');
    table.string('primaryPhone');
    table.string('mobilePhone');
    table.string('login');
  });
};

exports.down = async knex => {
  knex.schema.table('okta_users', table => {
    table.dropColumn('displayName');
    table.dropColumn('secondEmail');
    table.dropColumn('primaryPhone');
    table.dropColumn('mobilePhone');
    table.dropColumn('login');
  });
};
