export const up = async knex =>
  knex.schema.alterTable('apd_files', table => {
    table
      .string('id', 64)
      .comment(
        'unique identifier shared with the storage system; this value could be a foreign key, depending on the storage mechanism being used; computed as the SHA256 hash of the file contents'
      )
      .alter();
    table.dropUnique('id');
    table.unique(['id', 'apd_id']);
  });

export const down = async () => {};
