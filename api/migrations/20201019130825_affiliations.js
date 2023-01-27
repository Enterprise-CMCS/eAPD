export const up = async knex => {
  await knex.schema.createTable('auth_affiliations', table => {
    table.comment('stores a user role for a particular US state');
    table.increments('id');
    table.string('user_id').notNullable().comment('id of user');
    table
      .string('state_id', 2)
      .notNullable()
      .comment('two-letter abbreviation of US state');
    table.foreign('state_id').references('id').inTable('states');
    table.integer('role_id').unsigned().comment('role of user');
    table.foreign('role_id').references('id').inTable('auth_roles');
    table
      .enum('status', ['requested', 'approved', 'denied', 'revoked'])
      .defaultTo('requested')
      .notNullable()
      .comment('status of the affiliation');
    table.timestamps(true, true);
    table
      .string('updated_by')
      .comment('id of user who last updated the record');
    table.unique(['user_id', 'state_id']);
  });
};

export const down = async knex => {
  await knex.schema.dropTable('auth_affiliations');
};
