exports.up = async (knex) => {
  await knex.schema.createTable('states', (statesTable) => {
    statesTable.string('id', 2).primary();
    statesTable.string('name', 64);
  });

  await knex.schema.alterTable('users', (usersTable) => {
    usersTable.string('state_id', 2);
    usersTable.foreign('state_id').references('states.id');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable('users', (usersTable) => {
    usersTable.dropForeign('state_id');
    usersTable.dropColumn('state_id');
  });

  await knex.schema.dropTable('states');
};
