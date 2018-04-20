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

  await knex.schema.createTable('states', statesTable => {
    statesTable.string('id', 2).primary();
    statesTable.string('name', 64);
    statesTable.json('medicaid_office');
    statesTable.json('state_pocs');
    statesTable.text('program_vision');
    statesTable.text('program_benefits');
  });

  await knex.schema.createTable('users', table => {
    table.increments();
    table.text('email'); // who knows how long an email address might be
    table.string('password', 60); // bcrypt hashes are 60 characters
    table.string('auth_role', 64);
    table.foreign('auth_role').references('auth_roles.name');
    table.text('name');
    table.text('position');
    table.string('phone', 10);
    table.string('state_id', 2);

    table.unique('email');
    table.foreign('state_id').references('states.id');
  });

  await knex.schema.createTable('apds', apdsTable => {
    apdsTable.increments('id');
    apdsTable.string('status', 64);
    apdsTable.string('period', 64);
    apdsTable.timestamps(true, true); // adds created_at & updated_at columns
    apdsTable.timestamp('approved_at');

    apdsTable.string('state_id', 2);
    apdsTable.foreign('state_id').references('states.id');
  });

  await knex.schema.createTable('activities', activitiesTable => {
    activitiesTable.increments('id');
    activitiesTable.string('name', 128);
    activitiesTable.text('description');

    activitiesTable.integer('apd_id');
    activitiesTable.foreign('apd_id').references('apds.id');
  });

  await knex.schema.createTable('activity_goals', table => {
    table.increments('id');
    table.text('description');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_goal_objectives', table => {
    table.increments('id');
    table.text('description');

    table.integer('activity_goal_id');
    table.foreign('activity_goal_id').references('activity_goals.id');
  });

  await knex.schema.createTable('activity_expenses', table => {
    table.increments('id');
    table.string('name', 64).unique();

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_expense_entries', table => {
    table.increments('id');
    table.string('year', 4);
    table.decimal('amount', 10, 2);
    table.text('description');

    table.integer('expense_id');
    table.foreign('expense_id').references('activity_expenses.id');
  });

  await knex.schema.createTable('activity_approaches', table => {
    table.increments('id');
    table.text('description');
    table.text('alternatives');
    table.text('explanation');
    table.integer('activity_id');

    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_schedule', table => {
    table.increments('id');
    table.date('actual_end');
    table.date('actual_start');
    table.text('milestone');
    table.date('planned_end');
    table.date('planned_start');
    table.text('status');
    table.integer('activity_id');

    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_state_peronnel', table => {
    table.increments('id');
    table.text('title');
    table.text('description');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_state_personnel_yearly', table => {
    table.increments('id');
    table.integer('year');
    table.decimal('cost', 15, 2);
    table.decimal('fte', 3, 2);

    table.integer('personnel_id');
    table.foreign('personnel_id').references('activity_state_peronnel.id');
  });

  await knex.schema.createTable('activity_contractor_resources', table => {
    table.increments('id');
    table.text('name');
    table.text('description');
    table.date('start');
    table.date('end');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable(
    'activity_contractor_resources_yearly',
    table => {
      table.increments('id');
      table.integer('year');
      table.decimal('cost', 15, 2);

      table.integer('contractor_resource_id');
      table
        .foreign('contractor_resource_id')
        .references('activity_contractor_resources.id');
    }
  );
};

exports.down = async knex => {
  await knex.schema.dropTable('activity_contractor_resources_yearly');
  await knex.schema.dropTable('activity_expense_entries');
  await knex.schema.dropTable('activity_goal_objectives');
  await knex.schema.dropTable('activity_state_personnel_yearly');

  await knex.schema.dropTable('activity_approaches');
  await knex.schema.dropTable('activity_contractor_resources');
  await knex.schema.dropTable('activity_expenses');
  await knex.schema.dropTable('activity_goals');
  await knex.schema.dropTable('activity_state_peronnel');
  await knex.schema.dropTable('activity_schedule');

  await knex.schema.dropTable('activities');

  await knex.schema.dropTable('apds');
  await knex.schema.dropTable('users');

  await knex.schema.dropTable('auth_role_activity_mapping');
  await knex.schema.dropTable('auth_activities');
  await knex.schema.dropTable('auth_roles');

  await knex.schema.dropTable('states');
};
