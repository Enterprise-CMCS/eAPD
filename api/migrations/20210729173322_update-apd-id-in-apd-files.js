export const up = async knex => {
  await knex.schema.table('apd_files', table => {
    table.dropForeign('apd_id');
    table.dropUnique(['id', 'apd_id']);
  });
  await knex.schema.alterTable('apd_files', table => {
    table
      .string('apd_id', 24)
      .comment(
        'unique identifier created by mongo to reference the APD in mongo'
      )
      .notNullable()
      .alter();
    table.unique(['id', 'apd_id']);
  });
};

export const down = () => {};
