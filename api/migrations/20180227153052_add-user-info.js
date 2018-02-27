exports.up = async knex => {
  await knex.schema.alterTable('users', usersTable => {
    usersTable.text('name');
    usersTable.text('position');
    usersTable.string('phone', 10);
    usersTable.string('state', 2);
  });
};

exports.down = async knex => {
  await knex.schema.alterTable('users', usersTable => {
    usersTable.dropColumn('name');
    usersTable.dropColumn('position');
    usersTable.dropColumn('phone');
    usersTable.dropColumn('state');
  });
};
