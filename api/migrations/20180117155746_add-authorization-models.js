exports.up = async knex => {
  await knex.schema.createTable('auth_roles', rolesTable => {
    rolesTable.increments('id');
    rolesTable.string('name', 64); // I reckon a 64-character role name is enough...
    rolesTable.index('name');
    rolesTable.unique('name');
  });

  await knex.schema.createTable('auth_activities', activitiesTable => {
    activitiesTable.increments('id');
    activitiesTable.string('name', 64); // I reckon the same for activity names
    activitiesTable.unique('name');
  });

  await knex.schema.createTable('auth_role_activity_mapping', mappingTable => {
    mappingTable.integer('role_id');
    mappingTable.integer('activity_id');

    mappingTable.index(['role_id', 'activity_id']);

    mappingTable.foreign('role_id').references('auth_roles.id');
    mappingTable.foreign('activity_id').references('auth_activities.id');
  });

  await knex.schema.alterTable('users', usersTable => {
    usersTable.string('auth_role', 64);
    usersTable.foreign('auth_role').references('auth_roles.name');
  });
};

exports.down = async knex => {
  await knex.schema.alterTable('users', usersTable => {
    usersTable.dropForeign('auth_role');
    usersTable.dropColumn('auth_role');
  });

  await knex.schema.dropTable('auth_role_activity_mapping');
  await knex.schema.dropTable('auth_activities');
  await knex.schema.dropTable('auth_roles');
};
