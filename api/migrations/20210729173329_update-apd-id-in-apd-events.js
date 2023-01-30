export const up = async knex => {
  await knex.schema.table('apd_events', table => {
    table.dropForeign('apd_id');
  });
  await knex.schema.table('apd_events', table => {
    table
      .string('apd_id', 24)
      .comment(
        'unique identifier created by mongo to reference the APD in mongo'
      )
      .notNullable()
      .alter();
  });
};

export const down = () => {};
