exports.up = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table
      .string('fileId', 64)
      .comment(
        'unique identifier shared with the storage system; this value could be a foreign key, depending on the storage mechanism being used'
      );
    table.integer('fileSize').comment('size of the file, in bytes');
    table.json('fileMetadata').comment('any user-provided metadata about the file');
    table.string('email').comment('email of the user being certified');
  });
  await knex.schema.table('state_admin_certifications_audit', table => {
    table.enu('changeType', ['add', 'remove']).comment('type of change to certification; either add or remove');
  });
};

exports.down = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table.dropColumn('fileId');
    table.dropColumn('fileSize');
    table.dropColumn('fileMetadata');
    table.dropColumn('email');
  })
  await knex.schema.table('state_admin_certifications_audit', table => {
    table.dropColumn('changeType');
  });
};
