exports.up = async knex => {
  await knex.schema.createTable('auth_affiliation_audit', table => {
    table.comment('Audit log for changes to auth affiliations');

    table.increments('id');

    table.timestamps(true, true);

    table.string('changed_by');

    table.string('user_id');

    table.integer('original_role_id');

    table.integer('new_role_id');

    table.string('original_status');

    table.string('new_status');
  });

  await knex.schema.table('auth_affiliations', table => {
    table.dropColumn('updated_by');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('auth_affiliation_audit');
  await knex.schema.table('auth_affiliations', table => {
    table
      .string('updated_by')
      .comment('id of user who last updated the record');
  });
};
