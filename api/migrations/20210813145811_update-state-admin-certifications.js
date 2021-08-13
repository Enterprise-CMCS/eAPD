exports.up = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table
      .uuid('file_id')
      .comment(
        'unique identifier shared with the storage system; this value could be a foreign key, depending on the storage mechanism being used'
      );
    table.integer('file_size').comment('size of the file, in bytes');
    table.json('file_metadata').comment('any user-provided metadata about the file');
    table.string('email').comment('email of the user being certified');
  });
};

exports.down = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table.dropColumn('file_id');
    table.dropColumn('file_size');
    table.dropColumn('file_metadata');
    table.dropColumn('email');
  })
};
