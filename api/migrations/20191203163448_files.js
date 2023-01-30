export const up = async knex => {
  // Get rid of the old files table. We never used it.
  await knex.schema.dropTable('files');

  await knex.schema.createTable('apd_files', table => {
    table.comment('list of external files known to the system');
    table
      .uuid('id')
      .comment(
        'unique identifier shared with the storage system; this value could be a foreign key, depending on the storage mechanism being used'
      );
    table.unique('id');
    table.integer('apd_id').comment('The ID of the APD this file belongs to');
    table.foreign('apd_id').references('apds.id');
    table.integer('size').comment('size of the file, in bytes');
    table.json('metadata').comment('any user-provided metadata about the file');
  });
};

export const down = async () => {};
